import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { IState } from "../App";
import './../styles/styles.css';

interface IProps {
    curMoney: IState["money"],
}

const Instructions: React.FC<IProps> = ({curMoney}) => {
    return (
        <Fragment>
            <Helmet><title>Instructions</title></Helmet>
            <div className="instructions">
                    <h1 className="instructions-heading">How it works</h1>
                    <h4 className="instructions-text">
                        Here in Seed City, you can get the life you have always wanted. 
                        You get to choose how much money you make, what property you 
                        own, and your career. But as we all know, the choices we make 
                        have their consequences. See how much money (or debt) you are 
                        left with based on the  choices you have made.  Everyone has 
                        Utilities, Food, & Credit Card & Cellular Phone.
                    </h4>

                <h4 className="instructions-bank">Bank Statement: {curMoney}</h4>
                <Link to="/questions" className="instructions-link"><button>Next</button></Link>
            </div>
        </Fragment>
    );};


export default Instructions;