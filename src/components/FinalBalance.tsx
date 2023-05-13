import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { IState } from "../App";
import './../styles/styles.css';

interface IProps {
    curMoney: IState["money"],
    education: IState["education"],
    occupation: IState["occupation"],
    housing: IState["housing"],
    transportation: IState["transportation"],
    marriage: IState["marriage"],
    children: IState["children"]
}

const FinalBalance: React.FC<IProps> = ({ curMoney, education, occupation, housing, transportation, marriage, children }) => {
    return (
        <Fragment>
            <Helmet><title>Final Balance</title></Helmet>
            <div className='finalpage'>
                <h4 className='finalpage-bank'>Final Balance: {curMoney}</h4>
                <h3 className='finalpage-heading'>Your life in Seed City:</h3>
                <h6 className='finalpage-text'>You have completed the game! Here’s a summary of your life 
                    in Seed City: <br></br>
                    <ul style={{ textAlign: "start" }}>
                        <li>Your Highest Education pursued is {education}</li>
                        <li>Your Occupation is {occupation}.</li>
                        <li>You Live in a {housing}</li>
                        <li>Your Highest Education pursued is {education}.</li>
                        <li>Your transportation method is a {transportation}</li>
                        <li>Your family life includes {marriage} and {children} kids</li>
                    </ul> 
                </h6>
            </div>
        </Fragment>
    )
}

export default FinalBalance