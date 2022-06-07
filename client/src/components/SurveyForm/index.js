import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_SURVEY, ADD_ANSWER } from '../../utils/mutations';
import { QUERY_SURVEYS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const SurveyForm = ({ surveyId }) => {
  const [question, setQuestion] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addSurvey, { error }] = useMutation(ADD_SURVEY, {
    update(cache, { data: { addSurvey } }) {
      try {
        const { surveys } = cache.readQuery({ query:
        QUERY_SURVEYS});

        cache.writeQuery({
          query: QUERY_SURVEYS,
          data: { surveys: [addSurvey, ...surveys] },
        });
      } catch (e) {
        console.error(e)
      }
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, surveys: [...me.surveys, addSurvey] } },
      });
    },
  });

  
  const [answerText, setAnswerText] = useState('');
  const [addAnswer, { answerError }] = useMutation(ADD_ANSWER);
    
  

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addSurvey({
        variables: { 
          question,
          surveyAuthor: Auth.getProfile().data.username,
        },
      });

      const { answerData } = await addAnswer({
        variables: {
          surveyId,
          answerText
        },
      });

      setQuestion('');
      setAnswerText('');
    } catch (err) {
      console.error(err);
    }

  };

  const handleChange = (event) => {
    const { name, value} = event.target;

    if (name === 'question' && value.length <= 280) {
      setQuestion(value);
      setCharacterCount(value.length);
    }
  }

  return (
    <div>
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