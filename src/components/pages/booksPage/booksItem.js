import React, {Component} from 'react';
import ItemDetails from '../../itemDetails';
import GotService from '../../../services/gotService';
import {Field} from '../../itemDetails';

export default class BooksItem extends Component {
    gotService = new GotService();

    render() {
        return(
            <ItemDetails label='character' itemId={this.props.bookId} getData={this.gotService.getBook}>
                <Field label='Name' field='name'></Field>
                <Field label='Authors' field='authors'></Field>
            </ItemDetails>
        )
    }
}