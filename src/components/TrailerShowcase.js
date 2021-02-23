import React, { useState,useEffect } from 'react';
import { Jumbotron, Button } from 'reactstrap';

const TrailerShowcase = () => {

    const [titleDB,setTitleDB] = useState([]);
    const [reqDB,setReqDB] = useState(false);

    useEffect(() => {
        if (reqDB==false) {
            setReqDB(true);
            fetch('/homepage/TrailerShowcase', {
                method: 'GET'
            }).then(res => {
                if (res.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return res.json();
            }).then(data => {
                //console.log(data.recordsets);
                setTitleDB(data.recordsets);
            }).catch(err => {
                console.log(err);
            })
        }
    },[reqDB])
    console.log(titleDB);
    return (
        <>
            <Jumbotron>
                <h1 className="display-3">Hello, world!</h1>
                <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
                <hr className="my-2" />
                <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                <p className="lead">
                    <Button color="primary">Learn More</Button>
                </p>
            </Jumbotron>
        </>
    )
}

export default TrailerShowcase;