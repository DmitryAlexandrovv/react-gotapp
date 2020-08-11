import React, {useState, useEffect} from 'react';
import './randomChar.css';
import '../../services/gotService';
import GotService from '../../services/gotService';
import Spinner from '../spinner'
import ErrorMessage from '../errorMessage'

function RandomChar() {

    const gotService = new GotService();
    
    const [char, updateChar] = useState({});
    const [loading, updateLoading] = useState(true);
    const [error, upadteError] = useState(false);

    useEffect(() => {
        getRandomchar();
        let timerId = setInterval(getRandomchar, 3000);
        return (timerId) => {
            clearInterval(timerId);
        }
    }, []);

    function oncharLoaded(char) {
        updateChar(char);
        updateLoading(false);
    }

    function getRandomchar() {
        const id = Math.floor(25 + Math.random()*100);
        gotService.getCharacter(id)
              .then(char => oncharLoaded(char))
              .catch(onError);
    }

    function onError() {
        upadteError(true);
        updateLoading(false);
    }

    const content = (loading || error) ? null : <ViewContent char={char} />
    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;

    return (
        <div className="random-block rounded">
            {content}
            {spinner}
            {errorMessage}
        </div>
    );
}

const ViewContent = ({char}) => {
    const {name, gender, born, died, culture} = char;


    return (
        <>
        <h4>Random Character: {name}</h4>
        <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex justify-content-between">
                <span className="term">Gender </span>
                <span>{gender}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
                <span className="term">Born </span>
                <span>{born}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
                <span className="term">Died </span>
                <span>{died}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
                <span className="term">Culture </span>
                <span>{culture}</span>
            </li>
        </ul>
        </>
    )
}

export default RandomChar;
