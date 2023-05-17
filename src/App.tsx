import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home'
import Instructions from './components/Instructions';
import Questions from './components/Questions';
import questions from './questions.json';
import FinalBalance from './components/FinalBalance';

export interface IState {
  question: string,
  money: number,
  options: string[],
  prevMoney: number,
  education: string,
  occupation: string,
  housing: string,
  transportation: string,
  bills: string,
  marriage: string,
  children: number,
  questionType: string
}

function App() {
  const startingBankBalances = [30000, 50000, 100000]
  const randomIndex = Math.floor(Math.random() * 3)

  const [curQuestion, setCurQuestion] = useState<IState["question"]>(questions[0]["question"])
  const [curMoney, setCurMoney] = useState<IState["money"]>(startingBankBalances[randomIndex])
  const [curOptions, setCurOptions] = useState<IState["options"]>(questions[0]["options"])
  const [prevMoney, setPrevMoney] = useState<IState["prevMoney"]>(curMoney)
  const [education, setEducation] = useState<IState["education"]>("")
  const [occupation, setOccupation] = useState<IState["occupation"]>("")
  const [housing, setHousing] = useState<IState["housing"]>("")
  const [transportation, setTransportation] = useState<IState["education"]>("")
  const [bills, setBills] = useState<IState["bills"]>("")
  const [marriage, setMarriage] = useState<IState["marriage"]>("")
  const [children, setChildren] = useState<IState["children"]>(0)
  const [questionType, setQuestionType] = useState<IState["questionType"]>(questions[0]["type"])

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/seed-city" element={<Home />} />
        <Route path="/seed-city/instructions" element={<Instructions curMoney={curMoney} />} />
        <Route path="/seed-city/questions" element={
          <Questions 
            curQuestion={curQuestion} 
            setCurQuestion={setCurQuestion} 
            curMoney={curMoney} 
            setCurMoney={setCurMoney}
            curOptions={curOptions}
            setCurOptions={setCurOptions}
            prevMoney={prevMoney}
            setPrevMoney={setPrevMoney}
            education={education}
            setEducation={setEducation}
            occupation={occupation}
            setOccupation={setOccupation}
            housing={housing}
            setHousing={setHousing}
            transportation={transportation}
            setTransportation={setTransportation}
            bills={bills}
            setBills={setBills}
            marriage={marriage}
            setMarriage={setMarriage}
            children={children}
            setChildren={setChildren} 
            questionType={questionType}
            setQuestionType={setQuestionType} />} />
        <Route path="/seed-city/finalbalance" element={
          <FinalBalance 
            curMoney={curMoney}
            education={education}
            occupation={occupation}
            housing={housing}
            transportation={transportation}
            marriage={marriage}
            children={children} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
