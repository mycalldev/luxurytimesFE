import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link';
import heroImage from '../public/hero_daytona.JPG'

export default function Home() {
  return (
    <main className={styles.main}>
    <Image className={styles.heroImage} 
      src={heroImage} 
      width={1680} 
      height={1120} 
      layout='responsive' 
      alt={'hero image'} 
      quality={100} />
    </main> 
  )
}
