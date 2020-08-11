import React, {Component} from 'react';
import {Col, Row, Container, ButtonToggle} from 'reactstrap';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
  } from "react-router-dom";
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import './app.css'
import CharactersPage from '../pages/charactersPage/'
import BooksPage from '../pages/booksPage';
import HousesPage from '../pages/housesPage';
import {BooksItem} from '../pages/booksPage';


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

    render() {
        const {error, showRandomChar} = this.state;

        const errorMessage = error ? <ErrorMessage /> : null
        const randomBlock = showRandomChar ? <RandomChar /> : null;

        return (
            <Router>
                <div className='app'>
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
                        <Switch>
                            <Route path='/characters' component={CharactersPage}></Route>
                            <Route path='/houses' component={HousesPage}></Route>
                            <Route path='/books' exact component={BooksPage}></Route>
                            <Route path='/books/:id' render={
                                ({match}) => {
                                    const {id} = match.params;
                                    return <BooksItem bookId={id}></BooksItem>
                                }
                            }></Route>
                        </Switch>
                    </Container>
                </div>
            </Router>
        );
    }
};

export default App;