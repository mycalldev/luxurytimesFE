'use client'

import Link from 'next/link'
import styles from './Button.module.css'

export default function Button({ 
  href, 
  children, 
  onClick, 
  type = 'button',
  variant = 'primary',
  className = '',
  prefetch = false,
  target,
  disabled = false,
  desktopText,
  ...props
}) {
  const buttonClasses = `${styles.filterBtn} ${variant === 'active' ? styles.activeFilter : ''} ${className}`
  
  // If href is provided, render as Link
  if (href) {
    return (
      <Link 
        href={href} 
        className={buttonClasses}
        prefetch={prefetch}
        target={target}
      >
        {desktopText ? (
          <>
            <span className={styles.mobileText}>{children}</span>
            <span className={styles.desktopText}>{desktopText}</span>
          </>
        ) : (
          children
        )}
      </Link>
    )
  }
  
  // Otherwise render as button
  return (
    <button 
      type={type}
      onClick={onClick}
      className={buttonClasses}
      disabled={disabled}
      {...props}
    >
      {desktopText ? (
        <>
          <span className={styles.mobileText}>{children}</span>
          <span className={styles.desktopText}>{desktopText}</span>
        </>
      ) : (
        children
      )}
    </button>
  )
}

