import { Link } from '@remix-run/react'
import { json, LoaderFunction } from '@remix-run/server-runtime'
import React from 'react'
import { requireAdminUser } from '~/session.server'

export const loader: LoaderFunction = async ({request})=>{
    await requireAdminUser(request)

    return json({})
}

const AdminIndexRoute = () => {
  return (
    <Link to='new'>Create new post</Link>
  )
}

export default AdminIndexRoute