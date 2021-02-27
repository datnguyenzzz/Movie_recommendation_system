import React, { useState,useEffect,useRef } from 'react';

import AbortController from 'abort-controller';

import youtube from '../api/youtube';

const ALL_SUGGESTION_MOVIES = 10;
const controller = new AbortController();
const signal = controller.signal;

const randomInt = (lim) => {
    return Math.floor(Math.random() * Math.floor(lim));
}

const ShowTrailer = ({movieId}) => {
    console.log(movieId);
    var youtubeId,videoLink;
    if (movieId) {
        youtubeId = movieId;
        videoLink = "https://www.youtube.com/embed/"+youtubeId+"?autoplay=1&mute=0&controls=0&origin=http%3A%2F%2Flocalhost%3A3000&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=0&playlist="+youtubeId+"&color=white&loop=1&enablejsapi=1&widgetid=1";
    }
    return (
        <div>
            {(movieId) ? (
                <div className = "player-wrapper">
                    <iframe src= {videoLink}
                        frameBorder="0"
                        className="react-player"
                        allowFullScreen>
                    </iframe>
                </div>
            ) : (
                <></>
            )}
        </div>
    )
}

const TrailerShowcase = () => {
    
    const [contentDB,setContent] = useState();
    const [apiResponse, setApiRes] = useState();

    const getApi = async (requestApi) => {
        const res = await youtube.get('/search', {
            params : {
                q : requestApi
            }
        })
        //console.log(res.data.items[0].id.videoId)
        setApiRes(res.data.items[0].id.videoId);
    }

    const fetchData = (movies) => {
        if (movies) {
            console.log("invoked")

            var randomId = randomInt(ALL_SUGGESTION_MOVIES);
            var movie = movies[randomId];

            const primaryTitle = movie["primaryTitle"];
            const startYear = movie["startYear"];
            var requestForApi = primaryTitle + " trailer " + startYear; 
            getApi(requestForApi);

            console.log(requestForApi)
            controller.abort();
        }
    }

    useEffect(() => {
        fetchData(contentDB);
    },[contentDB])

    fetch('/homepage/TrailerShowcase', {
        method: 'GET',
        signal: signal
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

    return (
            <>
                <div className="trick-player"></div>
                <p style={{color:"white"}}>{apiResponse}</p>
                <ShowTrailer movieId={apiResponse}/>
            </>
    )
}

export default TrailerShowcase;