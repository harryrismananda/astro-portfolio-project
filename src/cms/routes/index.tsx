import React from 'react'
import { Navigate } from '@tanstack/react-router'

const Index = () => {
  const token = localStorage.getItem('token')
  return <Navigate to={token ? "/dashboard" : "/login"} />
}

export default Index
