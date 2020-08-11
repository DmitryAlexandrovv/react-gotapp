import React, {useState, useEffect} from 'react';
import './itemDetails.css';
import GotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

const Field = ({item, field, label}) => {
    return(
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}

export {Field}

function ItemDetails({itemId, getData, label, children}) {

    const gotService = new GotService();

    const [item, updateStateItem] = useState(null);
    const [loading, updateLoading] = useState(true);
    const [error, updateError] = useState(false);

    useEffect(() => {
        updateItem();
    }, [itemId]);

    function updateItem() {
        if(itemId == null){
            return null;
        }

        console.log(itemId);

        updateLoading(true);

        getData(itemId)
            .then(item => {
                updateStateItem(item);
                updateLoading(false);
            })
            .catch(() => onError());
    }

    function onError() {
        updateStateItem(null);
        updateError(true);
        updateLoading(false);
    }

    if (loading) {
        return (
            <div className="char-details rounded">
                <Spinner/>
            </div>
        )
    }

    if (!item && error) {
        return <ErrorMessage/>
    } else if (!item) {
        return <span className="select-error">Please select a {label}</span>
    }

    const {name} = item;

    return (
        <div className="char-details rounded">
            <h4>{name}</h4>
            <ul className="list-group list-group-flush">
                {
                    React.Children.map(children, (child) => {
                        return React.cloneElement(child, {item});
                    })
                }
            </ul>
        </div>
    );
}

export default ItemDetails;