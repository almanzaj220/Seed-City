import React, { Fragment, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import './../styles/styles.css'; 
import ReactPlayer from 'react-player';

const Home = () => {
    const [showVideo, setShowVideo] = useState(true)
    return (
        <Fragment>
            <Helmet><title>Seed City</title></Helmet>
            <div className="home">
                <h1 className="home-heading">Welcome to Seed City</h1>
                <button><Link to="/instructions">Next</Link></button>

                <div className='home-video'>
                    {showVideo && (
                    <ReactPlayer
                    playing
                    url= 'videos/IntroVideo.mp4'
                    width='100%'
                    height='100%'
                    onPause={() => setShowVideo(false)}
                />
                    )}
                </div>
            </div>
        </Fragment>
    )};


export default Home;