'use client'

export default function CtaLink({
  href,
  ctaLabel,
  ctaLocation,
  className,
  children,
  ...rest
}) {
  const handleClick = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'landing_cta_click', {
        landing_page: 'daytona-116520',
        cta_label: ctaLabel,
        cta_location: ctaLocation,
        destination: href,
      })
    }
  }

  return (
    <a href={href} onClick={handleClick} className={className} {...rest}>
      {children}
    </a>
  )
}
