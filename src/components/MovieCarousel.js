import React, {useState, useEffect} from 'react'; 
import AbortController from 'abort-controller';

import { CONFIGURES } from '../config';
import CustomCarousel from '../CustomCarousel';
import axios from 'axios';

const REQUESTS = ["2020","2019","highest_rating","highest_react","Saved list"];
const MOVIES_SAVED = 4;
const SIZE_REQUESTS = 5;


const MovieCarousel = (props) => {
    var controller = new AbortController();
    var poster_controller = new AbortController();

    if (props.value === false) {
        if (props.request_type !== MOVIES_SAVED) {
            return <MovieChoice controller = {controller} poster_controller = {poster_controller} 
                                request_type={props.request_type}
                                value = {props.value} onChange={props.onChange}/>
        } else {
            return <SavedList   controller = {controller} poster_controller = {poster_controller} 
                                request_type={props.request_type}
                                value = {props.value} onChange={props.onChange}
                                user = {props.user}/>

        }
    } else {
        return <></>;
    }
};

const SavedList = (props) => {
    var controller = props.controller;
    var poster_controller = props.poster_controller;

    var poster_signal = poster_controller.signal;
    var signal = controller.signal;

    const [movieList, setMovieList] = useState([]);
    const [receivedMovieList, setReceivedMovie] = useState(false);
    const [allReceived, setAllReceived] = useState(false);
    const [saved_movies, setMovieSaved] = useState("");

    var username = props.user; 

    if (saved_movies === "") {
        axios({
            method:'get',
            url:'/users/getUserData',
            params:{
                username : username
            }
        })
        .then(res => {
            console.log(res.data);
            var movies_saved = res.data["movies_saved"];
            setMovieSaved(movies_saved);

        })
    }

    if (saved_movies !== "" && movieList.length === 0) {
            var saved_list_size = saved_movies.split(",").length-1;
            console.log(saved_list_size);
            var curr = 0;
            if (saved_list_size > 0) {
                saved_movies.split(",").forEach(movie_id => {
                    if (movie_id!=="") {
                        axios({
                            method : 'get',
                            url:'/homepage/GetMovieById', 
                            params:{
                                movie_id: movie_id
                            }
                        })
                        .then(res => {
                            movieList[curr] = res.data; 
                            curr+=1;
                            if (curr === saved_list_size) {
                                setReceivedMovie(true);
                            }
                        })
                    }
                })
            }

    }

    if (allReceived===false && receivedMovieList===true) {
        var curr=0;
        movieList.forEach(movie => {
            let movie_name = movie["primaryTitle"];
            var requestUrl = "/homepage/search?api_key="+CONFIGURES.IMDB_API_KEY+"&query="+movie_name+"&page=1";     
            axios({
                method: 'get',
                url: "/homepage/searchNew",
                params : {
                    api_key : CONFIGURES.IMDB_API_KEY,
                    query : movie_name, 
                    page : 1
                }
            })
            .then(data => {
                var fullPosterUrl;

                let posterDB = data.results[0];
                    
                if (posterDB) {
                    fullPosterUrl = "http://image.tmdb.org/t/p/w500/"+posterDB.poster_path;
                } else {
                    fullPosterUrl = "https://www.wpbeginner.com/wp-content/uploads/2013/04/wp404error.jpg";
                }

                movieList[curr]["posterLink"] = fullPosterUrl;
                curr += 1;
                })
                if (curr === saved_list_size) {
                     setAllReceived(true);
                }
        })

        console.log(movieList);
    }

    /*
    axios({
        method:'get',
        url:'/users/getUserData',
        params:{
            username : username
        }
    })
    .then(res => {
        console.log(res.data);
        var movies_saved = res.data["movies_saved"];
        var _movie_list = [];
        var saved_list_size = movies_saved.split(",").length-1;
        var curr = 0;
        console.log(movies_saved);
        
        movies_saved.split(",").forEach(movie_id => {
            if (movie_id !== "") {
                axios({
                    method : 'get',
                    url:'/homepage/GetMovieById', 
                    params:{
                        movie_id: movie_id
                    }
                })
                .then(res => {
                    var movie = res; 
                    //_movie_list.push(res);

                    let movie_name = movie["primaryTitle"];
                    var requestUrl = "/homepage/search?api_key="+CONFIGURES.IMDB_API_KEY+"&query="+movie_name+"&page=1";
                    
                    axios({
                        method: 'get',
                        url: requestUrl
                    })
                    .then(data => {
                        let posterDB = data.results[0];
                        var fullPosterUrl;
                        if (posterDB) {
                            fullPosterUrl = "http://image.tmdb.org/t/p/w500/"+posterDB.poster_path;
                        } else {
                            fullPosterUrl = "https://www.wpbeginner.com/wp-content/uploads/2013/04/wp404error.jpg";
                        }
                        movie["posterLink"] = fullPosterUrl;
                        curr += 1;
                    })
                    if (curr === saved_list_size) {
                        setAllReceived(true);
                    }
                    _movie_list.push(movie);
                    
                })
            }
        })

        setMovieList(_movie_list); 
    })*/

    if (movieList.length > 0) {
        console.log(movieList);
        return <></>;
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
    //console.log(request_path);

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
        //console.log(moviesList);

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