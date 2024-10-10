import React from 'react'
import { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const Protected = ({children}) => {
  let location = useLocation()
  // const isSignIn = localStorage.getItem("admin_token_validation")
  const isSignIn='true'
  // if(!isSignIn || isSignIn=="undefine" ){ 
  //   return <Navigate to= "/"/>
  // }
  
  return children
}

export default Protected