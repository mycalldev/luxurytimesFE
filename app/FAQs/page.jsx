import FAQsClient from './FAQsClient';

export const metadata = {
  title: 'Frequently Asked Questions | Luxury Times',
  description: 'Find answers to common questions about buying, selling and authenticating luxury watches at Luxury Times.',
  alternates: { canonical: '/FAQs' },
};

export default function FAQsPage() {
  return <FAQsClient />;
}
