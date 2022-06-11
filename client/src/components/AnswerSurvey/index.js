import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { IconContext } from 'react-icons/lib';
import { FiArrowLeftCircle, FiArrowRight } from "react-icons/fi";
import { Chart as ChartJS,
         CategoryScale,
         LinearScale,
         BarElement,
         Title,
         Tooltip,
         Legend } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2'; 

import { useMutation } from '@apollo/client';
import LlamaWatermark from '../../images/llama-watermark.svg'

import { QUERY_SINGLE_SURVEY } from '../../utils/queries';
    // Chart.register(CategoryScale);

ChartJS.register(
    CategoryScale,
         LinearScale,
         BarElement,
         Title,
         Tooltip,
         Legend
)
const AnswerSurvey = (props) => {
    const { loading, data } = useQuery(QUERY_SINGLE_SURVEY, {
        variables: { surveyId : props.id}
    });

    const survey = data?.survey || [];

    let answers;
    let answerLabels = [];
    let answerCounts = [];

    if (survey.answers && survey.answers.length > 0) {
            answers = survey.answers.map((answer) => 
            <div key={answer._id} className='answer-option-wrapper'>
            <input type="checkbox" />
            <li>{answer.answerText}</li>
            </div>
        );

        for (let i = 0; i < survey.answers.length; i++) {
            answerLabels.push(survey.answers[i].answerText);
            answerCounts.push(survey.answers[i].voteCount);
        }    
    } else {
        answers = <p>There are no answers!</p>
    }

    console.log(answerCounts);

    const [chartData, setChartData] = useState({
        datasets: []
    });

    const [chartOptions, setChartOptions] = useState({});


    useEffect(() => {
       setChartData({
            labels: answerLabels,
            datasets: [
                {
                    label: "Number of Votes per Answer",
                    data: answerCounts,
                    borderColor: "#FA5246",
                    backgroundColor: "#FA5246"
                }
            ]
       });
       setChartOptions({
           responsive: true,
           plugins: {
               legend: {
                   position: "top",
               },
               title: {
                   display: true,
                   text: survey.question
               }
           }
        });
        }, [loading]);


    return (
        <>
            <div className='grey-layer-bg'></div>
                <div className='pop-over-wrapper'>
                <div className="wrapper-content" id='add-survey-form'>
            <IconContext.Provider value={{ className: "go-back-button", size: 30 }}>
            <button id='close-add-survey-button' className='go-back-button' onClick={props.handleClose}><FiArrowLeftCircle /> Go back</button>
            </IconContext.Provider>

            <div className='chart-container'>
            <Bar
                options={chartOptions}
                data={chartData}
                />
            </div>

            <div className='answer-survey-content'>
            <h2>{survey.question}</h2>
            <ul className='answer-options-list'>
                {answers}
            </ul>
            <IconContext.Provider value={{ className: "go-forward-button", size: 24 }}>
                <button className="primary-button" type="submit">
                    Submit Answer <FiArrowRight />
                </button>
            </IconContext.Provider>
            </div>
                <img className='llama-watermark' src={LlamaWatermark} alt="watermark of Llama" />
            </div>
            </div>
        </>
    );
  };
  
  export default AnswerSurvey;