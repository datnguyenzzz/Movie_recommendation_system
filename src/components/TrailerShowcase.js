import React, { useState,useEffect } from 'react';
import ReactPlayer from 'react-player';
import { Nav } from 'reactstrap';

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
                <div className="trick-player"></div>
                <div className="player-wrapper">
                    <ReactPlayer className = "react-player" 
                             playing = 'true'
                             url='https://www.youtube.com/watch?v=yQ2XKraC5co' 
                             width ='100%' height='100%'
                             config = {{
                                 youtube : {
                                     playerVars : { playlist:'yQ2XKraC5co',
                                                    color:"white",
                                                    modestbranding:0,
                                                    controls:0,
                                                    loop:1,
                                                    autohide:3
                                                     }
                                 }
                             }}/>
                </div>
            </>
    )
}

export default TrailerShowcase;