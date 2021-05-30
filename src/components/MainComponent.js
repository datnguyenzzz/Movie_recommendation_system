import React, {useState} from 'react';

import Header from './Header';
import Footer from './Footer';
import TrailerShowcase from './TrailerShowcase';
import MovieCarousel from './MovieCarousel';

import Delayed from '../api/Delayed';
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

    const triggerCarousel = (newvalue) => {
        setRequestType(newvalue);
    }

    return (
        <>
            <Header/>
            <p>{requestCount}</p>
            <TrailerShowcase value={moreInfo} onChange={triggerMoreInfo}/>
            {(moreInfo === false) ? (
                <>
                    <Delayed waitBeforeShow={4000}>
                        <MovieCarousel value = {MOVIES_2020}/>
                    </Delayed>
                    <Delayed waitBeforeShow={4000}>
                        <MovieCarousel value = {MOVIES_2019}/>
                    </Delayed>

                    <Delayed waitBeforeShow={4000}>
                        <MovieCarousel value = {MOVIES_RATING}/>
                    </Delayed>

                    <Delayed waitBeforeShow={4000}>
                        <MovieCarousel value = {MOVIES_REACT}/>
                    </Delayed>
                </>
            ) : (
                <></>
            )}
        
            <Footer/>
        </>
    )
}

export default Main;