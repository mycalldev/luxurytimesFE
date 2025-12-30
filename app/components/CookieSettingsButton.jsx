'use client'

export default function CookieSettingsButton({ className }) {
  const handleClick = () => {
    if (typeof window !== 'undefined' && window.openCookieSettings) {
      window.openCookieSettings()
    }
  }

  return (
    <button 
      onClick={handleClick}
      className={className}
      style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}
    >
      Cookie Settings
    </button>
  )
}


