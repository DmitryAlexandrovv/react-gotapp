import React, {Component} from 'react';
import ItemList from '../../itemList';
import ItemDetails from '../../itemDetails';
import GotService from '../../../services/gotService';
import RowBlock from '../../rowBlock';
import {Field} from '../../itemDetails';
import {withRouter} from 'react-router-dom';

class BooksPage extends Component {
    gotService = new GotService();

    state = {
        error: false,
        selectedBook: 1,
    }

    toggleSelectedBook = (id) => {
        this.setState({
            selectedBook: id
        });
    }

    render() {

        return(
            <ItemList 
                toggleSelectedItem={(itemId) => {
                    this.props.history.push(itemId);
                }} 
                getData={this.gotService.getBooks}
                renderItem={(item) => `${item.name} (${item.authors})`}
                maxPageId='2'
            />
        )
    }
}

export default withRouter(BooksPage);