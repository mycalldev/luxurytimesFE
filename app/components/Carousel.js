'use client'

import { useState, useEffect } from 'react';
import styles from './Carousel.module.css';

export default function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const images = [
        { src: '/HeroImages/image1.JPG', alt: 'Hero Image 1' },
        { src: '/HeroImages/image2.JPG', alt: 'Hero Image 2' },
        { src: '/HeroImages/image3.JPG', alt: 'Hero Image 3' },
        { src: '/HeroImages/image4.JPG', alt: 'Hero Image 4' },
        { src: '/HeroImages/image5.JPG', alt: 'Hero Image 5' },
        { src: '/HeroImages/image6.JPG', alt: 'Hero Image 6' },
        { src: '/HeroImages/image7.JPG', alt: 'Hero Image 7' },
        { src: '/HeroImages/image8.JPG', alt: 'Hero Image 8' },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
        }, 5000);

        return () => clearInterval(timer);
    }, [images.length]);

    return (
        <div className={styles.carousel}>
            <div className={styles.imageWrapper}>
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image.src}
                        alt={image.alt}
                        className={`${styles.image} ${index === currentIndex ? styles.fadeIn : ''}`}
                    />
                ))}
            </div>
        </div>
    );
} 