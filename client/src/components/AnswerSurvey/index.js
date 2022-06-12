import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { IconContext } from 'react-icons/lib';
import { FiArrowLeftCircle, FiArrowRight, FiThumbsUp, FiThumbsDown  } from "react-icons/fi";
import { useMutation } from '@apollo/client';
import LlamaGraphicSmall from '../../images/llama-graphic-sm.svg'
import { QUERY_SINGLE_SURVEY } from '../../utils/queries';
import { ANSWER_UP,  UPVOTE_INCREASE,UPVOTE_DECREASE, DOWNVOTE_INCREASE, DOWNVOTE_DECREASE } from '../../utils/mutations';


const AnswerSurvey = (props) => {
    const { loading, data } = useQuery(QUERY_SINGLE_SURVEY, {
        variables: { surveyId : props.id }
    });
    const [disable, setDisable] = useState(false);
    const [answerUp, { error }] = useMutation(ANSWER_UP);

    const survey = data?.survey || [];

    //up/down vote test
  
  
    const [upvoteIncrease, { error1 }] = useMutation(UPVOTE_INCREASE);
    const [upvoteDecrease, { error2 }] = useMutation(UPVOTE_DECREASE);
  
    const [downvoteIncrease, { error3 }] = useMutation(DOWNVOTE_INCREASE);
    const [downvoteDecrease, { error4 }] = useMutation(DOWNVOTE_DECREASE);
    //up/down vote test end

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
        props.handleClose();
    }

    // start test up/downvote
    const handleVoteUp = async (id) => {
        var a = document.getElementById(`up-${id}`);
        if (a.classList.contains('clicked') === false) {
          await upvoteIncrease({
            variables: {
              surveyId: id
            }
          });
          a.setAttribute("fill", "#A896FB");
          a.classList.add('clicked');
        } else {
          await upvoteDecrease({
            variables: {
              surveyId: id
            }
          });
          a.classList.remove('clicked')
          a.setAttribute("fill", "none");
        }
      };
      
      const handleVoteDown = async (id) => {
        var b = document.getElementById(`down-${id}`);
        if (b.classList.contains('clicked') === false) {
          await downvoteIncrease({
            variables: {
              surveyId: id
            }
          });
          b.classList.add('clicked');
          b.setAttribute("fill", "#FFBE76");
        } else {
          await downvoteDecrease({
            variables: {
              surveyId: id
            }
          });
          b.classList.remove('clicked');
          b.setAttribute("fill", "none");
        }
      };
    //   end up/down vote test
   
    return (
        <>
            <div className='grey-layer-bg' onClick={props.handleClose}></div>
                <div className='pop-over-wrapper'>
                <div className="wrapper-content" id='add-survey-form'>
            <IconContext.Provider value={{ className: "go-back-button", size: 30 }}>
            <button id='close-add-survey-button' className='go-back-button' onClick={props.handleClose}><FiArrowLeftCircle /> Go back</button>
            </IconContext.Provider>
                {/* Up/down vote test */}
                <IconContext.Provider value={{ size: "20px", className: "survey-card-ui-icons" }}>
            <div id='interior-upvote-downvote-ui' className='upvote-downvote-ui'>
            <FiThumbsUp id={`up-${survey._id}`} className={`thumbsup-icon up-${survey._id}`} onClick={() => {handleVoteUp(survey._id)}}/><span className='upvote-downvote-counter'>{survey.upvotes}</span>
            <FiThumbsDown id={`down-${survey._id}`} className='thumbsdown-icon' onClick={() => {handleVoteDown(survey._id)}}/><span className='upvote-downvote-counter'>{survey.downvotes}</span>
            </div>
        </IconContext.Provider>
            {/* up/down vote test end */}

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