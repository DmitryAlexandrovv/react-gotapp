import React, {Component} from 'react';
import './itemList.css';
import Spinner from '../spinner';

export default class ItemList extends Component {

    state = {
        itemList: null,
    }

    componentDidMount() {
        const {getData} = this.props;

        getData()
            .then(itemList => {
                this.setState({
                    itemList
                });
            });
    }

    renderItems(itemList) {
        return itemList.map((item, i) => {
            const label = this.props.renderItem(item);
            const {id} = item;
            return (
                <li key={id} className="list-group-item" onClick={() => this.props.toggleSelectedItem(id)}>
                    {label}
                </li>
            )
        })
    }

    render() {
        const {itemList} = this.state;
        if (itemList === null) return <Spinner />;
        const items = this.renderItems(itemList);

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}