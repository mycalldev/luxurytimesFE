import BlogDetails from "../BlogDetails"

export async function generateStaticParams(){
    const res = await fetch('https://www.luxurytimesltd-be.co.uk/api/blogs/')

    const blogs = await res.json()

    return blogs.map((blog) => ({
         id: blog.id   
}))
}


async function getBlog(id) {
    const uniqueID = id.toString()
    const res = await fetch('https://www.luxurytimesltd-be.co.uk/api/blog/'+ id, {
    
        next: {
            revalidate: 30,
        }
    })
    const data = await res.json()
    return data

}

export default async function Blogs({ params }) {
const blog = await getBlog(params.id) 

return (
    <>
    <main>
        <BlogDetails blogDetails={blog} />
    </main>
    </>
  )
}
