import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {InputGroup, FormControl, Button, Card, ListGroup, Container, Row, Col, Alert} from 'react-bootstrap'
import Nomination from './Nomination'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function HomePage() {
    var [movie, setMovie] = useState("")
    const searchChangeHandler = (event) => setMovie(event.target.value);
    const [show, setShow] = useState(false)
    const [nominations, setNominations] = useState([])
    const [movieObj, setMovieObj] = useState({
        Title: "",
        Year: "",
        Director: "",
        Plot: "",
        Poster: "",
        ID: ""
    })

    const setMovieObjHandler = (obj) => setMovieObj(obj)
    const setNominationsHandler = (obj) => {
        let arr = [...nominations]
        arr.push([obj.Title, obj.Year, obj.Director, obj.Plot, obj.Poster, obj.ID])
        setNominations(arr)
        if (arr.length == 5) setShow(true)
    }

    let display = "show"
    if (nominations.length == 5) {
        display = "hide"
    }
    for (let i = 0; i < nominations.length; i++) {
        if (nominations[i][0] == movieObj.Title) {
            display = "hide"
            break
        }
    }
    
    var removeNominationHandler = (event) => {
        let arr = [...nominations]
        if (arr.length == 5) setShow(false)
        for (let i = 0; i < arr.length; i++) { 
            if (arr[i][5] == event.target.id) {
                if (i === 0) {
                    arr.shift()
                    setNominations(arr)
                    break
                }
                else if (i === arr.length - 1) {
                    arr.pop()
                    setNominations(arr)
                    break
                }  
                else {
                    arr.splice(i, 1)
                    setNominations(arr)
                    break
                }
            }
        }
    }

    const nominateButtonHandler = () => setNominationsHandler(movieObj)
    
    useEffect(() => {
        axios.get('https://www.omdbapi.com/?t=' + movie + '&apikey=611a0f03')
        .then(response => {
            console.log(response);
            let obj = response.data.Response == "True" ? {
                Title: response.data.Title,
                Year: response.data.Year,
                Director: response.data.Director,
                Plot: response.data.Plot,
                Poster: response.data.Poster,
                Response: response.data.Response,
                ID: response.data.imdbID
            } : response.data
            setMovieObjHandler(obj)
        })
    }, [movie])

    return (
        <div>
            <Alert show={show} variant="success">
                <Alert.Heading>5 Nominations Made</Alert.Heading>
                <p>
                You have nominated 5 movies! Remove a nomination you have right now if you want
                to nominate another movie
                </p>
                <hr />
                <div className="d-flex justify-content-end">
                <Button onClick={() => setShow(false)} variant="outline-success">
                    Close
                </Button>
                </div>
            </Alert>
            <h1 style={{backgroundColor: 'transparent', textAlign: 'center'}}>The Shoppies</h1>
            <Card style={{boxShadow: '0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%)', width:'50%', height: '75%', marginLeft: 'auto', marginRight: 'auto'}}>
                <Card.Body>
                    <Card.Title style={{'textAlign': 'center'}}>Search for a Movie</Card.Title>
                    <div style={{'display': 'flex'}}>
                        <InputGroup className="mb-3" style={{'width': '100%'}}>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Movie</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                            onChange={searchChangeHandler}
                            aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                    </div>
                    <br/>
                    {/* <div style={{'textAlign': 'center'}}>
                        <Button onClick={searchButtonHandler}>Search</Button>
                    </div> */}
                </Card.Body>
            </Card> 
            <br></br>
            <Container>
            <Row>
            {movieObj.Response == "True" ?
            <Col> 
            <h3>Results for "{movie}":</h3>
            <Card style={{boxShadow: '0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%)', width:'100%', marginLeft: 'auto', marginRight: 'auto'}}>
                <Card.Body>
                    <Card.Title>{movieObj.Title} ({movieObj.Year})</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Directed By: {movieObj.Director}</Card.Subtitle>
                    <Card.Text>
                    {movieObj.Plot}
                    </Card.Text>
                </Card.Body>
                <Card.Img src={movieObj.Poster} style={{width: '40%', marginLeft: 'auto', marginRight: 'auto'}}></Card.Img>

                <div style={{'textAlign': 'center'}}>
                        <Button onClick={nominateButtonHandler} className={display}>Nominate</Button>
                </div>
                <br></br>
            </Card>
            </Col>
            : movie == "" ? <h2>Please enter a title </h2> : <h2>No results found</h2>
            }
            <br></br>
            <hr></hr>
            <Col>
            <h3>Your current nominations:</h3>
            {nominations.length ?
            <div> 
            <Card style={{boxShadow: '0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%)', 
            width:'100%', height: '75%', marginLeft: 'auto', marginRight: 'auto', marginBottom: '5%'}}>
                <ListGroup className="list-group-flush">
                    {nominations.map((nomination) => {
                        return (
                            <Container>    
                                <Row>
                                    <Col>
                                        <p style={{display: 'flex', marginBottom: '0', width: '50%'}}>{nomination[0]}</p>
                                    </Col>
                                    <Col style={{marginLeft: 'auto', float: 'right', width: '50%'}}>
                                        <Button id={nomination[5]} onClick={removeNominationHandler}> 
                                            Remove Nomination  
                                        </Button> 
                                    </Col>
                                </Row>
                            </Container>                        
                            )
                    })}
                </ListGroup>
            </Card>     
            </div>
            : <h4>No nominations yet</h4>
            }
            </Col>
            
            </Row>
            </Container>
        </div>
    )
}
export default HomePage
