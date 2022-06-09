import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons/lib';
import { FiArrowLeftCircle, FiArrowRight } from "react-icons/fi";
import { useMutation } from '@apollo/client';
import LlamaWatermark from '../../images/llama-watermark.svg'

const AnswerSurvey = (props) => {
    return (
        <>
            <div className='grey-layer-bg'></div>
                <div className='pop-over-wrapper'>
                <div className="wrapper-content" id='add-survey-form'>
            <IconContext.Provider value={{ className: "go-back-button", size: 30 }}>
            <button id='close-add-survey-button' className='go-back-button' onClick={props.handleClose}><FiArrowLeftCircle /> Go back</button>
            </IconContext.Provider>

            <h1>{props.id}</h1>
            </div>
    
                <img className='llama-watermark' src={LlamaWatermark} alt="watermark of Llama" />
            </div>
        </>
    );
  };
  
  export default AnswerSurvey;