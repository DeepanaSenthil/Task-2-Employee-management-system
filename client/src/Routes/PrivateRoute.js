import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { toastMessage } from '../utils/toasMessage'

export const PrivateDashboradRoute = ({ isLoggedin, role, children }) => {

  useEffect(() => {
    if (!(isLoggedin && role === "admin")) {
      toastMessage("error", "Only admin can access this route.")
    }
  }, [isLoggedin, role])

  return isLoggedin && role === "admin" ? children : <Navigate to="/signin" />
}
