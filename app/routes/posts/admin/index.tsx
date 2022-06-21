import { Link } from '@remix-run/react'
import React from 'react'

const AdminIndexRoute = () => {
  return (
    <Link to='new'>Create new post</Link>
  )
}

export default AdminIndexRoute