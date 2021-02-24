import React, { useState,useEffect } from 'react';
import { Jumbotron } from 'reactstrap';

const ALL_SUGGESTION_MOVIES = 20;

const randomInt = (lim) => {
    return Math.floor(Math.random() * Math.floor(lim));
}

const ShowTrailer = ({ movies }) => {
    //console.log(movies.map(ele => console.log(ele)));
    var randomId = randomInt(ALL_SUGGESTION_MOVIES);
    var movie = movies[randomId];

    return (
        <div>
            {(movie) ? (
                <p>{movie["primaryTitle"]}</p>
            ) : (
                <></>
            )}
        </div>
    )
}

const TrailerShowcase = () => {
    
    //const contentDB = useRef("");
    const [contentDB,setContent] = useState([]);
    const [rendered,setRendered] = useState(false);

    useEffect(() => {
        fetch('/homepage/TrailerShowcase', {
            method: 'GET'
        }).then(res => {
            if (res.status >= 400) {
                throw new Error("Bad response from server");
            }
            return res.json();
        }).then(data => {
            setContent(data.recordsets[0]);
        }).catch(err => {
            console.log(err);
        })
    },[rendered])
    
    return (
        <>
            <Jumbotron>
                <ShowTrailer movies = {contentDB} />
            </Jumbotron>
        </>
    )
}

export default TrailerShowcase;