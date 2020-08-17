import React from 'react';
import './buttons.css';

function Next({nextPage}) {

    return(
        <button onClick={() => nextPage()} className="btn btn-primary btn-nav">Next</button>
    )
}

export default Next;