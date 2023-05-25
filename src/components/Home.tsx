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
                <Link to="/instructions" className="home-link"><button>Next</button></Link>

                <div className='home-video'>
                    {showVideo && (
                    <ReactPlayer
                    playing
                    url= "videos/introVideo.mp4"
                    width='100%'
                    height='100%'
                    onPause={() => setShowVideo(false)}
                />
                    )}
                    {/*showVideo && (
                        <video autoPlay playsInline controls muted preload="auto" onPause={() => setShowVideo(false)} onClick={() => setShowVideo(false)}>
                            <source src={video} type="webm"/>
                        </video>
                        )
                    */}
                    {/*<iframe width="560" height="315" src="https://www.youtube.com/embed/g1i9cCYNA5M?controls=0&"></iframe>*/}
                </div>
            </div>
        </Fragment>
    )};


export default Home;