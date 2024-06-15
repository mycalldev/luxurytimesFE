
import RingsCategoryClient from './RingsCategoryClient'


async function getRings() {
    
    const res = await fetch('https://www.luxurytimesltd-be.co.uk/api/rings', {
        next: {
            revalidate: 30
        }
    })
    const data = await res.json()
    
    return data
}

export default async function Rings() {

const rings = await getRings()

    return (
        <main>
        
      <RingsCategoryClient rings={rings}/>
        </main>
    )
}