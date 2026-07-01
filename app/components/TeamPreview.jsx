import Image from 'next/image'
import Link from 'next/link'
import Button from './Button'
import styles from './TeamPreview.module.css'
import { TEAM } from '../data/team'

// Show the first four team members as a teaser on the home page,
// with a CTA into the full Meet the Team page.
const PREVIEW = TEAM.slice(0, 4)

export default function TeamPreview() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Meet the Team</h2>
        <p className={styles.description}>
          The specialists behind every timepiece at Luxury Times.
        </p>

        <div className={styles.grid}>
          {PREVIEW.map((member) => (
            <Link key={member.name} href="/meet-the-team" className={styles.member}>
              <div className={styles.imageWrapper}>
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className={styles.image}
                  sizes="(max-width: 600px) 140px, 200px"
                  quality={90}
                />
              </div>
              <p className={styles.name}>{member.name}</p>
              <p className={styles.role}>{member.role}</p>
            </Link>
          ))}
        </div>

        <div className={styles.button}>
          <Button href="/meet-the-team" prefetch={true}>
            Meet the Team
          </Button>
        </div>
      </div>
    </section>
  )
}
