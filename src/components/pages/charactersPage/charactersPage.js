import React, {Component} from 'react';
import ItemList from '../../itemList';
import ItemDetails from '../../itemDetails';
import GotService from '../../../services/gotService';
import RowBlock from '../../rowBlock';
import {Field} from '../../itemDetails';

export default class CharactersPage extends Component {
    gotService = new GotService();

    state = {
        error: false,
        selectedChar: 38,
    }

    toggleSelectedChar = (id) => {
        this.setState({
            selectedChar: id
        });
    }

    render() {

        const itemList = (
                <ItemList 
                    toggleSelectedItem={this.toggleSelectedChar} 
                    getData={this.gotService.getAllCharacters}
                    renderItem={(item) => `${item.name} (${item.gender})`}
                />
            )

        const charDetails = (
                <ItemDetails label='character' itemId={this.state.selectedChar} getData={this.gotService.getCharacter}>
                    <Field label='Gender' field='gender'></Field>
                    <Field label='Born' field='born'></Field>
                    <Field label='Died' field='died'></Field>
                    <Field label='Culture' field='culture'></Field>
                </ItemDetails>
            )

        return(
            <RowBlock left={itemList} right={charDetails} />
        )
    }
}