import React, { Fragment, useState } from 'react';
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
import { ReactComponent as Arrow} from '../icons/arrow.svg'

/* 
missing functionality:
- adding a add roommate option
- adding a recap sidebar
- * add icons/logos
- * lower text box in bills section
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

    const [madeChoice, setMadeChoice] = useState(false)
    const [showWarning, setShowWarning] = useState(false)
    const [isLastQuestion, setIsLastQuestion] = useState(false)
    const [is5thQuestion, setIs5thQuestion] = useState(false)

    // these changes to state are manual, it'd be better if they weren't
    const handleOptions = (questionType: string): void => {
        if (questionType === "occupation") {
            if (education === "Start Working") {
                setCurOptions(["Sales", "Admin Assistant", "Customer Service Rep"])
            } else if (education === "Technical School") {
                setCurOptions(["Sales", "Tech Support", "Admin Assistant", "Customer Service Rep"])
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
                setShowWarning(false)
                setMadeChoice(false)
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
                
                handleOptions(question["type"])
                break
            }
            
            if (question["question"] === curQuestion) {
                isNextQuestion = true
            }
        } 
    }

    const handleNextClick = (): void => {
        if (!madeChoice) {
             if (questionType === "housing2") {
                setMadeChoice(true)
                changeQuestion()
            } else if (questionType === "bills") {

            }
            else {setShowWarning(true)}

        } else { 
            changeQuestion()
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
                setHousing(housing + " and you own a " + choice)
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
        setShowWarning(false)
        if (questionType === "bills") {
            setCurMoney(prevMoney - 4000)
        }
        setMadeChoice(true)
        for (var question of questions) {
            if (question["question"] === curQuestion) {
                for (var index in question["options"]) {
                    if (question["options"][index] === e.currentTarget.innerHTML) {
                        setCurMoney(prevMoney + question["values"][index])
                        setChoice(question, e.currentTarget.innerHTML)
                    }
                }
            } 
        }
    }

    const handleChildrenChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = isNaN(e.target.valueAsNumber) ? null : e.target.valueAsNumber
        if (value !== null) {
            setChildren(value)
            if (value !== 0) {
                setCurMoney(prevMoney - ((value * 10000) + 15000) )
            } else {
                setCurMoney(prevMoney)
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
        } else if (questionType === "housing1" || questionType === "housing2") {
            return "questions-choices-btns-housing"
        } else if (questionType === "transportation") {
            return "questions-choices-btns-transportation"
        } else if (questionType === "bills") {
            return "questions-choices-btns-bills"
        } else {
            return "questions-choices-btns-family"
        }
    }

    const handleWarningChange = (): string => {
        if (questionType === "education") {
            return "questions-education-warning"
        } else if (questionType === "occupation") {
            return "questions-occupation-warning"
        } else if (questionType === "housing1" || questionType === "housing2") {
            return "questions-housing-warning"
        } else if (questionType === "transportation") {
            return "questions-transportation-warning"
        } else if (questionType === "bills") {
            return "questions-bills-warning"
        } else {
            return "questions-family-warning"
        }
    }

    /* const [isFirstQuestion, setIsFirstQuestion] = useState(true)
    const handleBackClick = (): void => {
        const indexes = [1,2,3,4,5]
        for (var index of indexes) {
            if (questions[index]["question"] === curQuestion) {
                setCurQuestion(questions[index-1]["question"])
                setCurOptions(questions[index-1]["options"])
                setCurMoney(prevMoney)
            }
        }
    } the next lines are the rendering code
        {isFirstQuestion && (
        <button><Link to="/instructions">Back</Link></button>
    )}
    {!isFirstQuestion && (
        <button onClick={handleBackClick}>Back</button>
    )}
    */

    return (
        <Fragment>
            <Helmet><title>Seed City</title></Helmet>
            <div className="questions" style={{ backgroundImage: `url(${handleBackgroundChange()})`}}>
                <div className={handleQuestionBoxChange()}>
                    <h5>{curQuestion}</h5>
                    {is5thQuestion && (<h5 style={{ color: "red" }}>Click "SCAN YOUR SEED APP TO PAY"</h5>)}
                    {/** this is where the buttons were before */}

                    {showWarning && (
                        <h6 className={handleWarningChange()} style={ { color: "red" } }>Please select an option</h6>
                    )}

                    <div>
                        {isLastQuestion && (
                            <form>
                                <label>Enter number of kids:
                                <input
                                    type="number"
                                    name="kids"
                                    value={children}
                                    onChange={handleChildrenChange}
                                    min="0"
                                />
                                </label>
                            </form>
                        )}
                    </div>
                </div>

                <div className={handleButtonsChange()}>
                    {curOptions.map((option) => <button className='questions-choices-btns-style' onClick={handleOptionClick}>{option}</button> )}
                </div>

                <div>
                        {curQuestion === questions[7]["question"] && (
                            <Link to="/seed-city/finalbalance" className='questions-link'><button className='questions-next-btn'>Next</button></Link>
                        )}
                        {curQuestion !== questions[7]["question"] && (
                            <button className='questions-next-btn' onClick={handleNextClick}>Next</button>
                        )}
                </div>
                {is5thQuestion && (<Arrow className='questions-arrow' style={{ width: "100", height: "100" }}/>)}                
                {is5thQuestion && (<button className='questions-pay-btn' onClick={handleOptionClick}>pay</button>)}
                <h4 className='questions-bank'>Bank statement: {curMoney}</h4>
            </div>
        </Fragment>
    )
}

export default Questions