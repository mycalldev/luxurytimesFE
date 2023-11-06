
import WatchDetailsClient from '../WatchDetailsClient';


async function getWatch(id) {
    const uniqueID = id.toString()
    const res = await fetch('https://www.luxurytimesltd-be.co.uk/api/patek-philippe/'+ id, {
    
        next: {
            revalidate: 30,
        }
    })
    const data = await res.json()
    return data

}

export default async function WatchDetails({ params }) {
const watch = await getWatch(params.id) 
const watchArr = Array.from(watch.imageAmount) 

return (
    <>
    <main>
        <WatchDetailsClient watchArr={watchArr} watch={watch} />
    </main>
    </>
  )
}
