import React from 'react'
import {Outlet ,Navigate} from 'react-router-dom';
import { ClimbingBoxLoader } from 'react-spinners';
import { useProfile } from '../../ContextApi/profile.context';


const PrivateRoute = () => {
    const {profile, isLoading} = useProfile();

if(isLoading && !profile){
  return(
    <ClimbingBoxLoader  />
  )
}

    if(!profile && !isLoading){
      
        return (
          <>
        <Navigate to='/login' />
        
        </>
    )}
  return (
    <Outlet/>
  )
}

export default PrivateRoute;