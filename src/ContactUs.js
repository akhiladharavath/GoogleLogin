import React, { useRef } from 'react';
import emailjs from 'emailjs-com';
import flex from './assets/flex.png';
import './ContactUs.css';

export const ContactUs = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        // Define the parameters, including the recipient's email address
        const emailParams = {
            to_email: form.current.to_email.value,  // Make sure this matches the name attribute of your email input field
            user_name: form.current.user_name.value,
            message: form.current.message.value
        };

        // Assuming 'service_cu9rfpe' is your service ID and 'template_t4sqcjo' is your template ID
        emailjs.send('service_cu9rfpe', 'template_t4sqcjo', emailParams)
            .then(() => {
                console.log('SUCCESS!');
            }, (error) => {
                console.log('FAILED...', error.text);
            });
    };

    return (
        <div className='row1'>
            <div className='column1' style={{ width: 400, height: 350 }}>
                <div className='vector'>
                    <img src={flex} alt="User" style={{ width: 400, height: 350 }} />
                </div>
            </div>
            <div className='column1' style={{ width: 500, height: 350 }}>

                <form ref={form} onSubmit={sendEmail} className="contact-form">
                    <label>Name</label>
                    <input type="text" name="user_name" />
                    <label>Email</label>
                    <input type="email" name="to_email" />  {/* Make sure the name attribute matches the variable in your EmailJS template */}
                    <label>Message</label>
                    <textarea name="message" />
                    <input type="submit" value="Send" />
                </form>
            </div>
        </div>
    );
};