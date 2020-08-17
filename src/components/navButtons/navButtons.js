import React, {useState, useEffect} from 'react';
import Prev from './buttons/prev';
import Next from './buttons/next';
import './navButtons.css';

function NavButtons({nextPage, prevPage, maxPageId, pageId, toggleSelectedPage}) {

    const [value, updateValue] = useState(pageId);
    const [clazz, updateClazz] = useState('');

    function pageTogler(value) {
        toggleSelectedPage(value);
        updateValue(value);
        if(value < 1 || value > maxPageId){
            updateClazz('input-error');
        } else {
            updateClazz('');
        }
    }

    return(
        <div className="nav-buttons d-flex justify-content-end align-items-center">
            <span className="page-counter">
                <input 
                    value={value} 
                    className={"page-selected " + clazz}
                    onChange={(event) => {
                        event.target.value = event.target.value.replace (/\D/, '');
                        const value = +event.target.value;
                        pageTogler(value);
                    }} />/{maxPageId}
            </span>
            <Prev prevPage={prevPage} />
            <Next nextPage={nextPage} />
        </div>
    )
}

export default NavButtons;