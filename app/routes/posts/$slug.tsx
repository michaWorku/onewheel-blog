import { useLoaderData } from "@remix-run/react"
import { json, LoaderFunction } from "@remix-run/server-runtime"
import { getPost } from "~/models/post.server"

type LoaderData ={
    post: Awaited<ReturnType<typeof getPost>>
}

export const loader: LoaderFunction = async({params})=>{
    const {slug} = params

    const post = await getPost(slug)

    return json<LoaderData>({post})
}

const PostRoute = () => {
    const {post} = useLoaderData() as LoaderData
  return (
    <main className="mx-auto max-w-4x1">
        <h1 className="my-6 border-b-2 text-center text-3x1">{post?.title}</h1>
    </main>
  )
}

export default PostRoute