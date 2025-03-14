// Central metadata configuration for admin pages

// Base URL for metadata 
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://luxurytimesltd.co.uk';

// Shared metadata config
export const sharedMetadata = {
  title: {
    template: '%s | Luxury Times Admin',
    default: 'Luxury Times Admin'
  },
  description: 'Admin dashboard for Luxury Times Ltd website management',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'Luxury Times Admin',
    images: [
      {
        url: `${baseUrl}/images/admin-og-image.jpg`, // You can create this image or use an existing one
        width: 1200,
        height: 630,
        alt: 'Luxury Times Admin Dashboard'
      }
    ]
  },
  robots: {
    index: false,
    follow: false
  }
};

// Generate metadata for specific admin pages
export function generateAdminMetadata(pageName) {
  return {
    ...sharedMetadata,
    title: `${pageName} | Luxury Times Admin`,
    openGraph: {
      ...sharedMetadata.openGraph,
      title: `${pageName} | Luxury Times Admin`,
    }
  };
} 