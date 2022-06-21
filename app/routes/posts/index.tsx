import { Link, useLoaderData } from "@remix-run/react"
import { json, LoaderFunction } from "@remix-run/server-runtime"
import { getPosts } from "~/models/post.server"


export const loader: LoaderFunction = async()=>{
    const posts = await getPosts()

    return json({posts})
}

const PostRoutes = () => {
    const {posts} = useLoaderData()
  return (
    <main>
        <h1>Posts</h1>
        <ul>
            {
                posts.map((post)=>(
                    <li key= {post.slug}>
                        <Link 
                            to={post.slug}
                            className='text-blue-600 underline'
                        >
                            {post.title}
                        </Link>
                    </li>
                ))
            }
        </ul>
    </main>
  )
}

export default PostRoutes