import React from 'react';
import img from './img1.jpg';
import './errorMessage.css';

const ErrorMessage = () => {
    return(
        <>
        <img className="error-img" src={img}></img>
        <h5 className="error-text">Something goes wrong</h5>
        </>
    )
}

export default ErrorMessage;