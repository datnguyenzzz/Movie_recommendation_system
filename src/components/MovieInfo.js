import React ,{useState, useEffect} from 'react';
import { Container, Row, Col } from 'reactstrap';


/*
const MovieInfo = ({movieYTDB,movieChosen, moviePoster, movieOverview}) => {

    var youtubeId,videoLink;
    youtubeId = movieYTDB.id.videoId;
    videoLink = "https://www.youtube.com/embed/"+youtubeId+"?autoplay=1&mute=0&controls=0&origin=http%3A%2F%2Flocalhost%3A3000&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=0&playlist="+youtubeId+"&color=white&loop=1&enablejsapi=1&widgetid=1";
    
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
    )
}
*/

const MovieInfo = ({movieId, controller}) => {
    var signal = controller.signal;
    console.log(movieId);
    var [movieChosen, setContent] = useState();

    useEffect(()=> {
        fetchData(movieChosen);
    }, [movieChosen])

    const fetchData = (movie) => {
        if (movie) {
            controller.abort(); 
            console.log(movie);
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
        setContent(data.recordsets[0]);
    }).catch(err => {
        console.log(err);
    })

    if (movieChosen) {
        return (
            <>
                <p>{movieChosen[0]["originalTitle"]}</p>
            </>
        );
    } else {
        return <></>;
    }

}

export default MovieInfo