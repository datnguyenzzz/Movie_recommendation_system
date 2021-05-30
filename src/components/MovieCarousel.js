import React, {useState, useEffect} from 'react'; 
import AbortController from 'abort-controller';

import { CONFIGURES } from '../config';
import CustomCarousel from '../CustomCarousel';

const REQUESTS = ["2020","2019","highest_rating","highest_react"];
const SIZE_REQUESTS = 4;


const MovieCarousel = (props) => {
    var controller = new AbortController();
    var poster_controller = new AbortController();

    if (props.value === false) {
        return <MovieChoice controller = {controller} poster_controller = {poster_controller} 
                            request_type={props.request_type}
                            value = {props.value} onChange={props.onChange}/>
    } else {
        return <></>;
    }
}

const MovieChoice = (props) => {

    var controller = props.controller;
    var poster_controller = props.poster_controller;

    var poster_signal = poster_controller.signal;
    var signal = controller.signal;

    var [moviesList,setMoviesList] = useState(); 
    var [all_received, setAllReceived] = useState(false);

    var request_type = props.request_type;

    var requestNeed = REQUESTS[request_type];
    var request_path = '/homepage/getMovieList?'+requestNeed; 
    console.log(request_path);

    const fetchPosterData = async (movieSet) => {
        if (movieSet) {
            
            //console.log(movieSet);
            var currentId = 0;

            movieSet.map(async (movie) => {
                let movie_name = movie["primaryTitle"];
                var requestUrl = "/homepage/search?api_key="+CONFIGURES.IMDB_API_KEY+"&query="+movie_name+/*"&year=" + movie_year+*/"&page=1";

                poster_controller = new AbortController();

                await fetch(requestUrl, {
                    method : 'GET',
                    signal : poster_signal
                }).then(res=> {
                    if (res.status >= 400) {
                        throw new Error("Bad response");
                    }
                    return res.json();
                }).then(async data => {
                    poster_controller.abort(); 
                    let posterDB = data.results[0];
                    var fullPosterUrl;
                    if (posterDB) {
                        fullPosterUrl = "http://image.tmdb.org/t/p/w500/"+posterDB.poster_path;
                    } else {
                        fullPosterUrl = "https://www.wpbeginner.com/wp-content/uploads/2013/04/wp404error.jpg";
                    }
                    //moviePosters.push(fullPosterUrl);
                    movie["posterLink"] = fullPosterUrl;
                    currentId += 1; 
                    if (currentId === movieSet.length) {
                        setAllReceived(true);
                    }
                    //await setMoviePosters(curr => [...curr, fullPosterUrl])
                })
            })
        }
    }

    useEffect( async () => {
        await fetch(request_path, {
            method: 'GET',
            signal: signal 
        }).then(res => {
            if (res.status >= 400) {
                throw new Error("Bad response");
            }
            return res.json();
        }).then(async data => {
            controller.abort();
            await setMoviesList(data.recordsets[0]);
            await fetchPosterData(data.recordsets[0]);
        }).catch(err => {
            console.log(err)
        })
    })


    if (moviesList && all_received === true) {
        console.log(moviesList);

        return (
            <>
            <style>
                {`.idiot-tag {
                    margin-top : -45px;
                }`}
            </style>
            <div className = "idiot-tag">
                {(requestNeed === "2020" || requestNeed === "2019") ? (
                    <p className = "py-4 pl-5 movie-carousel-font">Top movies in {requestNeed}</p>
                ) : (
                    (requestNeed === "highest_rating") ? (
                        <p className = "py-4 pl-5 movie-carousel-font">Top highest rating movies</p>
                    ) : (
                        <p className = "py-4 pl-5 movie-carousel-font">Most popular movies</p>
                    )
                )}
                <CustomCarousel moviesList={moviesList}
                                value = {props.value} onChange = {props.onChange}/> 
            </div>
            </>
        );
    } else {
        return <></>;
    }

}

export default MovieCarousel;