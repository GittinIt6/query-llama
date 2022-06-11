import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { IconContext } from 'react-icons/lib';
import { FiArrowLeftCircle, FiArrowRight } from "react-icons/fi";
import { useMutation } from '@apollo/client';
import LlamaWatermark from '../../images/llama-watermark.svg'
import { QUERY_SINGLE_SURVEY } from '../../utils/queries';
import { ANSWER_UP } from '../../utils/mutations';

const AnswerSurvey = (props) => {
    const { loading, data } = useQuery(QUERY_SINGLE_SURVEY, {
        variables: { surveyId : props.id }
    });

    const survey = data?.survey || [];
    let answers;

    if (survey.answers && survey.answers.length > 0) {
        answers = survey.answers.map((answer) => 
        <div key={answer._id} className='answer-option-wrapper'>
        <input name={answer._id} type="checkbox" />
        <li>{answer.answerText}</li>
        </div>
    );
    } else {
        answers = <p>There are no answers!</p>
    }

    const handleSubmit = async (event) => {
        // event.preventDefault();
        console.log('clicked....');
        // console.log($('62a42089db3ed902b09c3110').value);
        let b = document.getElementsByName('62a42089db3ed902b09c3110');
        console.log(b);
    }
    return (
        <>
            <div className='grey-layer-bg'></div>
                <div className='pop-over-wrapper'>
                <div className="wrapper-content" id='add-survey-form'>
            <IconContext.Provider value={{ className: "go-back-button", size: 30 }}>
            <button id='close-add-survey-button' className='go-back-button' onClick={props.handleClose}><FiArrowLeftCircle /> Go back</button>
            </IconContext.Provider>

            <div className='answer-survey-content'>
            <h2>{survey.question}</h2>
            <ul className='answer-options-list'>
                {answers}
            </ul>
            <IconContext.Provider value={{ className: "go-forward-button", size: 24 }}>
                <button className="primary-button" onClick={handleSubmit} type="submit">
                    Submit Answer <FiArrowRight />
                </button>
            </IconContext.Provider>
            </div>
                <img className='llama-watermark' src={LlamaWatermark} alt="watermark of Llama" />
            </div>
            </div>
        </>
    );
  };
  
  export default AnswerSurvey;