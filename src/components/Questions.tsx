import React, { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from "react-router-dom";
import questions from '../questions.json';
import { IState } from "../App";
import './../styles/styles.css';
import background1 from '../images/EducationPage.png';
import background2 from '../images/OccupationPage.png';
import background3 from '../images/HousingPage.png';
import background4 from '../images/TransportationPage.png';
import background5 from '../images/BillsPage.png';
import background6 from '../images/FamilyPage.png';

/* 
missing functionality:
- adding a add roommate option
- * pop ups for 2 part questions
- * bills --> click "scan seed app to pay"
*/

interface IProps {
    curQuestion: IState["question"],
    setCurQuestion: React.Dispatch<React.SetStateAction<IState["question"]>>
    curMoney: IState["money"],
    setCurMoney: React.Dispatch<React.SetStateAction<IState["money"]>>
    curOptions: IState["options"],
    setCurOptions: React.Dispatch<React.SetStateAction<IState["options"]>>
    prevMoney: IState["prevMoney"],
    setPrevMoney: React.Dispatch<React.SetStateAction<IState["prevMoney"]>>
    education: IState["education"],
    setEducation: React.Dispatch<React.SetStateAction<IState["education"]>>
    occupation: IState["occupation"],
    setOccupation: React.Dispatch<React.SetStateAction<IState["occupation"]>>
    housing: IState["housing"],
    setHousing: React.Dispatch<React.SetStateAction<IState["housing"]>>
    transportation: IState["transportation"],
    setTransportation: React.Dispatch<React.SetStateAction<IState["transportation"]>>
    bills: IState["bills"],
    setBills: React.Dispatch<React.SetStateAction<IState["bills"]>>
    marriage: IState["marriage"]
    setMarriage: React.Dispatch<React.SetStateAction<IState["marriage"]>>
    children: IState["children"]
    setChildren: React.Dispatch<React.SetStateAction<IState["children"]>>
    questionType: IState["questionType"]
    setQuestionType: React.Dispatch<React.SetStateAction<IState["questionType"]>>
}

const Questions: React.FC<IProps> = (
    { curQuestion, 
        setCurQuestion, 
        curMoney, 
        setCurMoney, 
        curOptions, 
        setCurOptions, 
        prevMoney, 
        setPrevMoney, 
        education, 
        setEducation, 
        occupation, 
        setOccupation, 
        housing, 
        setHousing, 
        transportation, 
        setTransportation, 
        bills, 
        setBills, 
        marriage, 
        setMarriage,
        children,
        setChildren,
        questionType,
        setQuestionType }) => { 

    const [isLastQuestion, setIsLastQuestion] = useState(false)
    const [is5thQuestion, setIs5thQuestion] = useState(false)

    const handleOccupationOptions = (): void => {
        if (questionType === "occupation") {
            if (education === "Start Working") {
                setCurOptions(["Sales", "Assistant", "Customer Service"])
            } else if (education === "Technical School") {
                setCurOptions(["Sales", "Tech Support", "Assistant", "Customer Service"])
            }
        } 
    }

    const changeQuestion = (): void => {
        var isNextQuestion = false
        for (var question of questions) {
            if (question === questions[-1]) {
                break
            }
            
            if (isNextQuestion === true) {
                setCurQuestion(question["question"])
                setCurOptions(question["options"])
                setPrevMoney(curMoney)
                setQuestionType(question["type"])

                if (questionType === "family1") {
                    setIsLastQuestion(true)
                }
                if (questionType === "transportation") {
                    setIs5thQuestion(true)
                }
                if (questionType === "bills") {
                    setIs5thQuestion(false)
                }
                break
            }
            
            if (question["question"] === curQuestion) {
                isNextQuestion = true
            }
        }
    }

    // used to track the choices the user makes
    // whenever the user clicks an option, the corresponding state variable is set
    const setChoice = (question: {
        type: string;
        question: string;
        options: string[];
        values: number[];
    }, 
    choice: string): void => {
        if (question["type"] === "education") {
            setEducation(choice)
        } else if (question["type"] === "occupation") {
            setOccupation(choice)
        } else if (question["type"] === "housing1") {
            setHousing(choice)
        } else if (question["type"] === "housing2") {
            if (choice === "Vacation House") {
                setHousing(housing + " and own a " + choice)
            }
        } else if (question["type"] === "transportation") {
            setTransportation(choice)
        } else if (question["type"] === "bills") {
            setBills(choice)
        } else if (question["type"] === "family1") {
            setMarriage(choice)
        } 
    }

    const handleOptionClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        if (questionType === "bills") {
            setCurMoney(curMoney - 4000)
        }

        for (var question of questions) {
            if (question["question"] === curQuestion) {
                for (var index in question["options"]) {
                    if (question["options"][index] === e.currentTarget.innerHTML) {
                        setCurMoney(curMoney + question["values"][index])
                        setChoice(question, e.currentTarget.innerHTML)
                    }
                }
            } 
        }
        changeQuestion()
    }

    const handleChildrenChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = isNaN(e.target.valueAsNumber) ? null : e.target.valueAsNumber
        if (value !== null) {
            if (marriage === "No Marriage") {
                setChildren(value)
                if (value !== 0) {
                    setCurMoney(prevMoney - ((value * 10000) + 15000) )
                } else {
                    setCurMoney(prevMoney)
                }
            } else {
                setChildren(value)
                if (value !== 0) {
                    setCurMoney(prevMoney - ((value * 10000) + 15000 + 25000) )
                } else {
                    setCurMoney(prevMoney-25000)
                }
            }
        }
    }

    const handleBackgroundChange = (): string => {
        if (questionType === "education") {
            return background1
        } else if (questionType === "occupation") {
            return background2
        } else if (questionType === "housing1" || questionType === "housing2") {
            return background3
        } else if (questionType === "transportation") {
            return background4
        } else if (questionType === "bills") {
            return background5
        } else {
            return background6
        }
    }

    const handleQuestionBoxChange = (): string => {
        if (questionType === "education") {
            return "questions-choices-education"
        } else if (questionType === "occupation") {
            return "questions-choices-occupation"
        } else if (questionType === "housing1" || questionType === "housing2") {
            return "questions-choices-housing"
        } else if (questionType === "transportation") {
            return "questions-choices-transportation"
        } else if (questionType === "bills") {
            return "questions-choices-bills"
        } else {
            return "questions-choices-family"
        }
    }

    const handleButtonsChange = (): string => {
        if (questionType === "education") {
            return "questions-choices-btns-education"
        } else if (questionType === "occupation") {
            if (education === "4 Year College Degree") {
                return "questions-choices-btns-occupation1"
            } else if (education === "Start Working") {
                return "questions-choices-btns-occupation2"
            } else {
                return "questions-choices-btns-occupation3"
            }
        } else if (questionType === "housing1") {
            return "questions-choices-btns-housing1"
        } else if (questionType === "housing2") {
            return "questions-choices-btns-housing2"
        } else if (questionType === "transportation") {
            return "questions-choices-btns-transportation"
        } else if (questionType === "bills") {
            return "questions-choices-btns-bills"
        } else {
            return "questions-choices-btns-family"
        }
    }

    // used to update state on time for 2nd question
    useEffect(() => {handleOccupationOptions()}, [education])

    return (
        <Fragment>
            <Helmet><title>Seed City</title></Helmet>
            <div className="questions" style={{ backgroundImage: `url(${handleBackgroundChange()})`}}>
                <div className={handleQuestionBoxChange()}>
                    <h5>{curQuestion}</h5>
                    {is5thQuestion && (<h5 style={{ color: "red" }}>Click "Next" to pay your bills!</h5>)}
                    <div>
                        {isLastQuestion && (
                            <form>
                                <label style={{ fontSize: "1.3vw" }}>Enter number of kids:  
                                <input
                                    type="number"
                                    name="kids"
                                    value={children}
                                    onChange={handleChildrenChange}
                                    min="0"
                                    size={45}
                                />
                                </label>
                            </form>
                        )}
                    </div>
                </div>

                <div className={handleButtonsChange()}>
                    {curOptions.map((option) => <button className='questions-choices-btns-style' onClick={handleOptionClick}>{option}</button> )}
                </div>


                {(questionType === "housing1" || questionType === "housing2") && (
                    <h3 className='questions-public-housing-label'>Public Housing</h3>
                )}
                {(questionType === "housing1" || questionType === "housing2") && (
                    <h3 className='questions-apartment-label'>Apartment</h3>
                )}
                {(questionType === "housing1" || questionType === "housing2") && (
                    <h3 className='questions-house-label'>House</h3>
                )}
                {(questionType === "housing1" || questionType === "housing2") && (
                    <h3 className='questions-vacation-house-label'>Vacation House</h3>
                )}
              

                <div>
                    {curQuestion === questions[7]["question"] && (
                        <Link to="/finalbalance" className='questions-link'><button className='questions-next-btn'>Next</button></Link>
                    )}
                </div>                
                {is5thQuestion && (<button className='questions-next-btn' onClick={handleOptionClick}>Next</button>)}
                <h4 className='questions-bank'>Bank Statement: {curMoney}</h4>
            </div>
        </Fragment>
    )
}

export default Questions