import invariant from "tiny-invariant"

export const getEnv = ()=>{
    invariant(process.env.ADMIN_EMAIL, 'ADMIN_EMAIL should be defined')

    return {
        ADMIN_EMIAL: process.env.ADMIN_EMAIL
    }
}

type ENV = ReturnType<typeof getEnv>

declare global{
    var ENV: ENV
    
    interface Window {
        ENV: ENV
    }
}