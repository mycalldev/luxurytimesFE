'use client';

import { useState } from 'react';
import styles from './FAQs.module.css';
import Link from 'next/link';
import Button from '../components/Button';

const faqs = [
  {
    id: 1,
    category: 'Rolex',
    question: 'How do I authenticate a Rolex watch?',
    answer: 'Authenticating a Rolex requires examining several key elements: the serial number, reference number, movement, crown logo, and overall craftsmanship. At Luxury Times, every Rolex we sell undergoes meticulous authentication by our expert team. We verify the watch\'s provenance, check all serial numbers against Rolex databases, and inspect the movement for authenticity. We recommend purchasing from authorized dealers or reputable specialists like Luxury Times to ensure authenticity.'
  },
  {
    id: 2,
    category: 'Rolex',
    question: 'What makes a Rolex watch valuable?',
    answer: 'A Rolex\'s value depends on several factors: model rarity, condition, age, provenance, original box and papers, and market demand. Vintage models like the Daytona, Submariner, and GMT-Master often appreciate significantly. Limited editions and discontinued models also command premium prices. The watch\'s condition, service history, and whether it retains original parts are crucial factors in determining value.'
  },
  {
    id: 3,
    category: 'Rolex',
    question: 'Should I buy a new or pre-owned Rolex?',
    answer: 'Both options have advantages. New Rolexes come with full warranty, original packaging, and the peace of mind of being the first owner. Pre-owned Rolexes offer better value, immediate availability (no waiting lists), and often include discontinued models. At Luxury Times, our pre-owned watches are thoroughly authenticated, serviced, and come with our guarantee. The choice depends on your budget, desired model, and preference for new versus vintage.'
  },
  {
    id: 4,
    category: 'Rolex',
    question: 'How often should I service my Rolex?',
    answer: 'Rolex recommends servicing every 10 years, but this can vary based on usage. If you wear your watch daily or in challenging conditions, consider servicing every 5-7 years. Signs that service is needed include inaccurate timekeeping, moisture inside the case, or difficulty winding. Regular servicing maintains the watch\'s value and ensures optimal performance. We can help arrange professional Rolex servicing through our network of certified watchmakers.'
  },
  {
    id: 5,
    category: 'Rolex',
    question: 'Why are some Rolex models so hard to find?',
    answer: 'High demand and limited production create scarcity for popular models like the Daytona, GMT-Master II "Pepsi," and certain Submariner references. Rolex carefully controls production to maintain exclusivity. Authorized dealers often have waiting lists. At Luxury Times, we source rare and in-demand models from our network, offering immediate availability for those who don\'t want to wait.'
  },
  {
    id: 6,
    category: 'Patek Philippe',
    question: 'What makes Patek Philippe watches so expensive?',
    answer: 'Patek Philippe\'s pricing reflects exceptional craftsmanship, heritage, and exclusivity. Each watch is hand-finished by master craftsmen, with movements requiring hundreds of hours to complete. The brand\'s 180+ year history, limited production, and reputation for creating heirloom-quality timepieces contribute to their value. Patek Philippe watches often appreciate over time, making them both luxury items and investments.'
  },
  {
    id: 7,
    category: 'Patek Philippe',
    question: 'Are Patek Philippe watches good investments?',
    answer: 'Many Patek Philippe models, especially complications like the Nautilus, Aquanaut, and Grand Complications, have shown strong appreciation. However, investment potential varies by model, condition, and market conditions. Not all Patek watches appreciate equally. We recommend purchasing primarily for enjoyment, with potential appreciation as a secondary benefit. Our team can advise on models with strong historical performance.'
  },
  {
    id: 8,
    category: 'Patek Philippe',
    question: 'How do I verify the authenticity of a Patek Philippe?',
    answer: 'Authenticating a Patek Philippe requires expert knowledge. Key indicators include the movement\'s finishing quality, case engravings, dial details, and the certificate of origin. Every authentic Patek comes with papers and often a certificate. At Luxury Times, we authenticate every Patek Philippe through detailed examination of the movement, case, and documentation. We only sell watches with verified provenance and authenticity.'
  },
  {
    id: 9,
    category: 'Patek Philippe',
    question: 'What is the difference between Patek Philippe complications?',
    answer: 'Patek Philippe offers various complications beyond basic timekeeping. Simple complications include date, day-date, and moon phase. Advanced complications include chronographs, perpetual calendars, minute repeaters, and tourbillons. Grand Complications combine multiple functions like the Grandmaster Chime, which features 20 complications. Each complication increases complexity, craftsmanship time, and value. Our experts can explain the features and value of different complications.'
  },
  {
    id: 10,
    category: 'Patek Philippe',
    question: 'How long is the waiting list for a new Patek Philippe?',
    answer: 'Waiting times vary significantly by model. Popular models like the Nautilus can have multi-year waiting lists at authorized dealers. Less popular or more expensive models may be available sooner. At Luxury Times, we offer pre-owned and vintage Patek Philippe watches with immediate availability, often including rare and discontinued models not available through traditional channels.'
  },
  {
    id: 11,
    category: 'General',
    question: 'Do you offer authentication services?',
    answer: 'Yes, Luxury Times provides professional authentication services for luxury watches. Our expert team examines every aspect of a timepiece, including movement, case, dial, and documentation. We can authenticate Rolex, Patek Philippe, Audemars Piguet, and other luxury brands. Authentication is essential when buying pre-owned watches and helps protect your investment.'
  },
  {
    id: 12,
    category: 'General',
    question: 'What payment methods do you accept?',
    answer: 'We accept various payment methods including bank transfers, credit cards, and certified checks. For high-value purchases, we may require additional verification. We also offer trade-in options where you can exchange your current watch toward a new purchase. Our team will work with you to arrange the most convenient and secure payment method for your transaction.'
  },
  {
    id: 13,
    category: 'General',
    question: 'Do you offer warranties on pre-owned watches?',
    answer: 'Yes, all pre-owned watches sold by Luxury Times come with our guarantee of authenticity and a warranty period. We thoroughly service and inspect every watch before sale. Additionally, we can arrange extended warranties and service plans. Our commitment is to ensure you\'re completely satisfied with your purchase and that your timepiece performs as expected.'
  },
  {
    id: 14,
    category: 'General',
    question: 'Can I trade in my watch for a new purchase?',
    answer: 'Absolutely! Luxury Times offers competitive trade-in valuations for luxury watches. We assess your watch based on model, condition, age, and market value. You can apply the trade-in value toward any watch in our collection. Our transparent valuation process ensures you receive fair market value for your timepiece. Contact us with details about your watch for a preliminary valuation.'
  },
  {
    id: 15,
    category: 'General',
    question: 'How do you determine the value of my watch?',
    answer: 'We evaluate watches based on multiple factors: brand and model, condition (case, dial, movement), age and rarity, original box and papers, service history, and current market demand. Our team has extensive knowledge of market trends and uses industry databases to ensure fair valuations. We provide transparent, detailed valuations so you understand how we arrived at the offer.'
  }
];

export default function FAQs() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Rolex', 'Patek Philippe', 'General'];
  const filteredFaqs = selectedCategory === 'All' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  return (
    <main className={styles.containerFAQs}>
      <div className={styles.headerSection}>
        <Link href={'/'} className={styles.backLink}>
          <span className={styles.backArrow}>←</span>
          <span>Home</span>
        </Link>
        <h1 className={styles.titleMain}>Frequently Asked Questions</h1>
        <div className={styles.contactSection}>
          <div className={styles.contactMobile}>
            <Button href="tel:07714611699" desktopText="07714611699">
              CONTACT
            </Button>
          </div>
          <div className={styles.contactDesktop}>
            <h3 className={styles.contactTitle}>Contact Us</h3>
            <a href="tel:07714611699" className={styles.phoneNumber}>07714 611 699</a>
          </div>
        </div>
      </div>

      <div className={styles.introSection}>
        <p className={styles.introText}>
          Have questions about Rolex, Patek Philippe, or luxury watches in general? 
          You're in the right place! Our comprehensive FAQ section covers the most common 
          questions about authentication, valuation, purchasing, and caring for your luxury timepiece.
        </p>
      </div>

      <div className={styles.filterSection}>
        {categories.map((category) => (
          <button
            key={category}
            className={`${styles.filterButton} ${selectedCategory === category ? styles.activeFilter : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className={styles.faqsGrid}>
        {filteredFaqs.map((faq) => (
          <article key={faq.id} className={styles.faqCard}>
            <div className={styles.faqHeader}>
              <span className={styles.faqCategory}>{faq.category}</span>
            </div>
            <h3 className={styles.faqQuestion}>{faq.question}</h3>
            <p className={styles.faqAnswer}>{faq.answer}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
