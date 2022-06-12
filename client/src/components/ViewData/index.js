import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { IconContext } from 'react-icons/lib';
import { FiArrowLeftCircle } from "react-icons/fi";
import { Chart as ChartJS,
         CategoryScale,
         LinearScale,
         BarElement,
         Title,
         Tooltip,
         Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2'; 

import LlamaGraphicSmall from '../../images/llama-graphic-sm.svg'
import { QUERY_SINGLE_SURVEY } from '../../utils/queries';

ChartJS.register(
    CategoryScale,
         LinearScale,
         BarElement,
         Title,
         Tooltip,
         Legend
)

const ViewData = (props) => {
    const { loading, data } = useQuery(QUERY_SINGLE_SURVEY, {
        variables: { surveyId : props.id }
    });

    const survey = data?.survey || [];

    let answers;
    let answerLabels = [];
    let answerCounts = [];

    if (survey.answers && survey.answers.length > 0) {
        for (let i = 0; i < survey.answers.length; i++) {
            answerLabels.push(survey.answers[i].answerText);
            answerCounts.push(survey.answers[i].voteCount);
        }    
    } else {
        answers = <p>There are no answers!</p>
    }
 
    const [chartData, setChartData] = useState({
        datasets: []
    });

    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
       setChartData({
            labels: answerLabels,
            datasets: [
                {

                    data: answerCounts,
                    backgroundColor: ["hsla(4, 95%, 63%, .8)", "hsla(334, 63%, 55%, .8)", "hsla(317, 48%, 50%, .8)", "hsla(275, 54%, 53%, .8)", "hsla(252, 87%, 61%, .8)"],
                    borderColor: ["hsl(4, 95%, 63%)", "hsl(334, 63%, 55%)", "hsl(317, 48%, 50%)", "hsl(275, 54%, 53%)", "hsl(252, 87%, 61%)"],
                    borderWidth: 2,
                    borderRadius: 5,
                    categoryPercentage: .8,
                    barPercentage: .5,

                }
            ]
       });
       setChartOptions({
           responsive: true,
           plugins: {
               legend: {
                   display: false,
                   position: "bottom"
               },
               title: {
                   display: false,
                   text: survey.question,
                   font: {
                       size: 28,
                       family: "'Mukta', sans-serif",
                       weight: 400
                   },
                   color: '#333333',
                   align: 'start',
                   padding: {
                    top: 10,
                    bottom: 30
                }
               }
           }
        });
        }, [loading]);

    return (
        <>
            <div className='grey-layer-bg' onClick={props.handleClose}></div>
                <div className='pop-over-wrapper'>
                <div className="wrapper-content" id='add-survey-form'>
            <IconContext.Provider value={{ className: "go-back-button", size: 30 }}>
            <button id='close-add-survey-button' className='go-back-button' onClick={props.handleClose}><FiArrowLeftCircle /> Go back</button>
            </IconContext.Provider>

            <div className='chart-container'>
            <h2 className='interior'>{survey.question}</h2>
            <Bar
                options={chartOptions}
                data={chartData}
                />
            </div>
                
            </div>
            <img className='llama-watermark' src={LlamaGraphicSmall} alt="watermark of Llama" />
            </div>
        </>
    );
  };
  
  export default ViewData;