'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { io } from 'socket.io-client'
import styles from './LiveChat.module.css'

const SOCKET_URL = 'wss://chat.luxurytimesltd.co.uk'
const SESSION_STORAGE_KEY = 'lt_chat_session_id'

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [status, setStatus] = useState('connecting')
  const socketRef = useRef(null)
  const sessionIdRef = useRef(null)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const welcomeShownRef = useRef(false)

  useEffect(() => {
    let sessionId = localStorage.getItem(SESSION_STORAGE_KEY)
    if (!sessionId) {
      sessionId =
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}`
      localStorage.setItem(SESSION_STORAGE_KEY, sessionId)
    }
    sessionIdRef.current = sessionId

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
      socket.emit('join_session', sessionId)
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

    return () => {
      socket.disconnect()
      socketRef.current = null
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen])

  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

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

  const toggle = () => setIsOpen((v) => !v)

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
            width={60}
            height={60}
            className={styles.bubbleLogo}
            priority
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
