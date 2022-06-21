import { prisma } from "~/db.server"

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