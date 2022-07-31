import React from 'react'
import './Navbar.css'

import { Link } from 'react-router-dom'

import { BsPersonCircle } from "react-icons/bs";
import { auth } from "../../misc/Firebase";
import { toast } from 'react-toastify';

import logoImg from '../../assests/images/et_logo.png'


const OnSignOutClicked = () => {
  auth.signOut().then(
    toast.success('Sign-Out Successful...!', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  )
}


const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-logo">
        <div className="nav-logo-img"><img src={logoImg} alt="not foung" /></div>
        <div className="nav-logo-title">Expense Tracker</div>
      </div>
      <div className="nav-links">
        <ul>
          <li> <Link className='nav-links-item' to='/'> Home </Link> </li>
          <li> <Link className='nav-links-item' to='/extra'> Extra </Link> </li>
          <li> <Link className='nav-links-item' to='/contact'> Contact </Link> </li>
          <li>
            <div className='nav-links-item nav-links-item-profile'>
              <BsPersonCircle />
              <li>
                <div class="nav-dropdown-content">
                  <button className='nav-dropdown-content-item' to='/' >Profile</button>
                  <button className='nav-dropdown-content-item' onClick={OnSignOutClicked} >Sign-Out</button>
                </div>
              </li>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
