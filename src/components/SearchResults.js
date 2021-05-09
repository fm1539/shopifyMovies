import axios from "axios";
import { React, useEffect, useState } from "react"
import {InputGroup, FormControl, Button, Card} from 'react-bootstrap'

function SearchResults() {
    const [movieObj, setMovieObj] = useState({})
    const query = window.location.search
    var movie = query.slice(query.indexOf('=') + 1)
    var movieLst = movie.split("%20")
    var movieStr = ""
    for (let i = 0; i < movieLst.length; i++) {
        if (movieLst[i] != "") movieStr += (movieLst[i] + " ")  
    }
    const setMovieObjHandler = (obj) => setMovieObj(obj)

    const nominateButtonHandler = () => console.log("hi");

    useEffect(() => {
        axios.get('http://www.omdbapi.com/?t=' + movieStr + '&apikey=611a0f03').then(response => {
            setMovieObjHandler(response.data)
        })
    })

    return (
        <div>
            <h3>Results for "{movieStr}":</h3>
            <Card style={{boxShadow: '0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%)', width:'40%', height: '75%', marginLeft: 'auto', marginRight: 'auto'}}>
                <Card.Body>
                    <Card.Title>{movieObj.Title} ({movieObj.Year})</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Directed By: {movieObj.Director}</Card.Subtitle>
                    <Card.Text>
                    {movieObj.Plot}
                    </Card.Text>
                </Card.Body>
                <Card.Img src={movieObj.Poster} style={{width: '50%', marginLeft: 'auto', marginRight: 'auto'}}></Card.Img>
                <br></br>
                <div style={{'textAlign': 'center'}}>
                        <Button onClick={nominateButtonHandler}>Nominate</Button>
                </div>
            </Card>
        </div>
    )
}

export default SearchResults