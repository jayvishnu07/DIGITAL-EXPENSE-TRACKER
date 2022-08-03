import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import { ClimbingBoxLoader } from 'react-spinners';
import { useProfile } from '../../ContextApi/profile.context';

import './css/Loading.css'

const PrivateRoute = () => {
  const { profile, isLoading } = useProfile();

  if (isLoading && !profile) {
    return (
      <div className='loader-div'>
        <ClimbingBoxLoader />
      </div>
    )
  }

  if (!profile && !isLoading) {

    return (
      <>
        <Navigate to='/login' />

      </>
    )
  }
  return (
    <Outlet />
  )
}

export default PrivateRoute;