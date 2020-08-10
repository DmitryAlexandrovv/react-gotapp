import React, {Component} from 'react';
import ItemList from '../../itemList';
import ItemDetails from '../../itemDetails';
import GotService from '../../../services/gotService';
import RowBlock from '../../rowBlock';
import {Field} from '../../itemDetails';

export default class BooksPage extends Component {
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

        const itemList = (
                <ItemList 
                    toggleSelectedItem={this.toggleSelectedBook} 
                    getData={this.gotService.getBooks}
                    renderItem={(item) => `${item.name} (${item.authors})`}
                />
            )
        const charDetails = (
                <ItemDetails label='character' itemId={this.state.selectedBook} getData={this.gotService.getBook}>
                    <Field label='Name' field='name'></Field>
                    <Field label='Authors' field='authors'></Field>
                </ItemDetails>
            )

        return(
            <RowBlock left={itemList} right={charDetails} />
        )
    }
}