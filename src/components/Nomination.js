import React from 'react'
import {ListGroup, Button, Container, Row, Col} from 'react-bootstrap'

function Nomination(props) {
    return (
        <Container>    
            <Row>
                <Col>
                    <p style={{display: 'flex', marginBottom: '0', width: '50%'}}>{props.title}</p>
                </Col>
                <Col style={{marginLeft: 'auto', float: 'right', width: '50%'}}>
                    <Button id={props.id} onClick={props.remove}> 
                        Remove Nomination  
                    </Button> 
                </Col>
            </Row>
        </Container>
    )
}

export default Nomination