import React from 'react';
import {Col, Row, Container} from 'reactstrap';
import './rowBlock.css';

const RowBlock = ({left, right}) => {
    return(
        <>
        <Row className="page">
            <Col md='6'>
                {left}
            </Col>
            <Col md='6'>
                {right}
            </Col>
        </Row>
        </>
    )
}

export default RowBlock;