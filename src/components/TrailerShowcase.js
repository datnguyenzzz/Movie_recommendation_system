import React, { useState,useEffect } from 'react';
import { Container,Row,Col,Button,Modal, ModalBody } from 'reactstrap';
import { Switch ,Route, useHistory } from 'react-router-dom';

import AbortController from 'abort-controller';

import youtube from '../api/youtube';
import { CONFIGURES } from '../config';
import useReactPath from '../api/ReactPath';
import MovieInfo from '../components/MovieInfo'
import axios from 'axios';

const ALL_SUGGESTION_MOVIES = 8;

const controller = new AbortController();
const signal = controller.signal;

const imdbController = new AbortController();
const imdbSignal = imdbController.signal;

const randomInt = (lim) => {
    return Math.floor(Math.random() * Math.floor(lim));
}

const ShowTrailer = ({movieId, info}) => {
    console.log(movieId);
    var youtubeId,videoLink,thumbnail;
    if (movieId) {
        console.log(info)
        youtubeId = movieId.id.videoId;
        thumbnail = movieId.snippet.thumbnails.high.url;
        //youtubeId = movieId;
        videoLink = "https://www.youtube.com/embed/"+youtubeId+"?cc_load_policy=3&autoplay=1&mute=0&controls=0&origin=http%3A%2F%2Flocalhost%3A3000&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=0&playlist="+youtubeId+"&color=white&loop=1&enablejsapi=1&widgetid=1";
    }
    return (
        <div>
            {(movieId) ? (
                (info === false) ? (
                    <div className = "player-wrapper">
                        <iframe src= {videoLink}
                            frameBorder="0"
                            className="react-player"
                            allowFullScreen>
                        </iframe>
                    </div>
                ) : (
                    <div className = "player-wrapper">
                        <img className = "react-player" src = {thumbnail}/>
                    </div>
                )
            ) : (
                <></>
            )}
        </div>
    )
}

const TrailerShowcase = (props) => {
    var [contentDB, setContent] = useState();
    var [apiResponse, setApiRes] = useState();

    var [movieOverview,setOverview] = useState();
    var [posterUrl,setPosterUrl] = useState();
    var [movieTopHead,setMovieTopHead] = useState();
    //var [movieChosenToReview, setMovieChosenToReview] = useState();

    /*
    var switchMoreInfo = () => {
        props.onChange(!props.value);
    }*/

    var openInfoModal = (newMovieId, newMoreInfo, newModalOpen,
                         newController, newControllerApi) => {
        props.onChange(newMovieId, newMoreInfo, newModalOpen,newController, newControllerApi);
    }

    //const window_path = useReactPath();
    //useEffect(() => {
    //    console.log(window_path);
    //    if (window_path == "/") setMoreInfo(false);
    //},[window_path])
 
    //1d0Zf9sXlHk

    //ADDING TO LIST HANDLES 

    const handleAddingToList = (movie_id) => {
        console.log(movie_id);
        axios({
            method:'get',
            url:'/users/addToSavedList',
            params:{
                movie_id : movie_id,
                username : props.is_user_login
            }
        })
        .then(res => {
            console.log(res.data);
        })
    }

    const handleAddingToLiked = (movie_id) => {
        console.log(movie_id);
    }

    const handleAddingtoDisliked = (movie_id) => {
        console.log(movie_id);
    }
    
    const getApi = async (requestApi) => {
        const res = await youtube.get('/search', {
            params : {
                q : requestApi
            }
        })
        //console.log(res.data.items[0].id.videoId)
        setApiRes(res.data.items[0]);
    }
    const fetchData = (movies) => {
        if (movies) {
            controller.abort();
            var randomId = randomInt(ALL_SUGGESTION_MOVIES);
            console.log(randomId);
            var movie = movies[randomId];
            console.log(movies);
            setMovieTopHead(movie);
            let primaryTitle = movie["primaryTitle"];
            let startYear = movie["startYear"];
            var requestForApi = primaryTitle + " trailer " + startYear; 
            getApi(requestForApi);
            console.log(requestForApi)
        }
    }

    const fetchPosterData = async () => {
        if (movieTopHead) {
            //console.log("mewmew");
            console.log(movieTopHead);
            
            let movie_name = movieTopHead["primaryTitle"];
            let movie_year = movieTopHead["startYear"];
            var requestUrl = "/homepage/search?api_key="+CONFIGURES.IMDB_API_KEY+"&query="+movie_name+/*"&year=" + movie_year+*/"&page=1";

            await fetch(requestUrl, {
                method: 'GET',
                signal: imdbSignal
            }).then(res => {
                if (res.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return res.json();
            }).then(data => {
                imdbController.abort();
                let posterDB = data.results[0];
                /*if (posterDB.overview.length > 200) {
                    posterDB.overview = posterDB.overview.substring(0,200);
                    posterDB.overview += " ...";
                }*/
                setOverview(posterDB.overview);
                var fullPosterUrl = "http://image.tmdb.org/t/p/w500/"+posterDB.poster_path;
                setPosterUrl(fullPosterUrl);
                //props.setStopRender(true);
            }).catch(err => {
                console.log(err);
            })
            
        }
    }

    useEffect(() => {
        fetchData(contentDB);
    },[contentDB])

    useEffect(() => {
        fetchPosterData();
    },[apiResponse])

    useEffect( async () => {
        await fetch('/homepage/TrailerShowcase', {
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
    })

    //SWITCH ROUTE
    const history = useHistory();

    const routeTo = (src) => {
        console.log(src);
        //setMoreInfo(true);
        history.push(src);
    }

    /*
    //MODAL TOGGLE 
    const [modal_open, set_modal_open] = useState(false);
    //Modal controller
    const [modal_controller,set_modal_controller] = useState();
    const [modal_controller_api, set_modal_controller_api] = useState();
    */
    if (movieTopHead) {
        return (
            <>  
                {/*SWITCH ROUTE */}
                {/** 
                <Modal className="movie-info" isOpen={modal_open} toggle={() => {
                    set_modal_open(!modal_open);
                    switchMoreInfo();
                    modal_controller.abort();
                    modal_controller_api.abort();
                }}>
                    <ModalBody className="px-0 py-0">
                         
                        <MovieInfo movieId = {movieChosenToReview} 
                                   controller = {modal_controller}
                                   controller_api = {modal_controller_api}/>
                    </ModalBody>
                </Modal>*/}
            
                <div className="trick-player">
                    {(props.value === false) ? (
                        <Container className="review-trailer mx-2">
                            {/*<Row>
                                <MoviePoster movieName={movie_name} movieYear={movie_year}/>
                            </Row>*/}
                            <Row style={{width:'1500px'}}>
                                <Col xs="2">
                                    <img src={posterUrl}
                                        width="107%" height="81%"/>
                                </Col>
                                <Col xs="10">
                                <Row style={{width:'1645px'}}>
                                    <Col xs={{size : 6, offset : 0}}>
                                            <p className = "movie-name"> <b>{movieTopHead["primaryTitle"]}</b> </p>
                                    </Col>
                                    <Col xs='5'></Col>
                                    { movieTopHead["isAdult"]=="1" &&
                                        <Col xs={{size : 1, offset : 0}} className = "h-25 adult-warning">
                                            <p className="mt-2"> 18+ </p>
                                        </Col>
                                    }
                                </Row>
                                <Row>
                                    <Col xs={{size : 'auto', offset : 0}}>
                                        <p className = "movie-description"> {movieTopHead["runtimeMinutes"]}min | {movieTopHead["genres"]} | {movieTopHead["titleType"]} ({movieTopHead["startYear"]}-.)</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={{size : 6, offset : 0}}>
                                        <p className = "movie-overview">
                                            { movieOverview && movieOverview.length > 150 ? (
                                                movieOverview.substring(0,150) + " ..."
                                            ) : (
                                                movieOverview
                                            )}
                                        </p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="4" className="py-3">
                                        <Button className="info-button" onClick = {() => {
                                            /*
                                            set_modal_open(!modal_open);
                                            switchMoreInfo();
                                            setMovieChosenToReview(movieTopHead['tconst']);
                                            set_modal_controller(new AbortController());
                                            set_modal_controller_api(new AbortController());
                                            */
                                            openInfoModal(movieTopHead['tconst'], 
                                                          !props.value, 
                                                          true,
                                                          new AbortController(),
                                                          new AbortController())

                                        }}> 
                                            <i className="fa fa-info-circle fa-lg info-content"> More info</i> 
                                        </Button>
                                        {(props.is_user_login!=="") ? (
                                            <>
                                                <Button className="circle-button mx-2" onClick={()=>handleAddingToList(movieTopHead['tconst'])}> 
                                                    <i className="fa fa-plus fa-lg"></i> 
                                                </Button>
                                                <Button className="circle-button mr-2" onClick={()=>handleAddingToLiked(movieTopHead['tconst'])}> 
                                                    <i className="fa fa-thumbs-up fa-lg"></i> 
                                                </Button>
                                                <Button className="circle-button mr-2" onClick={()=>handleAddingtoDisliked(movieTopHead['tconst'])}> 
                                                    <i className="fa fa-thumbs-down fa-lg"></i> 
                                                </Button>
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                        
                                    </Col>

                                    <Col xs={{size : '1'}}>
                                        <i className="fa fa-star star-icon pt-2 pl-4"></i>
                                    </Col>
                                    <Col xs={{size : '2'}}>
                                        <Row className="h-25">
                                            <p style={{color:'white'}}><b className="bigger-num">{movieTopHead["averageRating"]}</b>/10</p>
                                        </Row>
                                        <Row className="mt-3">
                                            <p style={{color:'white'}}>{movieTopHead["numVotes"]} rated</p>
                                        </Row>
                                    </Col>
                            
                                </Row>
                                </Col>
                            </Row>
                        
                        </Container>
                    ) : (
                        <></>
                    )}
                    
                </div>
                <ShowTrailer movieId={apiResponse} info={props.value}/>
            </>
        )
    } else {
        return (
            <></>
        )
    }
}

export default TrailerShowcase;