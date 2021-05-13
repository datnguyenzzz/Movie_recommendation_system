import React ,{useState, useEffect} from 'react';
import { Container, Row, Col } from 'reactstrap';

import youtube from '../api/youtube';

import { CONFIGURES } from '../config';

const MovieInfo = ({movieId, controller, controller_api}) => {
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
        setMovieCast(data.recordsets[1][0]);
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
                                <img src={moviePoster} width="100%" height="80%"/> 
                            </Col>
                            <Col>
                                <Row>
                                    <Col xs = "9">
                                        <Row>
                                            <p className = "movie-info-name"> 
                                                <b>{movieChosen["primaryTitle"]}</b> 
                                            </p>
                                        </Row>

                                        <Row>
                                            <Col xs = "10">
                                                <p className = "movie-overview">{movieOverview}</p>
                                            </Col>
                                        </Row>
                                        
                                    </Col>
                                    <Col xs = "3">
                                        <Row>
                                            <p className = "movie-overview">Director/Writer: </p>
                                        </Row>
                                        <Row>
                                            <p className = "movie-overview">Cast: </p>
                                        </Row>
                                        <Row>
                                            <p className = "movie-overview">Genres: </p>
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