import React from 'react';
import { IconContext } from "react-icons";
import { FiThumbsUp, FiThumbsDown, FiBarChart2, FiArrowRight } from 'react-icons/fi'

// likely wont need this
import { Link } from 'react-router-dom';

import Masonry from 'react-masonry-css';

const columnLayout = {
  default: 4,
  1100: 3,
  760: 2,
  500: 1
};

const SurveyCards = ({surveys}) => {
  return (
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
            <FiThumbsUp className='thumbsup-icon'/><span className='upvote-downvote-counter'>{survey.upvotes}</span>
            <FiThumbsDown className='thumbsdown-icon' /><span className='upvote-downvote-counter'>{survey.downvotes}</span>
            </div>
            <FiBarChart2 className='chart-icon'/>
        </IconContext.Provider>
            <div className='clearfix'></div>
        </div>
        <div className='qusetion-answer-wrapper'>
        <h2 className='survey-card-question'>{survey.question}</h2>
        <p className='top-answer'><span className='top-answer-label'>Top Answer </span>: {(survey.answers.length > 0) ? (Math.max.apply(null, survey.answers.map(item => item.voteCount))) + " votes" : "Not Answered Yet"}</p>
        {/* need an icon for this button */}
        <button className='submit-answer-btn'>submit your answer <FiArrowRight className='submit-answer-icon'/></button>
        </div>
        {/* dynamically change time to times if anything other than 1 */}
        <p className='answer-counter-label'>Answered<span className='answer-count'>{survey.answers.reduce((total, currentValue) => total = total + currentValue.voteCount,0)}</span>times!</p>
        </div>
      ))}
    </Masonry>
  );
};



export default SurveyCards;



