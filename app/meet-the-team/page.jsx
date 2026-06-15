import Image from 'next/image'
import styles from './meetTheTeam.module.css'

export const metadata = {
  title: 'Meet the Team | Luxury Times',
  description: 'Get to know the Luxury Times team — the people behind our pre-owned luxury watch collection.',
  alternates: { canonical: '/meet-the-team' },
}

const TEAM = [
  {
    name: 'Rob',
    image: '/meet_the_team/rob.webp',
    role: 'Founder & Director',
    bio: 'Rob founded Luxury Times with a simple vision: to make pre-owned luxury watches accessible, trustworthy, and exciting. His passion for horology and commitment to integrity are at the heart of everything the business stands for.',
  },
  {
    name: 'Rob',
    image: '/rob_image.jpeg',
    role: 'Founder & Director',
    bio: 'Rob founded Luxury Times with a simple vision: to make pre-owned luxury watches accessible, trustworthy, and exciting. His passion for horology and commitment to integrity are at the heart of everything the business stands for.',
  },
  {
    name: 'Alexa',
    image: '/meet_the_team/ALexa.webp',
    role: 'Client Relations',
    bio: 'Alexa is the first point of contact for many of our clients, bringing warmth and expertise to every interaction. With a keen eye for detail and a passion for horology, she ensures every customer feels valued from the moment they reach out.',
  },
  {
    name: 'Ciaran',
    image: '/meet_the_team/ciaran.webp',
    role: 'Watch Specialist',
    bio: 'Ciaran has spent years immersed in the world of luxury timepieces. His deep knowledge of Rolex, Patek Philippe, and Audemars Piguet makes him the go-to expert for clients seeking guidance on their next acquisition.',
  },
  {
    name: 'Hamza',
    image: '/meet_the_team/Hamza.webp',
    role: 'Sales Director',
    bio: 'Hamza leads our sales team with a client-first philosophy. His background in fine jewellery and watches gives him a unique perspective on value, authenticity, and the art of finding the perfect timepiece for each individual.',
  },
  {
    name: 'Karen',
    image: '/meet_the_team/Karen.webp',
    role: 'Operations Manager',
    bio: 'Karen keeps everything running smoothly behind the scenes. From logistics to client follow-ups, her meticulous approach ensures that every transaction at Luxury Times is seamless, transparent, and professionally handled.',
  },
  {
    name: 'Lydia',
    image: '/meet_the_team/lydia.webp',
    role: 'Brand & Marketing',
    bio: 'Lydia is the creative force behind the Luxury Times brand. She crafts the stories that connect our watches to the people who love them, bringing elegance and authenticity to everything we share.',
  },
  {
    name: 'Wisam',
    image: '/meet_the_team/WISAM.webp',
    role: 'Watch Authentication',
    bio: 'Wisam is our in-house authentication specialist. Every watch that passes through Luxury Times is rigorously inspected by Wisam to ensure it meets our strict standards for quality, provenance, and condition.',
  },
]

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
            <p className={styles.bio}>{member.bio}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
