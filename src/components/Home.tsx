import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import './../styles/styles.css'; ;

const Home = () => {
    return (
        <Fragment>
            <Helmet><title>Seed City</title></Helmet>
            <div className="home">
                <h1 className="home-heading">Welcome to Seed City</h1>
                <Link to="/instructions" className="home-link"><button>Next</button></Link>

                <div style={{ width: "100%", height: "100%"}}>
                    <iframe title="seed-city-intro" width="100%" height="100%" src="https://www.youtube.com/embed/dRrHJ-SXWx4?autoplay=1&controls=0&rel=0"></iframe>
                </div>
            </div>
        </Fragment>
    )};


export default Home;