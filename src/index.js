import React from 'react';
import ReactDOM from 'react-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';
import './index.css'; 

ReactDOM.render(
    <GoogleOAuthProvider clientId="808309782638-ltp65a5peqmmbpf7k5o1avqgavtpgu46.apps.googleusercontent.com">
        <React.StrictMode>
            <div className='react'>
            <App />
            </div>
        </React.StrictMode>
    </GoogleOAuthProvider>,
    document.getElementById('root')
);