import React, {Component} from 'react';
import ItemList from '../../itemList';
import ItemDetails from '../../itemDetails';
import GotService from '../../../services/gotService';
import RowBlock from '../../rowBlock';
import {Field} from '../../itemDetails';

export default class HousesPage extends Component {
    gotService = new GotService();

    state = {
        error: false,
        selectedHouse: 38,
    }

    toggleSelectedHouse = (id) => {
        this.setState({
            selectedHouse: id
        });
    }

    render() {

        const itemList = (
                <ItemList 
                    toggleSelectedItem={this.toggleSelectedHouse} 
                    getData={this.gotService.getHouses}
                    renderItem={(item) => `${item.name}`}
                />
            )

        const houseDetails = (
                <ItemDetails label='house' itemId={this.state.selectedHouse} getData={this.gotService.getHouse}>
                    <Field label='Region' field='region'></Field>
                    <Field label='Titles' field='titles'></Field>
                    <Field label='Seats' field='seats'></Field>
                </ItemDetails>
            )

        return(
            <RowBlock left={itemList} right={houseDetails} />
        )
    }
}