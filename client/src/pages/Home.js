import React from 'react';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { IconContext } from 'react-icons/lib';
import { FiPlusCircle } from "react-icons/fi";

import  SurveyForm  from '../components/SurveyForm'

import SurveyCards from '../components/SurveyCards';
// Import the query we are going to execute from its file
import { QUERY_SURVEYS } from '../utils/queries';


const Home = () => {
  const { loading, data } = useQuery(QUERY_SURVEYS);
  const [isVisbile, setVisibility] = useState(false);

  // useEffect(() => {
  //   let openFormButton = document.getElementById('open-add-survey-button');

  //   const openAddSurvey = () => setVisibility(true);

  //   openFormButton.addEventListener('click', openAddSurvey);

  //   // return a clean-up function
  //   return () => {
  //     openFormButton.removeEventListener('click', openAddSurvey);
  //   }
  // }, [])

  const handleOpen = () => {
    setVisibility(true);
  }

  const handleClose = () => {
    setVisibility(false);
  }

  // Use optional chaining to check if data exists and if it has a thoughts property. If not, return an empty array to use.
  const surveys = data?.surveys || [];

  return (
    <main>
        {loading ? (
          <div>loading...</div>
        ) : (
            <SurveyCards 
            surveys={surveys}
            />
        )}
      <div>
        {!isVisbile ? (
          <IconContext.Provider value={{ className: "open-add-form-button", size: 30 }}>
            <button id='open-add-survey-button' className='add-survey-button' onClick={handleOpen}><FiPlusCircle /></button>
          </IconContext.Provider>
        ) : (
          <SurveyForm isVisbile={isVisbile} handleClose={handleClose} />
        )}
      </div>
    </main>
  );
};

export default Home;