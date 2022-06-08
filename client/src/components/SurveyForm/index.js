import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons/lib';
import { FiArrowLeftCircle } from "react-icons/fi";
import { useMutation } from '@apollo/client';

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
        <div className='pop-over-wrapper' id='add-survey-form'>
          <IconContext.Provider value={{ className: "go-back-button", size: 30 }}>
          <button id='close-add-survey-button' className='go-back-button' onClick={props.handleClose}><FiArrowLeftCircle /></button>
        </IconContext.Provider>
    
          <h4>Enter your question</h4>
    
          {Auth.loggedIn() ? (
            <>
              <p
                className={`m-0 ${
                  characterCount === 280 || error ? 'text-danger' : ''
                }`}
              >
                Character Count: {characterCount}/280
                {error && <span className="ml-2">{error.message}</span>}
              </p>
              <form
                className="flex-row justify-center justify-space-between-md align-center"
                onSubmit={handleFormSubmit}
              >
                <div className="col-12 col-lg-9">
                  <textarea
                    name="question"
                    placeholder="Add your question"
                    value={question}
                    className="form-input w-100"
                    style={{ lineHeight: '1.5', resize: 'vertical' }}
                    onChange={handleChange}
                  ></textarea>
                </div>
                
    
                <div className="col-12 col-lg-3">
                  <button className="btn btn-primary btn-block py-3" type="submit">
                    Add Question
                  </button>
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
      );
};

export default SurveyForm;