import { Link, useLoaderData } from "@remix-run/react"
import { json, LoaderFunction } from "@remix-run/server-runtime"
import { getPostListings, getPosts } from "~/models/post.server"
import { useOptionalAdminUser } from "~/utils"

type LoaderData ={
    posts: Awaited<ReturnType<typeof getPostListings>>
}

export const loader: LoaderFunction = async()=>{
    const posts = await getPostListings()

    return json<LoaderData>({posts})
}

const PostRoutes = () => {
    const {posts} = useLoaderData() as LoaderData
    const adminUser = useOptionalAdminUser()

  return (
    <main>
        <h1>Posts</h1>
        {adminUser? 
            <Link to='admin' prefetch="intent" className="text-red-600 underline">
                Admin
             </Link>: null}
        <ul>
            {
                posts.map((post)=>(
                    <li key= {post.slug}>
                        <Link 
                            prefetch="intent"
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