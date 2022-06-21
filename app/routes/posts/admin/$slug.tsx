import { Form, useActionData, useTransition } from "@remix-run/react";
import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/server-runtime";
import invariant from "tiny-invariant";
import { createPost } from "~/models/post.server";
import { requireAdminUser } from "~/session.server";

type ActionData = {
    title: null | string,
    slug : null | string,
    markdown: null | string
} | undefined

export const loader: LoaderFunction =async ({request, params}) => {
    await requireAdminUser(request)
    if(params.slug === 'new')
      return json({})
    else 
      return json({post: null})
}

export const action: ActionFunction = async ({request, params})=>{
    await requireAdminUser(request)

    const formData = await request.formData()

    const title= formData.get('title')
    const slug= formData.get('slug')
    const markdown= formData.get('markdown')
    
    const errors: ActionData = {
        title: title? null: 'Title is required',
        slug: slug? null: 'Slug is requried',
        markdown: markdown? null: 'Markdown is required'
    }
    const HasErrors = Object.values(errors).some((errorMessage)=>errorMessage)

    if(HasErrors){
        return json<ActionData>(errors)
    }

    invariant(typeof title === 'string', 'title must be string')
    invariant(typeof slug === 'string', 'slug must be string')
    invariant(typeof markdown === 'string', 'markdown must be string')

    if(params.slug === 'new'){
      await createPost({title, slug, markdown})
    }
    else{
      //Todo
    }
      
    return redirect('/posts/admin')
}

const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 text-lg`;

const NewPost = () => {
  const errors = useActionData() as ActionData

  const transition = useTransition()
  const isCreating = Boolean(transition.submission)

  return (
    <Form method="post" >
      <p>
        <label>
          Post Title:{" "}
           {errors?.title ? <em className="text-red-600">{errors.title}</em> : null}
          <input
            type="text"
            name="title"
            className={inputClassName}
            
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
             
          />
        </label>
      </p>
      <p>
        <label htmlFor="markdown">
          Markdown:{" "}
          {errors?.markdown? <em className="text-red-600">{errors.markdown}</em> : null}
        </label>
        <textarea
          id="markdown"
          rows={20}
          name="markdown"
          className={`${inputClassName} font-mono`}
           
        />
      </p>
      <p className="text-right">
        <button
         type="submit"
         className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
         disabled={isCreating}
       >
          {isCreating? 'Creating...': 'Create Post'}  
        </button>
      </p>
    </Form>
  )
}

export default NewPost