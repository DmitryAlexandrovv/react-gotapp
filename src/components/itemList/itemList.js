import React, {useState, useEffect} from 'react';
import './itemList.css';
import Spinner from '../spinner';
import NavButtons from '../navButtons/';
import Error from '../errorMessage/';

function ItemList({getData, toggleSelectedItem, renderItem, maxPageId}) {

    const [itemList, updateList] = useState(null);
    const [pageId, updatePage] = useState(1);
    const [loading, updateLoading] = useState(false);
    const [errorMessage, updateError] = useState(false);

    useEffect(() => {
        getData(pageId)
            .then(data => {
                updateList(data);
                updateLoading(false);
            })
            .catch(() => {
                updateError(true);
            })
    }, [pageId]);

    function nextPage() {
        updateLoading(true);
        updatePage(pageId + 1);
        if(pageId == +maxPageId) {
            updatePage(1);
        }
    }

    function prevPage() {
        updateLoading(true);
        updatePage(pageId - 1);
        if(pageId <= 1) {
            updatePage(+maxPageId);
        }
    }

    function toggleSelectedPage(id) {
        if(id >= 1 && id <= maxPageId){
            updatePage(id);
        }
    }

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

    if(errorMessage == true) {
        return <Error />
    }
    if (itemList === null || loading == true) return <Spinner />;
    const items = renderItems(itemList);

    return (
        <ul className="item-list list-group">
            {items}
            <NavButtons toggleSelectedPage={toggleSelectedPage} pageId={pageId} maxPageId={maxPageId} nextPage={nextPage} prevPage={prevPage} />
        </ul>
    );
}

export default ItemList;