import { Post } from "@prisma/client"
import { prisma } from "~/db.server"

export type {Post}

export const getPostListings =async () => {
    return prisma.post.findMany({
        select:{
            slug: true,
            title: true
        }
    })
}

export const getPosts = () => {
    return prisma.post.findMany()
}

export const getPost = (slug:string) => {
    return prisma.post.findUnique({where:{slug}})
}

export const createPost = (post: Pick<Post, 'title' | 'slug' | 'markdown' | 'editorjs'>)=>{
    return prisma.post.create({data: post})
}

export const updatePost = (slug: string, post: Pick<Post, 'title' | 'slug' | 'markdown' | 'editorjs'>)=>{
    return prisma.post.update({data: post, where: {slug}})
}

export const deletePost = (slug: string)=>{
    return prisma.post.delete({where: {slug}})
}