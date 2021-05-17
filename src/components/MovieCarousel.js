import React, {useState, useEffect} from 'react'; 
import { Card, CardImg, CardTitle, Row, Col,
         Carousel, CarouselControl, CarouselIndicators, CarouselItem } from 'reactstrap';
import AbortController from 'abort-controller';

const numMovieEachPage = 7;
const controller = new AbortController();
const signal = controller.signal;

const MovieCarousel = () => {

    var [moviesList,setMoviesList] = useState(); 

    const fetchData = (moviesList) => {
        if (moviesList) {
            controller.abort();
        }
    }

    useEffect(() => {
        fetchData(moviesList);
    }, [moviesList]);

    var request_path = '/homepage/getMovieList?2020'; 

    useEffect( async () => {
        await fetch(request_path, {
            method: 'GET',
            signal: signal 
        }).then(res => {
            if (res.status >= 400) {
                throw new Error("Bad response");
            }
            return res.json();
        }).then(data => {
            setMoviesList(data.recordsets[0]);
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


    if (moviesList ) {

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
                        {items.map(item => {
                            return (
                                <Col key={item["tconst"]}>
                                    <p className="small-font">{item["primaryTitle"]}</p>
                                </Col>
                            );

                        })}
                    </Row> 
                </CarouselItem>

            );
        })

        return (
            <div>
                <p className = "pl-5 movie-carousel-font">Top movies in 2020</p>
                <div>
                    <style>
                        {`.custom-tag {
                            max-width: 100%;
                            height: 200px;
                            background: black;
                        }`}
                    </style>
                    {/** <p className = "pl-5 movie-carousel-font">{moviesList[0]["primaryTitle"]}</p>*/}
                    
                    <Carousel activeIndex={activeId} next={next} previous={previous}
                              interval={null}>
                        {movieSlides}
                        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
                    </Carousel>

                </div>
                
            </div>
        );
    } else {
        return <></>;
    }


    //return <p className="movie-carousel-font"> FUCKFUCKFUCK</p>
}

export default MovieCarousel;