

async function getWatch(id) {
    const uniqueID = id.toString()
    const res = await fetch('https://www.luxurytimesltd-be.co.uk/api/watch/'+ id, {
    
        next: {
            revalidate: 60,
        }
    })
    const data = await res.json()
    return data

}

export default async function WatchDetails({ params }) {
const watch = await getWatch(params.id)  

return (
    <>
    <main>
        <div>{watch.title}</div> 
    </main>
    </>
  )
}
