import { Form, useActionData, useCatch, useLoaderData, useParams, useTransition } from "@remix-run/react";
import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/server-runtime";
import { useState } from "react";
import { ClientOnly } from "remix-utils";
import invariant from "tiny-invariant";
import Editor from "~/components/editor.client";
import { createPost, deletePost, getPost, Post, updatePost } from "~/models/post.server";
import { requireAdminUser } from "~/session.server";

type LoaderData = {
  post? : Post
}

type ActionData = {
    title: null | string,
    slug : null | string,
    markdown: null | string,
    editorjs: null | string
} | undefined

export const loader: LoaderFunction =async ({request, params}) => {
    await requireAdminUser(request)
    if(params.slug === 'new')
      return json<LoaderData>({})
    else {
      invariant(params.slug, 'slug is required')
      const post = await getPost(params.slug)
      if(!post) throw new Response('post not found', {status: 404})
      return json<LoaderData>({post})
    }
}

export const action: ActionFunction = async ({request, params})=>{
    await requireAdminUser(request)
    invariant(params.slug, 'Slug is required')

    const formData = await request.formData()

    const intent = formData.get('intent')
    if(intent === 'delete'){
      await deletePost(params.slug)
      return redirect('/posts/admin')
    }

    const title= formData.get('title')
    const slug= formData.get('slug')
    const markdown= formData.get('markdown')
    let editorjs = formData.get('editorjs');
    
    const errors: ActionData = {
        title: title? null: 'Title is required',
        slug: slug? null: 'Slug is requried',
        markdown: markdown? null: 'Markdown is required',
        editorjs: editorjs? null: 'file required'
    }
    const HasErrors = Object.values(errors).some((errorMessage)=>errorMessage)

    if(HasErrors){
        return json<ActionData>(errors)
    }

    invariant(typeof title === 'string', 'title must be string')
    invariant(typeof slug === 'string', 'slug must be string')
    invariant(typeof markdown === 'string', 'markdown must be string')
    invariant(typeof editorjs === 'string', 'editorjs must be string')

    if(params.slug === 'new'){
      await createPost({title, slug, markdown, editorjs})
    }
    else{
      await updatePost(params.slug,{title, slug, markdown, editorjs})
    }
      
    return redirect('/posts/admin')
}

const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 text-lg`;

const NewPost = () => {
  const {post} = useLoaderData() as LoaderData

  const errors = useActionData() as ActionData

  const transition = useTransition()
  const isCreating = transition.submission?.formData.get('intent') === 'create'
  const isUpdating = transition.submission?.formData.get('intent') === 'update'
  const isDeleting = transition.submission?.formData.get('intent') === 'delete'
  const isNewPost = !post

  const [savedData, setSavedData] = useState('{}');
  
  return (
    <Form method="post" key={post?.slug ?? 'new'}>
      <p>
        <label>
          Post Title:{" "}
           {errors?.title ? <em className="text-red-600">{errors.title}</em> : null}
          <input
            type="text"
            name="title"
            className={inputClassName}
            defaultValue= {post?.title}
          />
        </label>
      </p>
      <p>
        <label>
          Post Slug:{" "}
          {errors?.slug? <em className="text-red-600">{errors.slug}</em> : null}
          <input
            type="text"
            name="slug"
            className={inputClassName}
            defaultValue={post?.slug}
          />
        </label>
      </p>
      <p>
        <label htmlFor="markdown">
          Markdown:{" "}
          {errors?.markdown? <em className="text-red-600">{errors.markdown}</em> : null}
        </label>
        <br />
        <ClientOnly>
          {() => (
            <Editor
              previousData={JSON.stringify(post?.editorjs)}
              saveOutput={savedData}
              save={(savedData: any) => setSavedData(savedData)}
            />
          )}
        </ClientOnly>
        <textarea
          id="markdown"
          rows={20}
          name="markdown"
          className={`${inputClassName} font-mono`}
          defaultValue={post?.markdown}
        />
      </p>
      <div className="flex justify-end gap-4">
        {
          isNewPost? null : 
          <button
            type="submit"
            name='intent'
            value="delete"
            className="rounded bg-red-500 py-2 px-4 text-white hover:bg-red-600 focus:bg-red-400 disabled:bg-red-300"
            disabled={isDeleting }
           >
           {isDeleting? 'Deleting...': 'Delete'} 
         </button>
        }
        <button
          type="submit"
          name='intent'
          value={isNewPost? 'create': 'update'}
          className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
          disabled={isCreating || isUpdating}
         >
          {isNewPost? (isCreating ? 'Creating...': 'Create Post') : null}
          {isNewPost? null: (isUpdating? 'Updaing...': 'Update')}  
        </button>
        <input
          defaultValue={JSON.stringify(post?.editorjs)}
          name='editorjs'
          value={savedData}
          style={{opacity: 0}}
        ></input>
      </div>
    </Form>
  )
}

export const CatchBoundary = ()=>{
  const caught = useCatch()
  const params = useParams()

  if(caught.status === 404){
    return (
      <div>Uh oh The post with slug "{params.slug}" is not found</div>
    )
  }

  throw new Error(`Unsupported thrown response status code: ${caught.status}`)

}

export function ErrorBoundary({ error }: { error: unknown }) {
  if (error instanceof Error) {
    return (
      <div className="text-red-500">
        Oh no, something went wrong!
        <pre>{error.message}</pre>
      </div>
    );
  }
  return <div className="text-red-500">Oh no, something went wrong!</div>;
}

export default NewPost