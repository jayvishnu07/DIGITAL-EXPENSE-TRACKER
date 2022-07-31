import React from 'react'
import './Contact.css'

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-form-container">
        <span className='contact-main-title' >Send E-Mail</span>
        
        <div className="contact-form-input-div">
          <input className='contact-form-input' type="text" placeholder='Name' />
          <input className='contact-form-input' type="text" placeholder='Mail-ID' />
          <input className='contact-form-input' type="text" placeholder='Subject' />
          <textarea className='contact-form-input contact-form-input-msg' type="password" placeholder='Message' />
        </div>
       
        <button className="contact-submit-btn">Send</button>
      </div>
    </div>
  )
}

export default Contact