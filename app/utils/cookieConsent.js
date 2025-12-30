// Cookie consent utility functions

const COOKIE_CONSENT_KEY = 'luxury-times-cookie-consent';
const COOKIE_EXPIRY_DAYS = 365;

export const COOKIE_CATEGORIES = {
  ESSENTIAL: 'essential',
  ANALYTICS: 'analytics',
  MARKETING: 'marketing',
};

// Get consent from localStorage
export function getCookieConsent() {
  if (typeof window === 'undefined') return null;
  
  try {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (consent) {
      return JSON.parse(consent);
    }
  } catch (error) {
    console.error('Error reading cookie consent:', error);
  }
  return null;
}

// Save consent to localStorage
export function saveCookieConsent(consent) {
  if (typeof window === 'undefined') return;
  
  try {
    const consentData = {
      ...consent,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consentData));
    
    // Also set a cookie for server-side access if needed
    setCookie(COOKIE_CONSENT_KEY, JSON.stringify(consentData), COOKIE_EXPIRY_DAYS);
  } catch (error) {
    console.error('Error saving cookie consent:', error);
  }
}

// Check if user has given consent
export function hasConsentBeenGiven() {
  const consent = getCookieConsent();
  return consent !== null;
}

// Check if a specific category is consented
export function hasCategoryConsent(category) {
  const consent = getCookieConsent();
  if (!consent) return false;
  
  // Essential cookies are always allowed
  if (category === COOKIE_CATEGORIES.ESSENTIAL) return true;
  
  return consent[category] === true;
}

// Accept all cookies
export function acceptAllCookies() {
  const consent = {
    [COOKIE_CATEGORIES.ESSENTIAL]: true,
    [COOKIE_CATEGORIES.ANALYTICS]: true,
    [COOKIE_CATEGORIES.MARKETING]: true,
  };
  saveCookieConsent(consent);
  return consent;
}

// Reject all non-essential cookies
export function rejectAllCookies() {
  const consent = {
    [COOKIE_CATEGORIES.ESSENTIAL]: true,
    [COOKIE_CATEGORIES.ANALYTICS]: false,
    [COOKIE_CATEGORIES.MARKETING]: false,
  };
  saveCookieConsent(consent);
  return consent;
}

// Save custom cookie preferences
export function saveCustomConsent(preferences) {
  const consent = {
    [COOKIE_CATEGORIES.ESSENTIAL]: true, // Always true
    [COOKIE_CATEGORIES.ANALYTICS]: preferences[COOKIE_CATEGORIES.ANALYTICS] || false,
    [COOKIE_CATEGORIES.MARKETING]: preferences[COOKIE_CATEGORIES.MARKETING] || false,
  };
  saveCookieConsent(consent);
  return consent;
}

// Helper function to set a cookie
function setCookie(name, value, days) {
  if (typeof document === 'undefined') return;
  
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
}

// Get cookie value
export function getCookie(name) {
  if (typeof document === 'undefined') return null;
  
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}


