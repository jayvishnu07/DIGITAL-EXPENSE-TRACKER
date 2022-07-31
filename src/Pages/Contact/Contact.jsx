import React, { useRef } from 'react'
import './Contact.css'
import { toast } from 'react-toastify';
import emailjs from '@emailjs/browser';

const Contact = () => {

  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_2i9bm8i', 'template_m4xhek4', form.current, '28AjKegQKZyj66htw')
    .then((result) => {
        console.log("success fine",result.text);
        alert('ok')
        toast.success('Message Sent...!', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }); 
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <form className="contact-container" ref={form} onSubmit={sendEmail}>
      <div className="contact-form-container">
        <span className='contact-main-title' >Send E-Mail</span>
        
        <div className="contact-form-input-div">
          <input required name="user_name" className='contact-form-input' type="text" placeholder='Name' />
          <input required name="user_email" className='contact-form-input' type="text" placeholder='Mail-ID' />
          <input required name="user_sub" className='contact-form-input' type="text" placeholder='Subject' />
          <textarea required name="user_message" className='contact-form-input contact-form-input-msg' type="password" placeholder='Message' />
        </div>
       
        <button className="contact-submit-btn" value="Send">Send</button>
      </div>
    </form>
  )
}

export default Contact