import React, {useState, useEffect} from 'react'; 
import { Card, CardImg, CardLink, Row, Col,
         Carousel, CarouselControl, CarouselIndicators, CarouselItem, CardBody } from 'reactstrap';
import AbortController from 'abort-controller';

import { CONFIGURES } from '../config';

const numMovieEachPage = 7;
const controller = new AbortController();
const signal = controller.signal;

var poster_controller = new AbortController();
const poster_signal = poster_controller.signal;

const MovieCarousel = () => {

    var [moviesList,setMoviesList] = useState(); 
    var [all_received, setAllReceived] = useState(false);

    var request_path = '/homepage/getMovieList?2020'; 

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

    //Carousel control 
    const [activeId, setActiveId] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextId = activeId===moviesList.length/numMovieEachPage - 1 ? 0 : activeId+1;
        setActiveId(nextId);
    }

    const previous = () => {
        if (animating) return;
        const nextId = activeId===0 ? moviesList.length/numMovieEachPage - 1 : activeId-1;
        setActiveId(nextId);
    }

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveId(newIndex);
    }


    if (moviesList && all_received === true) {
        console.log(moviesList);
        const movieSlides = moviesList.reduce((acc, cur, id, arr) => {
            if (id%numMovieEachPage === 0) 
                acc.push(arr.slice(id, id+numMovieEachPage));
            return acc;
        },[]).map((items, index) => {
            return (

                <CarouselItem className="custom-tag"
                              onExiting={() => setAnimating(false)}
                              onExited={() => setAnimating(false)}
                              key={index}>
                    <Row>
                        {items.map((item,id) => {
                            return (
                                <>
                                
                                <Col key={item["tconst"]}>

                                    <Card inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                                        <CardImg top width="10%" height="200px"
                                                 src={moviesList[id + index * numMovieEachPage]["posterLink"]}
                                                 />
                                        <CardBody>
                                            <CardLink className="movie-overview-thicker" href = "#">{item["primaryTitle"]}</CardLink>
                                        </CardBody>
                                    </Card>

                                </Col>
                                </>
                            );

                        })}
                    </Row> 
                </CarouselItem>

            );
        })

        return (
            <>
            <style>
                    {`.idiot-tag {
                        margin-top : -100px;
                    }`}
            </style>
            <div className="idiot-tag">
                <p className = "py-4 pl-5 movie-carousel-font">Top movies in 2020</p>
                <div>
                    <style>
                        {`.custom-tag {
                            max-width: 100%;
                            height: 500px;
                            background: black;
                        }`}
                    </style>
                    {/** <p className = "pl-5 movie-carousel-font">{moviesList[0]["primaryTitle"]}</p>*/}
                    
                    <Carousel activeIndex={activeId} next={next} previous={previous}
                              interval={null}>
                        <CarouselIndicators items={moviesList.reduce((acc, cur, id, arr) => {
                                                    if (id%numMovieEachPage === 0) 
                                                    acc.push(arr.slice(id, id+numMovieEachPage));
                                                    return acc;
                                                },[])} 
                                            activeIndex={activeId} 
                                            onClickHandler={goToIndex}/>
                        {movieSlides}
                        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
                    </Carousel>

                </div>
                
            </div>
            </>
        );
    } else {
        return <></>;
    }


    //return <p className="movie-carousel-font"> FUCKFUCKFUCK</p>
}

export default MovieCarousel;