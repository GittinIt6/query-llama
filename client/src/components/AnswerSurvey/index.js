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
import { ANSWER_UP } from '../../utils/mutations';
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
        variables: { surveyId : props.id }
    });
    const [disable, setDisable] = useState(false);
    const [answerUp, { error }] = useMutation(ANSWER_UP);

    const survey = data?.survey || [];

    let answers;
    let answerLabels = [];
    let answerCounts = [];

    if (survey.answers && survey.answers.length > 0) {
            answers = survey.answers.map((answer) => 
            <div key={answer._id} className='answer-option-wrapper'>
            <input name={answer._id} type="checkbox" />
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

    const handleAnswerUp = async (id,answerId) => {
        await answerUp({
            variables: {
              surveyId: id,
              answerId: answerId
            }
          });
    }

    const handleSubmit = async (event) => {

        let checkedAnswers = document.querySelectorAll('input[type="checkbox"]:checked');
        for (let i = 0; i < checkedAnswers.length; i++) {
            await handleAnswerUp(props.id,checkedAnswers[i].name)
        }

        let allCheckBoxes = document.querySelectorAll('input[type="checkbox"]');
        for (let index = 0; index < allCheckBoxes.length; index++) {
            allCheckBoxes[index].disabled = true;
        }

        setDisable(true); //disable button and change text to gray
        document.querySelector('[name="submit-answer"]').style.color = "gray";
    }
    // console.log(answerCounts);

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
        }, [loading, disable]);


    return (
        <>
            <div className='grey-layer-bg'></div>
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

            <div className='answer-survey-content'>
            <h2 className='interior'>{survey.question}</h2>
            <ul className='answer-options-list'>
                {answers}
            </ul>
            <IconContext.Provider value={{ className: "go-forward-button", size: 24 }}>
                <button className="primary-button" disabled={disable} name="submit-answer" onClick={handleSubmit} type="submit">
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