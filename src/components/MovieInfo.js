import React ,{useState, useEffect} from 'react';
import { Container, Row, Col, Button } from 'reactstrap';

import youtube from '../api/youtube';

import { CONFIGURES } from '../config';
import axios from 'axios';

const CelebName = ({movieChosen}) => {
    console.log(movieChosen);

    const [movieMap, setMovieMap] = useState(new Map());

    movieChosen.map(movie => {
        const principal = movie["category"].charAt(0).toUpperCase() + movie["category"].slice(1)
        /*if (movieMap.has(principal) === true) {
            //console.log(movie["primaryName"]);
            movieMap.get(principal).push(movie["primaryName"]);
        } else {
            movieMap.set(principal, [movie["primaryName"]]); 
        }*/
        var celeb_name = movie["primaryName"]; 
        if (principal==="Actor" || principal==="Actress") {
            let charName = movie["characters"].split("\[\"").join("("); 
            charName = charName.split("\"\]").join(")"); 
            celeb_name = celeb_name + " "+ charName;
        } else {
            celeb_name = celeb_name + ", ";
        }

        if (movieMap[principal]) {
            movieMap[principal].push(celeb_name);
        } else {
            movieMap[principal] = [celeb_name];
        }
    })

    Object.keys(movieMap).map(principal => {
        var len = movieMap[principal].length;
        if (principal!=="Actor" && principal!=="Actress") {
            movieMap[principal][len-1] = movieMap[principal][len-1].slice(0,-2);
        }
    })


    return (
        <div> 
            {Object.keys(movieMap).map(principal => {
                return (
                    <>
                        <Row>
                            <p className="movie-overview-thicker">{principal+": "}</p>
                        </Row> 
                        <Row className="pl-4">
                            {(principal==="Actor" || principal==="Actress") ? (
                                <>
                                    {movieMap[principal].map(name => {
                                        return (
                                            <p className="small-font">{name}</p>
                                        );
                                    })}
                                </>
                            ) : (
                                <p className="small-font">{movieMap[principal]}</p>
                            )}
                            
                        </Row>
                    </>
                );
            })}
        </div>
    );
}

const MovieInfo = ({is_user_login,movieId, controller, controller_api}) => {
    var signal = controller.signal;
    var signal_api = controller_api.signal;
    console.log(movieId);

    var [movieChosen, setContent] = useState();
    var [movieCast, setMovieCast] = useState();
    var [youtubeVideo, setYoutubeVideo] = useState();
    var [moviePoster, setMoviePoster] = useState();
    var [movieOverview, setMovieOverview] = useState();

    useEffect(()=> {
        fetchData(movieChosen);
        fetchPosterData(movieChosen);
    }, [movieChosen])

    //HANDLES ADDING TO DB USERS

    const [movieInSaved, setMovieInSaved] = useState(); 
    const [movieInLiked, setMovieInLiked] = useState();
    const [movieInDisliked, setMovieInDisliked] = useState();
    const [currentUser, setCurrentUser] = useState();

    const handleAddingToList = (movie_id) => {
        setMovieInSaved(!movieInSaved);
        axios({
            method:'get',
            url:'/users/addToSavedList',
            params:{
                movie_id : movie_id,
                username : is_user_login
            }
        })
        .then(res => {
            console.log(res.data);
        })
    }

    const handleAddingToLiked = (movie_id) => {
        console.log(movie_id);
        setMovieInLiked(!movieInLiked);
    }

    const handleAddingtoDisliked = (movie_id) => {
        console.log(movie_id);
        setMovieInDisliked(!movieInDisliked);
    }

    if (is_user_login!=="" && currentUser!=is_user_login) {
        setCurrentUser(is_user_login);
        var movie_id = movieTopHead['tconst'];
        var user_id = is_user_login;

        axios({
            method:'get',
            url:'/users/getUserData',
            params:{
                movie_id : movie_id,
                username : user_id
            }
        })
        .then(res => {
            console.log(res.data);
            var movies_disliked = res.data["movies_disliked"];
            var movies_liked = res.data["movies_liked"];
            var movies_saved = res.data["movies_saved"];

            setMovieInSaved(movies_saved.includes(movie_id));
            setMovieInLiked(movies_liked.includes(movie_id));
            setMovieInDisliked(movies_disliked.includes(movie_id));
        })
    }

    const getYoutubeApi = async (requestedApi) => {
        const res = await youtube.get('/search', {
            params : {
                q : requestedApi
            }
        })
        console.log(res.data.items[0]);
        setYoutubeVideo(res.data.items[0]);
    }

    const fetchPosterData = async (movie) => {
        if (movie) {
            let movie_name = movie["originalTitle"];
            let movie_year = movie["startYear"];
            var requestUrl = "/homepage/search?api_key="+CONFIGURES.IMDB_API_KEY+"&query="+movie_name+/*"&year=" + movie_year+*/"&page=1";

            console.log(requestUrl);

            await fetch(requestUrl, {
                method : 'GET',
                signal : signal_api
            }).then(res=> {
                if (res.status >= 400) {
                    throw new Error("Bad response");
                }
                return res.json();
            }).then(data => {
                controller_api.abort(); 
                let posterDB = data.results[0];

                setMovieOverview(posterDB.overview);
                var fullPosterUrl = "http://image.tmdb.org/t/p/w500/"+posterDB.poster_path;
                setMoviePoster(fullPosterUrl);
            })
        }

    }

    const fetchData = (movie) => {
        if (movie) {
            controller.abort(); 
            let primaryTitle = movie["originalTitle"];
            let startYear = movie["startYear"];
            var requestForApi = primaryTitle + " trailer " + startYear; 
            console.log(requestForApi);
            getYoutubeApi(requestForApi);
        }
    }

    var request_movie_path = '/homepage/GetMovie?' + movieId; 
    fetch(request_movie_path, {
        method: 'GET',
        signal: signal
    }).then(res => {
        if (res.status >= 400) {
            throw new Error("Bad response");
        }
        return res.json();
    }).then(data => {
        //console.log(data)
        setContent(data.recordsets[0][0]);
        setMovieCast(data.recordsets[1]);
    }).catch(err => {
        console.log(err);
    })

    if (movieChosen && youtubeVideo && movieCast && movieOverview && moviePoster) {

        var youtubeId,videoLink;
        youtubeId = youtubeVideo.id.videoId;
        videoLink = "https://www.youtube.com/embed/"+youtubeId+"?cc_load_policy=3&autoplay=1&mute=0&controls=0&origin=http%3A%2F%2Flocalhost%3A3000&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=0&playlist="+youtubeId+"&color=white&loop=1&enablejsapi=1&widgetid=1";

        return (
            <>
                <div className = "player-wrapper-info-tab">
                    <iframe src= {videoLink}
                            frameBorder="0"
                            className="react-player-info-tab"
                            allowFullScreen>
                    </iframe>
                </div>
                <div>
                    <Container className="movie-info-container">
                        <Row className="pt-3">
                            <Col xs = "3">
                                <img src={moviePoster} width="220px" height="300px"/> 
                            </Col>
                            <Col>
                                <Row>
                                    <Col xs = "7">
                                        <Row>
                                            <p className = "movie-info-name"> 
                                                <b>{movieChosen["originalTitle"]}</b> 
                                            </p>
                                        </Row>

                                        <Row>
                                            <Col xs = "10">
                                                <p className = "movie-overview">{movieOverview}</p>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col xs = "6">
                                                {(is_user_login !== "") ? (
                                                    <>
                                                    <Button className="circle-button mx-2" onClick={()=>handleAddingToList(movieTopHead['tconst'])}> 
                                                        {(movieInSaved === false) ? (
                                                            <i className="fa fa-plus fa-lg"></i> 
                                                        ) : (
                                                            <i className="fa fa-check"></i>  
                                                        )}
                                                        
                                                    </Button>
                                                    <Button className="circle-button mr-2" onClick={()=>handleAddingToLiked(movieId)}> 
                                                        <i className="fa fa-thumbs-up fa-lg"></i> 
                                                    </Button>
                                                    <Button className="circle-button mr-2" onClick={()=>handleAddingtoDisliked(movieId)}> 
                                                        <i className="fa fa-thumbs-down fa-lg"></i> 
                                                    </Button>
                                                    </>
                                                ) : (
                                                    <></>
                                                )}
                                                
                                            </Col>
                                            <Col xs="1">
                                                <i className="fa fa-star star-icon-sm mt-2"></i>
                                            </Col>

                                            <Col xs="5">
                                                <Row className="h-25 pl-4">
                                                    <p style={{color:'white'}}><b className="bigger-num-sm">{movieChosen["averageRating"]}</b>/10</p>
                                                </Row>
                                                <Row className="mt-2 pl-4">
                                                    <p style={{color:'white'}}>{movieChosen["numVotes"]} rated</p>
                                                </Row>
                                            </Col>
                                        </Row>
                                        
                                    </Col>
                                    <Col xs = "5">
                                        <CelebName movieChosen={movieCast}/>
                                        <Row>
                                            <p className = "movie-overview-thicker">Genres: </p>
                                        </Row>
                                        <Row  className="pl-4 ">
                                            <p className="small-font">{movieChosen["genres"].split(",").join(", ")}</p>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </>        
        );
    } else {
        return (
            <div>
                <img className="loading-scene"  
                     src='images/loading_scene.gif' 
                     width="60%" height="60%"/>
            </div>
        );
    }

}

export default MovieInfo