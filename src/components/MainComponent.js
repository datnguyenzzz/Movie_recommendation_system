import React, {useState} from 'react';

import Header from './Header';
import Footer from './Footer';
import TrailerShowcase from './TrailerShowcase';
import MovieCarousel from './MovieCarousel';

import Delayed from '../api/Delayed';
import AbortController from 'abort-controller';

const Main = () => {
    const [stopRender, setStopRender] = useState(true);

    return (
        <>
            <Header/>
            <TrailerShowcase/>
            <Delayed waitBeforeShow={4000}>
                <MovieCarousel/>
            </Delayed>
            <Footer/>
        </>
    )
}

export default Main;