import { prisma } from "~/db.server"

export const getPostListings =async () => {
    return prisma.post.findMany({
        select:{
            slug: true,
            title: true
        }
    })
}

export const getPosts = async () => {
    return await prisma.post.findMany()
}