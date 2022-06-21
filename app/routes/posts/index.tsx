import { Link, useLoaderData } from "@remix-run/react"
import { json, LoaderFunction } from "@remix-run/server-runtime"


export const loader: LoaderFunction =()=>{
    const posts = [
        {
            slug: 'my-first-post',
            title: 'My First Post'
        },
        {
            slug: 'trail-riding-with-onewheel',
            title: 'Trail Riding With Onewheel'
        }
    ]

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