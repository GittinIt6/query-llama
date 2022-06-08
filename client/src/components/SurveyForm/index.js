import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons/lib';
import { FiArrowLeftCircle, FiArrowRight } from "react-icons/fi";
import { useMutation } from '@apollo/client';
import LlamaWatermark from '../../images/llama-watermark.svg'

import { ADD_SURVEY, ADD_ANSWER } from '../../utils/mutations';
import { QUERY_SURVEYS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';
let cacheId;
const SurveyForm = (props) => {
  const [question, setQuestion] = useState('');

  const [characterCount, setCharacterCount] = useState(0);
  const [characterCount2, setCharacterCount2] = useState(0);

  const [addSurvey, { loading, error }] = useMutation(ADD_SURVEY, {
    update(cache, { data: { addSurvey } }) {
      let obj = cache.data.data
      let lastKey = Object.keys(obj).pop();
      let v = obj[lastKey]
      cacheId = v._id
      console.log(`cacheID line 25: ${cacheId}`);
      // console.log(`client src components index.js: obj is: ${obj}`);
      // console.log(`client src components index.js: lastKey is: ${lastKey}`)
      // console.log(`client src components index.js: v is: ${v}`)
      // console.log(`client src components index.js: v._id is: ${v._id}`)
      // console.log(cache.data.data[cache.data.data.length - 1]._id);
      // console.log(cache.data.data[cache.data.data.length - 1]._id);
      try {
        const { surveys } = cache.readQuery({ query:
        QUERY_SURVEYS});
        console.log(`const { surveys } is ${JSON.stringify(surveys)}`);
        console.log(`this is line 34(ish) of index.js: ${JSON.stringify(cache.readQuery({ query: QUERY_ME }))}`)
        cache.writeQuery({
          query: QUERY_SURVEYS,
          data: { surveys: [addSurvey, ...surveys] },
        });
        // return data;
      } catch (e) {
        console.error(e)
      }
      console.log('outside of try');
      //MJ COMMENT: Commented out below, not sure what it's doing?? me is returning null, I think QUERY_ME isn't working
      // const { me } = cache.readQuery({ query: QUERY_ME });
      // console.log(`const me line 47 is: ${me}`);
      // cache.writeQuery({
        // query: QUERY_ME,
        // data: { me: { ...me, surveys: [...me.surveys, addSurvey] } },
      // });
    },
  });

  const [answerText, setAnswerText] = useState('');
  const [addAnswer, { answerError }] = useMutation(ADD_ANSWER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log('---handleFormSubmit entry---');
    var data = {};
    
      data = await addSurvey({
        variables: { 
          question,
          // surveyAuthor: Auth.getProfile().data.username,
          surveyAuthor: "New Author",
          isPublic: true
        }
      });
      
      setQuestion('');
    console.log('~~~handleFormSubmit exit~~~');

  };
  console.log(`client src components index.js: cacheID is: ${cacheId}`);

  // const handleAnswerSubmit = async ({ surveyId }, event) =>{
  //   event.preventDefault();

  //   try {
  //     const { answerData } = await addAnswer({
  //       variables: {
  //         surveyId,
  //         answerText
  //       },
  //     });
  //     setAnswerText('');
  //   } catch (err) {
  //     console.error(err)
  //   }
  // }


  const handleChange = (event) => {
    const { name, value} = event.target;

    if (name === 'question' && value.length <= 280) {
      setQuestion(value);
      setCharacterCount(value.length);
    }

    if (name === 'answer' && value.length <= 280) {
      setAnswerText(value);
      setCharacterCount2(value.length);
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
                  <form
                    className="add-survey-form"
                    onSubmit={handleFormSubmit}
                  >
                    <div className="enter-question-fieldset">
                      <textarea
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