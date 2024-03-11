import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import emailjs from 'emailjs-com';
import { ContactUs } from './ContactUs';
import axios from 'axios';
import gg1 from './assets/gg1.png';
import './App.css';

function App() {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        emailjs.init('VHWgLFkKJctXhWpU1');
    }, []);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error),
    });

    useEffect(() => {
        if (user?.access_token) {
            axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json`, {
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                }
            })
                .then((res) => {
                    setProfile(res.data);
                    // send an email
                    const emailParams = {
                        to_email: res.data.email,
                        from_name: 'Your Name or App Name',
                        message: 'Your custom message here',
                        // ... include other parameters as needed by your EmailJS template
                    };

                    emailjs.send('service_cu9rfpe', 'template_t4sqcjo', emailParams)
                        .then((response) => {
                            console.log('Email successfully sent!', response);
                        })
                        .catch((err) => console.error('Email sending failed:', err));
                })
                .catch((err) => console.log(err));
        }
    }, [user]);

    const logOut = () => {
        googleLogout();
        setUser(null);
        setProfile(null);
    };

    return (
        <div>

            {profile ? (
                <>
                    <div class="navbar">
                        <h2 class="logo">GoogleLogin</h2>
                        <div class="profile-container">
                            <img src={profile.picture} alt="User" class="profile-pic" />
                            <div class="profile-tooltip">
                                <p>{profile.name}</p>
                                <p>{profile.email}</p>
                                <button onClick={logOut}>Log out</button>
                            </div>
                        </div>
                    </div>
                    <ContactUs />
                </>
            ) : (
                <>
                    <div className='row'>
                        <div className='column' style={{ color: "white" }}>
                            <div className='google'>
                                <h1 >GOOGLE </h1>
                                <h1 >LOGIN PAGE</h1>
                            </div>
                            <div className='button-container' >
                                <button onClick={login} className="google-login-button">
                                    <span className="fa-icon">
                                        <FontAwesomeIcon icon={faGoogle} size="lg" style={{ color: "blue" }} /> {/* Adjust the size as needed */}
                                    </span>
                                    Sign in with Google
                                </button>
                            </div>
                        </div>
                        <div className='column' style={{ marginLeft: '100px' }}>
                            <div style={{
                                width: '340px', // width of the image plus double the desired padding
                                height: '340px', // height of the image plus double the desired padding
                                backgroundColor: "white",
                                borderRadius: '170px', // To maintain a circular shape, make this half of the new width or height
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <img
                                    src={gg1}
                                    alt="Example"
                                    style={{
                                        width: '300px',
                                        height: '300px',
                                        borderRadius: '150px' // Optional if you want the image itself to also be rounded
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default App;