import React from 'react';
import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { IconContext } from "react-icons";
import { FiThumbsUp, FiThumbsDown, FiBarChart2, FiArrowRight } from 'react-icons/fi'
import { UPVOTE_INCREASE, UPVOTE_DECREASE, DOWNVOTE_INCREASE, DOWNVOTE_DECREASE } from '../../utils/mutations';

// likely wont need this
import { Link } from 'react-router-dom';

import Masonry from 'react-masonry-css';

import AnswerSurvey from '../AnswerSurvey';


// CLick 'submit an answer' -- grab the id of the question 
// Open the AnswerSurvey component
// Find one question by it's id
// Render the question and it's answers
// Selecting an answer and submit does a find and update on the vote count of the chosen answer

const columnLayout = {
  default: 4,
  1100: 3,
  760: 2,
  500: 1
};

const SurveyCards = ({surveys}) => {
  // const { loading, data } = useQuery(QUERY_SINGLE_SURVEY);
  const [isVisbile, setVisibility] = useState(false);
  const [surveyId, setSurveyId] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [downClicked, setDownClicked] = useState(false);


  const [upvoteIncrease, { error1 }] = useMutation(UPVOTE_INCREASE);
  const [upvoteDecrease, { error2 }] = useMutation(UPVOTE_DECREASE);

  const [downvoteIncrease, { error3 }] = useMutation(DOWNVOTE_INCREASE);
  const [downvoteDecrease, { error4 }] = useMutation(DOWNVOTE_DECREASE);

  const handleClick = (e) => {
    let id = e.target.parentNode.parentNode.id;
    setVisibility(true);
    setSurveyId(id);
    document.body.style.overflow = "hidden";
 };

 const handleClose = () => {
  setVisibility(false);
  document.body.style.overflow = "scroll";
}


const handleVoteUp = async (id) => {
  if (clicked === false) {
    await upvoteIncrease({
      variables: {
        surveyId: id
      }
    });
    setClicked(true);
    console.log(id)
    var b = document.getElementById(`up-${id}`);
    b.setAttribute("fill", "#A896FB");
  } else {
    await upvoteDecrease({
      variables: {
        surveyId: id
      }
    });
    setClicked(false);
    var b = document.getElementById(`up-${id}`);
    b.setAttribute("fill", "none");
  }
};

const handleVoteDown = async (id) => {
  if (downClicked === false) {
    await downvoteIncrease({
      variables: {
        surveyId: id
      }
    });
    setDownClicked(true);
    var b = document.getElementById(`down-${id}`);
    b.setAttribute("fill", "#FFBE76");
  } else {
    await downvoteDecrease({
      variables: {
        surveyId: id
      }
    });
    setDownClicked(false);
    var b = document.getElementById(`down-${id}`);
    b.setAttribute("fill", "none");
  }
};


  return (
    <>
    <Masonry 
          breakpointCols={columnLayout}
          className="survey-cards-container"
          columnClassName='survey-cards-container_column'>
    {surveys &&
      surveys.map((survey) => (
        <div id={survey._id} key={survey._id} className="survey-card-wrapper">
        <div className='survey-card-ui'>
        <IconContext.Provider value={{ size: "20px", className: "survey-card-ui-icons" }}>
            <div className='upvote-downvote-ui'>
            <FiThumbsUp id={`up-${survey._id}`} className='thumbsup-icon' onClick={() => {handleVoteUp(survey._id)}}/><span className='upvote-downvote-counter'>{survey.upvotes}</span>
            <FiThumbsDown id={`down-${survey._id}`} className='thumbsdown-icon' onClick={() => {handleVoteDown(survey._id)}}/><span className='upvote-downvote-counter'>{survey.downvotes}</span>
            </div>
            <FiBarChart2 className='chart-icon'/>
        </IconContext.Provider>
            <div className='clearfix'></div>
        </div>
        <div className='qusetion-answer-wrapper'>
        <h2 className='survey-card-question'>{survey.question}</h2>
        <p className='top-answer'><span className='top-answer-label'>Top Answer </span>: {(survey.answers.length > 0) ? (Math.max.apply(null, survey.answers.map(item => item.voteCount))) + " votes" : "Not Answered Yet"}</p>
        {/* need an icon for this button */}
        <button className='submit-answer-btn' onClick={handleClick}>submit your answer <FiArrowRight className='submit-answer-icon'/></button>
        </div>
        {/* dynamically change time to times if anything other than 1 */}
        <p className='answer-counter-label'>Answered<span className='answer-count'>{survey.answers.reduce((total, currentValue) => total = total + currentValue.voteCount,0)}</span>times!</p>
        </div>
      ))}
    </Masonry>
      {isVisbile ? <AnswerSurvey id={surveyId} handleClick={handleClick} handleClose={handleClose} /> : null}
    </>
  );
};



export default SurveyCards;



