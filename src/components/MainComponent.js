import React, {useState} from 'react';

import { Modal, ModalBody } from 'reactstrap';

import Header from './Header';
import Footer from './Footer';
import TrailerShowcase from './TrailerShowcase';
import MovieCarousel from './MovieCarousel';

import Delayed from '../api/Delayed';
import MovieInfo from './MovieInfo';
import AbortController from 'abort-controller';

const MOVIES_2020 = 0;
const MOVIES_2019 = 1; 
const MOVIES_RATING = 2;
const MOVIES_REACT = 3;

const Main = () => {
    const [stopRender, setStopRender] = useState(true);
    const [moreInfo, setMoreInfo] = useState(false);
    const [requestCount, setRequestType] = useState(0);

    const triggerMoreInfo = (newvalue) => {
        setMoreInfo(newvalue);
    }

    //MODAL TOGGLE 
    const [modal_open, set_modal_open] = useState(false);
    //Modal controller
    const [modal_controller,set_modal_controller] = useState();
    const [modal_controller_api, set_modal_controller_api] = useState();
    var [movieChosenToReview, setMovieChosenToReview] = useState();

    const triggerModalInfo = (newMovieId, newMoreInfo, newModalOpen,
                              newController, newControllerApi) => {
        setMovieChosenToReview(newMovieId);
        setMoreInfo(newMoreInfo);
        set_modal_open(newModalOpen);
        set_modal_controller(newController); 
        set_modal_controller_api(newControllerApi);
    }


    return (
        <>
            <Header/>

            <Modal className="movie-info" isOpen={modal_open} toggle={() => {
                set_modal_open(false); 
                setMoreInfo(!moreInfo);
                modal_controller.abort();
                modal_controller_api.abort(); 
            }}>
                <ModalBody className="px-0 py-0">
                    <MovieInfo movieId = {movieChosenToReview} 
                               controller = {modal_controller}
                               controller_api = {modal_controller_api}/>
                </ModalBody>

            </Modal>
            
            <TrailerShowcase value={moreInfo} onChange={triggerModalInfo}/>

            <Delayed waitBeforeShow={4000}>
                <MovieCarousel request_type = {MOVIES_2020} 
                            value = {moreInfo} onChange={triggerModalInfo}/>
            </Delayed>

            <Delayed waitBeforeShow={4000}>
                <MovieCarousel request_type = {MOVIES_2019} 
                            value = {moreInfo} onChange={triggerModalInfo}/>
            </Delayed>

            <Delayed waitBeforeShow={4000}>
                <MovieCarousel request_type = {MOVIES_RATING} 
                            value = {moreInfo} onChange={triggerModalInfo}/>
            </Delayed>

            <Delayed waitBeforeShow={4000}>
                <MovieCarousel request_type = {MOVIES_REACT} 
                            value = {moreInfo} onChange={triggerModalInfo}/>
            </Delayed>

        
            <Footer/>
        </>
    )
}

export default Main;