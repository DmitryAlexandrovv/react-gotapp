import React from 'react';
import './buttons.css';

function Prev({prevPage}) {

    return(
        <button onClick={() => prevPage()} className="btn btn-primary btn-nav">Prev</button>
    )
}

export default Prev;