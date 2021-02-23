import React, { useState,useEffect,useRef } from 'react';
import { Jumbotron, Button } from 'reactstrap';

const TrailerShowcase = () => {

    const contentDB = useRef([]);

    useEffect(() => {
        fetch('/homepage/TrailerShowcase', {
            method: 'GET'
        }).then(res => {
            if (res.status >= 400) {
                throw new Error("Bad response from server");
            }
            return res.json();
        }).then(data => {
            contentDB.current.innerHTML = data.recordsets[0][1]["primaryTitle"];
        }).catch(err => {
            console.log(err);
        })
    })
    return (
        <>
            <Jumbotron>
                <h1 className="display-3">Hello, world!</h1>
                <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
                <hr className="my-2" />
                <div ref = {contentDB}></div>
                <p className="lead">
                    <Button color="primary">Learn More</Button>
                </p>
            </Jumbotron>
        </>
    )
}

export default TrailerShowcase;