import { useLoaderData } from "@remix-run/react"
import { json, LoaderFunction } from "@remix-run/server-runtime"
import { getPost, Post } from "~/models/post.server"
import {marked} from 'marked'
import invariant from "tiny-invariant"
import { ClientOnly } from "remix-utils"
import EditorjsReact from "~/components/editorjsReact.client"

type LoaderData ={
    title: string,
    html: string,
    post: Post
}

export const loader: LoaderFunction = async({params})=>{
    const {slug} = params

    invariant(slug, 'slug is required')
    const post = await getPost(slug)

    invariant(post, `Post not found: ${slug}`)
    const html = marked(post.markdown)

    return json<LoaderData>({title: post.title, html, post})
}

const PostRoute = () => {
    const {title, html, post} = useLoaderData() as LoaderData
  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">{title}</h1>
      <ClientOnly>
        {() => <EditorjsReact previousData={post.editorjs} />}
      </ClientOnly>
      {/* <div dangerouslySetInnerHTML={{ __html: html }} /> */}
    </main>
  )
}

export default PostRoute