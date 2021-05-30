import React, {useState} from 'react'; 
import { Card, CardImg, CardLink, Row, Col,
         Carousel, CarouselControl, CarouselIndicators, 
         CarouselItem, CardBody, Modal, ModalBody } from 'reactstrap';

const numMovieEachPage = 7;

const CustomCarousel = (props) => { 

    var moviesList = props.moviesList;

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

    var openInfoModal = (newMovieId, newMoreInfo, newModalOpen,
                        newController, newControllerApi) => {
            props.onChange(newMovieId, newMoreInfo, newModalOpen,newController, newControllerApi);
    }


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
                                        <CardLink className="movie-overview-thicker" href = "#" onClick={() => {
                                            openInfoModal(item['tconst'], 
                                                          !props.value, 
                                                          true,
                                                          new AbortController(),
                                                          new AbortController())

                                        }}>{item["primaryTitle"]}</CardLink>
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
        </>
    )
}

export default CustomCarousel;