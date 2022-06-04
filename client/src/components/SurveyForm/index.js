import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_SURVEY } from '../../utils/mutations';
import { QUERY_SURVEYS } from '../../utils/queries';

const SurveyForm = () => {
  const [formState, setFormState] = useState({
    question: '',
    answers: [],
    expireTime: ''
  });
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
    },
  });

  const handleFormSubmit = (event) => {
    const { name, value} = event.target;

    if (name === 'question' && value.length <= 280) {
      setFormState({ ...formState, [name]: value });
      setCharacterCount(value.length);
    } else if (name !== 'question') {
      setFormState({ ...formState, [name]: value });
    }
  };

  return (
    <div>
      
    </div>

  );

};

export default SurveyForm;