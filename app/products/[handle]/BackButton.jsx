'use client'

import { useRouter } from 'next/navigation'
import styles from './product.module.css'

export default function BackButton() {
  const router = useRouter()

  const handleBack = () => {
    const saved = sessionStorage.getItem('productsBackUrl')
    router.push(saved || '/products')
  }

  return (
    <button className={styles.backButton} onClick={handleBack}>
      ← Previous
    </button>
  )
}
