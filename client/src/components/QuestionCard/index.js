import React from 'react';

// likely wont need this
import { Link } from 'react-router-dom';

const QuestionCard = () => {
  return (
    <div className='question-card-wrapper'>
        <div className='question-card-ui'>
            {/* 3 icons like,dislike w/ counters and chart icon */}
        </div>
        <h2 className='question-card-question'>Example question text?</h2>
        <p className='top-answer'><span className='top-answer-label'>Top Answer</span>Example of a top answer.</p>
        {/* need an icon for this button */}
        <button>submit your answer</button>
        {/* dynamically change time to times if anything other than 1 */}
        <p className='answer-counter-label'>Answered<span className='answer-count'></span>times!</p>
    </div>
  );
};

export default QuestionCard;
