import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { IconContext } from 'react-icons/lib';
import { FiArrowLeftCircle, FiArrowRight } from "react-icons/fi";
import { useMutation } from '@apollo/client';
import LlamaGraphicSmall from '../../images/llama-graphic-sm.svg'
import { QUERY_SINGLE_SURVEY } from '../../utils/queries';
import { ANSWER_UP } from '../../utils/mutations';


const AnswerSurvey = (props) => {
    const { loading, data } = useQuery(QUERY_SINGLE_SURVEY, {
        variables: { surveyId : props.id }
    });
    const [disable, setDisable] = useState(false);
    const [answerUp, { error }] = useMutation(ANSWER_UP);

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

    const handleAnswerUp = async (id,answerId) => {
        await answerUp({
            variables: {
              surveyId: id,
              answerId: answerId
            }
          });
    }

    const handleSubmit = async (event) => {

        let checkedAnswers = document.querySelectorAll('input[type="checkbox"]:checked');
        for (let i = 0; i < checkedAnswers.length; i++) {
            await handleAnswerUp(props.id,checkedAnswers[i].name)
        }

        let allCheckBoxes = document.querySelectorAll('input[type="checkbox"]');
        for (let index = 0; index < allCheckBoxes.length; index++) {
            allCheckBoxes[index].disabled = true;
        }

        setDisable(true); //disable button and change text to gray
        document.querySelector('[name="submit-answer"]').style.color = "gray";
    }
   
    return (
        <>
            <div className='grey-layer-bg' onClick={props.handleClose}></div>
                <div className='pop-over-wrapper'>
                <div className="wrapper-content" id='add-survey-form'>
            <IconContext.Provider value={{ className: "go-back-button", size: 30 }}>
            <button id='close-add-survey-button' className='go-back-button' onClick={props.handleClose}><FiArrowLeftCircle /> Go back</button>
            </IconContext.Provider>

            <div className='answer-survey-content'>
            <h2 className='interior'>{survey.question}</h2>
            <ul className='answer-options-list'>
                {answers}
            </ul>
            <IconContext.Provider value={{ className: "go-forward-button", size: 24 }}>
                <button className="primary-button" disabled={disable} name="submit-answer" onClick={handleSubmit} type="submit">
                    Submit Answer <FiArrowRight />
                </button>
            </IconContext.Provider>
            </div>
                
            </div>
            <img className='llama-watermark' src={LlamaGraphicSmall} alt="watermark of Llama" />
            </div>
        </>
    );
  };
  
  export default AnswerSurvey;