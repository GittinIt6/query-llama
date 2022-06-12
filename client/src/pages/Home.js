import React from 'react';
import $ from "jquery";
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { IconContext } from 'react-icons/lib';
import { FiPlusCircle } from "react-icons/fi";
import LlamaGraphicLg from '../images/llama-graphic-lg.svg';

import SurveyForm  from '../components/SurveyForm'

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
    document.body.style.overflow = "hidden";
  }

  const handleClose = () => {
    setVisibility(false);
    document.body.style.overflow = "scroll";
  }

  $(window).on('scroll', function(){
    $(".landing-graphic-container").css("opacity", 1 - $(window).scrollTop() / 350);
  });

  const surveys = data?.surveys || [];

  // if (isVisbile) {
  //   document.body.style.overflow = "hidden";
  // } else {
  //   document.body.style.overflow = "scroll";
  // }

  return (
    <>
    <div className='landing-graphic-container'>
    <h3 className='landing-subheading'>a place to unpack all your questions about everything... ever</h3>
    <img className='landing-graphic' src={LlamaGraphicLg} alt="large graphic element of a llama" />
  </div>
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
          <IconContext.Provider value={{ className: "open-add-form-button", size: 20 }}>
            <button id='open-add-survey-button' className='add-survey-button' onClick={handleOpen}><FiPlusCircle /> Add Survey</button>
          </IconContext.Provider>
        ) : (
          <SurveyForm isVisbile={isVisbile} handleClose={handleClose} />
        )}
      </div>
    </main>
    </>
  );
};

export default Home;