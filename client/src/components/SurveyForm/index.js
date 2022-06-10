import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons/lib';
import { FiArrowLeftCircle, FiArrowRight } from "react-icons/fi";
import { useMutation } from '@apollo/client';
import LlamaWatermark from '../../images/llama-watermark.svg'

import { ADD_SURVEY, ADD_ANSWER } from '../../utils/mutations';
import { QUERY_SURVEYS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';
let v;

const SurveyForm = (props) => {
  const [question, setQuestion] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const [answerText, setAnswerText] = useState('');
  const [answerText1, setAnswerText1] = useState('');
  const [answerText2, setAnswerText2] = useState('');
  const [answerText3, setAnswerText3] = useState('');
  const [answerText4, setAnswerText4] = useState('');
  const [answerText5, setAnswerText5] = useState('');
  const [addAnswer, { answerError }] = useMutation(ADD_ANSWER);

  const [addSurvey, { loading, error }] = useMutation(ADD_SURVEY, {
    update(cache, { data: { addSurvey } }) {
      console.log(cache.data.data);
      console.log(cache.data.data.ROOT_QUERY.surveys)
      console.log(cache);
 
      try {
        const { surveys } = cache.readQuery({ query:
          QUERY_SURVEYS});
  
          cache.writeQuery({
            query: QUERY_SURVEYS,
            data: { surveys: [addSurvey, ...surveys] },
          });


        // return data;
      } catch (e) {
        console.error(e)
      }
      // console.log('outside of try');
      //MJ COMMENT: Commented out below, not sure what it's doing?? me is returning null, I think QUERY_ME isn't working
      // const { me } = cache.readQuery({ query: QUERY_ME });
      // console.log(`const me line 47 is: ${me}`);
      // cache.writeQuery({
        // query: QUERY_ME,
        // data: { me: { ...me, surveys: [...me.surveys, addSurvey] } },
      // });
    },
  });



  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // console.log('---handleFormSubmit entry---');

    if(!question) {
      setQuestion('You must ask something!')
    }
    if (!answerText1) {
      setAnswerText1('You must have at least two answers!');
      return;
    }
    if (!answerText2) {
      setAnswerText2('You must have at least two answers!')
      return;
    }

    var data = {};

      data = await addSurvey({
        variables: {
          question,
          surveyAuthor: Auth.getProfile().data.username,
          isPublic: true
        }
      });
 
      //example returned JSON.stringify(data):
      // $$$ data is {"data":{"addSurvey":{"__typename":"Survey","_id":"62a167d69d98375fc8faa833","question":"asdf202","surveyAuthor":"New Author","expireTime":null,"answers":[]}}}
      // let v = Object.values(JSON.stringify(data)).pop
      let v = Object.values(data)
      v = v[0]
      v = Object.values(v)[0]
      v = Object.values(v)[1]
      let fuckingID = v;
      console.log(`THE DAMN ID IS: ${fuckingID}`);
      console.log(`$$$v is: ${JSON.stringify(v)}`);
      console.log(`$$$ data is ${JSON.stringify(Object.values(data))}`);
      setQuestion('');
    // console.log('~~~handleFormSubmit exit~~~');
    
    if (answerText1) {  
      const { answerData } = await addAnswer({
        variables: {
          surveyId: fuckingID,
          answerText: answerText1
        },
      });
        setAnswerText1('');
    };
    if (answerText2) {  
      const { answerData } = await addAnswer({
        variables: {
          surveyId: fuckingID,
          answerText: answerText2
        },
      });
        setAnswerText2('');
    };
    if (answerText3) {  
      const { answerData } = await addAnswer({
        variables: {
          surveyId: fuckingID,
          answerText: answerText3
        },
      });
        setAnswerText3('');
    };
    if (answerText4) {  
      const { answerData } = await addAnswer({
        variables: {
          surveyId: fuckingID,
          answerText: answerText4
        },
      });
        setAnswerText4('');
    };
    if (answerText5) {  
      const { answerData } = await addAnswer({
        variables: {
          surveyId: fuckingID,
          answerText: answerText5
        },
      });
        setAnswerText5('');
    };
      
  };
  // console.log(`client src components index.js: cacheID is: ${cacheId}`);
console.log(v);



  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'question' && value.length <= 280) {
      setQuestion(value);
      setCharacterCount(value.length);
    }
    if (name === 'answer1' && value.length <= 280) {
      setAnswerText1(value);
    }
    if (name === 'answer2' && value.length <= 280) {
      setAnswerText2(value);
    }
    if (name === 'answer3' && value.length <= 280) {
      setAnswerText3(value);
    }
    if (name === 'answer4' && value.length <= 280) {
      setAnswerText4(value);
    }
    if (name === 'answer5' && value.length <= 280) {
      setAnswerText5(value);
    }

  }

      return (
        <>
        <div className='grey-layer-bg'></div>
          <div className='pop-over-wrapper'>
            <div className="wrapper-content" id='add-survey-form'>
            <IconContext.Provider value={{ className: "go-back-button", size: 30 }}>
            <button id='close-add-survey-button' className='go-back-button' onClick={props.handleClose}><FiArrowLeftCircle /> Go back</button>
            </IconContext.Provider>
      
            <div className='survey-form-content'>
              <h4 className='heading-underline'>enter your question</h4>
        
              {Auth.loggedIn() ? (
                <>
                {/* question input form */}
                  <form
                    className="add-survey-form"
                    onSubmit={handleFormSubmit}
                  >
                    <div className="enter-question-fieldset">
                      <textarea className="enter-question-textarea"
                        name="question"
                        placeholder="example: what is the airspeed velocity of unladen swallow?"
                        value={question}
                        onChange={handleChange}
                      ></textarea>
                    <p
                    className={`char-count-label ${
                      characterCount === 280 || error ? 'text-danger' : ''
                    }`}
                  >
                    Character Count: {characterCount}/280
                    {error && <span className="ml-2">{error.message}</span>}
                  </p>
                  <h3 className='heading-underline'>answer 1 *required</h3>
                    <textarea className="enter-answer-textarea"
                      name="answer1"
                      placeholder="example: 23 MPH"
                      value={answerText1}
                      onChange={handleChange}
                    ></textarea>
                  <h3 className='heading-underline'>answer 2 *required</h3>
                    <textarea className="enter-answer-textarea"
                      name="answer2"
                      placeholder="example: YES"
                      value={answerText2}
                      onChange={handleChange}
                    ></textarea>
                  <h3 className='heading-underline'>answer 3</h3>
                    <textarea className="enter-answer-textarea"
                      name="answer3"
                      placeholder="example: NO"
                      value={answerText3}
                      onChange={handleChange}
                    ></textarea>
                  <h3 className='heading-underline'>answer 4</h3>
                    <textarea className="enter-answer-textarea"
                      name="answer4"
                      placeholder="example: Maybe"
                      value={answerText4}
                      onChange={handleChange}
                    ></textarea>
                  <h3 className='heading-underline'>answer 5</h3>
                    <textarea className="enter-answer-textarea"
                      name="answer5"
                      placeholder="example: I don't want to answer"
                      value={answerText5}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                    
        
                    <div className="submit-survey-button">
                      <IconContext.Provider value={{ className: "go-forward-button", size: 24 }}>
                        <button className="primary-button" type="submit">
                          Add Question <FiArrowRight />
                        </button>
                      </IconContext.Provider>
                    </div>
                  </form>
                </>
              ) : (
                <p>
                  You need to be logged in to ask a question. Please{' '}
                  <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
                </p>
              )}
              </div>
              <img className='llama-watermark' src={LlamaWatermark} alt="watermark of Llama" />
            </div>
          </div>
          </>
      );
};

export default SurveyForm;