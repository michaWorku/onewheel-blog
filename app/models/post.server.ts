import { prisma } from "~/db.server"

export const getPosts = async () => {
    return await prisma.post.findMany()
}