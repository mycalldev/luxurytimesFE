import Image from 'next/image'
import styles from './meetTheTeam.module.css'
import { TEAM } from '../data/team'

export const metadata = {
  title: 'Meet the Team | Luxury Times',
  description: 'Get to know the Luxury Times team — the people behind our pre-owned luxury watch collection.',
  alternates: { canonical: '/meet-the-team' },
}

export default function MeetTheTeamPage() {
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.title}>Meet the Team</h1>
        <p className={styles.subtitle}>
          The passionate people behind Luxury Times.
        </p>
      </div>

      <div className={styles.list}>
        {TEAM.map((member) => (
          <div key={member.name} className={styles.member}>
            <div className={styles.imageWrapper}>
              <Image
                src={member.image}
                alt={member.name}
                fill
                className={`${styles.image} ${member.invert ? styles.inverted : ''}`}
                sizes="(max-width: 600px) 260px, 320px"
                quality={90}
              />
            </div>
            <p className={styles.name}>{member.name}</p>
            <p className={styles.role}>{member.role}</p>
            {member.bio.map((paragraph, i) => (
              <p key={i} className={styles.bio}>{paragraph}</p>
            ))}
          </div>
        ))}
      </div>
    </main>
  )
}
