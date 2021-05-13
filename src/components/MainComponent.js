import React from 'react';

import Header from './Header';
import Footer from './Footer';
import TrailerShowcase from './TrailerShowcase';
import { Switch ,Route } from 'react-router-dom';
import MovieInfo from './MovieInfo';

const Main = () => {
    return (
        <>
            <Header/>
            {/** 
            <Switch>
                <Route path =' /'/>
                <Route path = '/movie' component = {MovieInfo}/>
            </Switch>*/}
            <TrailerShowcase/>
            <Footer/>
        </>
    )
}

export default Main;