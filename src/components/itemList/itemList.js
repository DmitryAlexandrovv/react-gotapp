import React, {useState, useEffect} from 'react';
import './itemList.css';
import Spinner from '../spinner';
import GotService from '../../services/gotService';

function ItemList({getData, toggleSelectedItem, renderItem}) {

    const gotService = new GotService();

    const [itemList, updateList] = useState(null);

    useEffect(() => {
        getData()
            .then(data => {
                updateList(data);
            });
    }, []);

    function renderItems(itemList) {
        return itemList.map((item, i) => {
            const label = renderItem(item);
            const {id} = item;
            return (
                <li key={id} className="list-group-item" onClick={() => toggleSelectedItem(id)}>
                    {label}
                </li>
            )
        })
    }

    if (itemList === null) return <Spinner />;
    const items = renderItems(itemList);

    return (
        <ul className="item-list list-group">
            {items}
        </ul>
    );
}

export default ItemList;