import React, {Component} from 'react';
import './itemList.css';
import GotService from '../../services/gotService';
import Spinner from '../spinner';

export default class ItemList extends Component {
    constructor(props){
        super(props);
    }

    gotService = new GotService();

    state = {
        charList: null
    }

    componentDidMount() {
        this.gotService.getAllCharacters()
            .then(charList => {
                this.setState({
                    charList
                });
            });
    }

    renderItems(charList) {
        return charList.map((item, i) => {
            return (
                <li key={i} className="list-group-item" onClick={() => this.props.toggleSelectedChar(i + 41)}>
                    {item.name}
                </li>
            )
        })
    }

    render() {
        const {charList} = this.state;
        if (charList === null) return <Spinner />;
        const items = this.renderItems(charList);

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}