import React, {Component} from 'react';
import {Col, Row, Container, ButtonToggle} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import styled from "styled-components";
import ErrorMessage from '../errorMessage';
import './app.css'

class App extends Component {
    state = {
        error: false,
        showRandomChar: true,
        selectedChar: 38,
    }

    toggleRandomChar = () => {
        this.setState(state => {
            return {
                showRandomChar: !state.showRandomChar,
            }
        });
    }

    toggleSelectedChar = (id) => {
        this.setState({
            selectedChar: id
        });
    }

    render() {
        const {error, showRandomChar} = this.state;

        const errorMessage = error ? <ErrorMessage /> : null
        const randomBlock = showRandomChar ? <RandomChar /> : null;

        return (
            <> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {randomBlock}
                            {errorMessage}
                            <button type="button" className="toggle-btn" onClick={this.toggleRandomChar}>Toggle random Character</button>
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList toggleSelectedChar={this.toggleSelectedChar} />
                        </Col>
                        <Col md='6'>
                            <CharDetails charId={this.state.selectedChar} />
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
};

export default App;