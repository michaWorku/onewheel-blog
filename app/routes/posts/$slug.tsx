import { useLoaderData } from "@remix-run/react"
import { json, LoaderFunction } from "@remix-run/server-runtime"
import { getPost } from "~/models/post.server"
import {marked} from 'marked'

type LoaderData ={
    post: Awaited<ReturnType<typeof getPost>>,
    html: string
}

export const loader: LoaderFunction = async({params})=>{
    const {slug} = params

    const post = await getPost(slug)

    const html = marked(post.markdown)

    return json<LoaderData>({post, html})
}

const PostRoute = () => {
    const {post, html} = useLoaderData() as LoaderData
  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">{post?.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  )
}

export default PostRoute