'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import styles from './LiveChat.module.css'

const SOCKET_URL = 'wss://chat.luxurytimesltd.co.uk'
const SESSION_STORAGE_KEY = 'lt_chat_session_id'
const MESSAGES_STORAGE_KEY = 'lt_chat_messages'
const MAX_PERSISTED_MESSAGES = 100

function trackEvent(name, params = {}) {
  if (typeof window === 'undefined') return
  if (typeof window.gtag !== 'function') return
  try {
    window.gtag('event', name, params)
  } catch {}
}

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState(() => {
    if (typeof window === 'undefined') return []
    try {
      const stored = window.localStorage.getItem(MESSAGES_STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) return parsed
      }
    } catch {}
    return []
  })
  const [input, setInput] = useState('')
  const [status, setStatus] = useState('connecting')
  const [showTeaser, setShowTeaser] = useState(false)
  const socketRef = useRef(null)
  const sessionIdRef = useRef(null)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const welcomeShownRef = useRef(messages.length > 0)
  const teaserDismissedRef = useRef(false)

  // Session ID setup only — socket connection is deferred until the chat is opened
  useEffect(() => {
    let sessionId = localStorage.getItem(SESSION_STORAGE_KEY)
    let isNewSession = false
    if (!sessionId) {
      isNewSession = true
      sessionId =
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}`
      localStorage.setItem(SESSION_STORAGE_KEY, sessionId)
    }
    sessionIdRef.current = sessionId

    if (isNewSession) {
      trackEvent('chat_session_started', { chat_session_id: sessionId })
    }
  }, [])

  // Dynamically imports socket.io-client and connects only on first chat open
  const connectSocket = async () => {
    if (socketRef.current) return
    const { io } = await import('socket.io-client')
    if (socketRef.current) return // guard against concurrent calls
    const socket = io(SOCKET_URL, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    })
    socketRef.current = socket

    socket.on('connect', () => {
      setStatus('connected')
      socket.emit('join_session', sessionIdRef.current)
    })

    socket.on('disconnect', () => setStatus('reconnecting'))
    socket.on('reconnect_attempt', () => setStatus('reconnecting'))
    socket.on('connect_error', () => setStatus('reconnecting'))

    socket.on('message', (msg) => {
      setMessages((prev) => [
        ...prev,
        {
          body: msg.body,
          senderRole: msg.senderRole || 'agent',
          timestamp: msg.timestamp || Date.now(),
        },
      ])
    })
  }

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen])

  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

  useEffect(() => {
    if (teaserDismissedRef.current) return
    const t = setTimeout(() => setShowTeaser(true), 4000)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const handler = () => {
      teaserDismissedRef.current = true
      setShowTeaser(false)
      connectSocket()
      setIsOpen(true)
      trackEvent('chat_open', {
        chat_session_id: sessionIdRef.current,
        source: 'speak_to_team_cta',
      })
    }
    window.addEventListener('openLiveChat', handler)
    return () => window.removeEventListener('openLiveChat', handler)
  }, [])

  useEffect(() => {
    if (isOpen && !welcomeShownRef.current) {
      welcomeShownRef.current = true
      setMessages((prev) => [
        ...prev,
        {
          body: 'Welcome to Luxury Times! How can we help you today?',
          senderRole: 'agent',
          timestamp: Date.now(),
        },
      ])
    }
  }, [isOpen])

  useEffect(() => {
    try {
      if (messages.length === 0) {
        localStorage.removeItem(MESSAGES_STORAGE_KEY)
      } else {
        localStorage.setItem(
          MESSAGES_STORAGE_KEY,
          JSON.stringify(messages.slice(-MAX_PERSISTED_MESSAGES))
        )
      }
    } catch {}
  }, [messages])

  const toggle = () => {
    const next = !isOpen
    if (showTeaser) {
      teaserDismissedRef.current = true
      setShowTeaser(false)
    }
    if (next) connectSocket()
    setIsOpen(next)
    trackEvent(next ? 'chat_open' : 'chat_close', {
      chat_session_id: sessionIdRef.current,
      ...(next ? { source: 'bubble' } : {}),
    })
  }

  const dismissTeaser = (e) => {
    e.stopPropagation()
    teaserDismissedRef.current = true
    setShowTeaser(false)
  }

  const openFromTeaser = () => {
    teaserDismissedRef.current = true
    setShowTeaser(false)
    connectSocket()
    setIsOpen(true)
    trackEvent('chat_open', {
      chat_session_id: sessionIdRef.current,
      source: 'teaser',
    })
  }

  const sendMessage = (e) => {
    e.preventDefault()
    const body = input.trim()
    if (!body || !socketRef.current?.connected) return

    const payload = {
      sessionId: sessionIdRef.current,
      body,
      senderRole: 'customer',
    }
    socketRef.current.emit('message', payload)
    setMessages((prev) => [...prev, { ...payload, timestamp: Date.now() }])
    setInput('')
    trackEvent('chat_message_sent', { chat_session_id: sessionIdRef.current })
  }

  const formatTime = (ts) =>
    new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  const statusLabel = {
    connected: 'Online',
    connecting: 'Connecting…',
    reconnecting: 'Reconnecting…',
    disconnected: 'Offline',
  }[status]

  return (
    <>
      {showTeaser && !isOpen && (
        <div
          className={styles.teaser}
          role="button"
          tabIndex={0}
          onClick={openFromTeaser}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              openFromTeaser()
            }
          }}
        >
          <span className={styles.teaserText}>
            Hi there! Need help finding the perfect timepiece? Chat with us.
          </span>
          <button
            type="button"
            className={styles.teaserClose}
            onClick={dismissTeaser}
            aria-label="Dismiss"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}

      <button
        type="button"
        className={`${styles.bubble} ${isOpen ? styles.bubbleOpen : ''}`}
        onClick={toggle}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <Image
            src="/logo_it.png"
            alt=""
            width={72}
            height={72}
            className={styles.bubbleLogo}
          />
        )}
      </button>

      {isOpen && (
        <div className={styles.window} role="dialog" aria-label="Live chat">
          <header className={styles.header}>
            <span className={styles.title}>Luxury Times - Team Available</span>
            <span className={styles.status} data-status={status}>
              {statusLabel}
            </span>
          </header>

          <div className={styles.messages}>
            {messages.length === 0 && (
              <p className={styles.empty}>Send a message to start the conversation.</p>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={`${styles.message} ${
                  m.senderRole === 'customer' ? styles.outbound : styles.inbound
                }`}
              >
                <div className={styles.msgBubble}>{m.body}</div>
                <time className={styles.time}>{formatTime(m.timestamp)}</time>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form className={styles.form} onSubmit={sendMessage}>
            <input
              ref={inputRef}
              className={styles.input}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={status === 'connected' ? 'Type a message…' : 'Waiting for connection…'}
              disabled={status !== 'connected'}
              maxLength={1000}
              aria-label="Message"
            />
            <button
              type="submit"
              className={styles.send}
              disabled={!input.trim() || status !== 'connected'}
              aria-label="Send message"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  )
}
