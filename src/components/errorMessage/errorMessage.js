import React from 'react';
import img from './img1.jpg';
import './errorMessage.css';

const ErrorMessage = () => {
    return(
        <>
        <img src={img}></img>
        <h5>Something goes wrong</h5>
        </>
    )
}

export default ErrorMessage;