
import RingDetailsClient from '../RingDetailsClient';


async function getRing(id) {
    const uniqueID = id.toString()
    const res = await fetch('https://www.luxurytimesltd-be.co.uk/api/ring/'+ id, {
    
        next: {
            revalidate: 30,
        }
    })
    const data = await res.json()
    return data

}

export default async function RingDetails({ params }) {

const ring = await getRing(params.id) 
const ringArr = Array.from(ring.imageAmount) 

return (
    <>
    <main>
        <RingDetailsClient ringArr={ringArr} ring={ring} />
    </main>
    </>
  )
}
