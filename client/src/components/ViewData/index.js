import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { IconContext } from 'react-icons/lib';
import { FiArrowLeftCircle } from "react-icons/fi";
import { Chart as ChartJS,
         CategoryScale,
         LinearScale,
         BarElement,
         ArcElement,
         Title,
         Tooltip,
         Legend } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2'; 

import LlamaGraphicSmall from '../../images/llama-graphic-sm.svg'
import { QUERY_SINGLE_SURVEY } from '../../utils/queries';

ChartJS.register(
    CategoryScale,
         LinearScale,
         BarElement,
         ArcElement,
         Title,
         Tooltip,
         Legend
)

const ViewData = (props) => {
    const { loading, data } = useQuery(QUERY_SINGLE_SURVEY, {
        variables: { surveyId : props.id },
        pollInterval:4000,
    });

    if (loading) {console.log('loading')};
    let survey = data?.survey || [];
    let answers;
    let answerLabels = [];
    let answerCounts = [];
    let answerDataMobile;
    let answerOptionsMobile;
    // const emptyFunction = async () => {
    //     return;
    // }

    const [timerSetting, setTimer] = useState(false);
    const [chartData, setChartData] = useState({
        datasets: []
    });
    const [chartOptions, setChartOptions] = useState({});

    const setAllTheData = async () =>{
        // console.log('setAllTheData Called');
        answerLabels = [];
        answerCounts = [];
        // console.log(survey.upvotes);

    if (survey.answers && survey.answers.length > 0) {
        for (let i = 0; i < survey.answers.length; i++) {
            answerLabels.push(survey.answers[i].answerText);
            answerCounts.push(survey.answers[i].voteCount);
        }    
    } else {
        answers = <p>There are no answers!</p>
    }
    // console.log(answers);
    // const waiting = await emptyFunction();
    answerDataMobile = {
        labels: answerLabels,
        datasets: [{
          label: 'Query Responses',
          data: answerCounts,
          backgroundColor: ["hsla(4, 95%, 63%, .8)", "hsla(334, 63%, 55%, .8)", "hsla(317, 48%, 50%, .8)", "hsla(275, 54%, 53%, .8)", "hsla(252, 87%, 61%, .8)"],
          borderColor: ["hsl(4, 95%, 63%)", "hsl(334, 63%, 55%)", "hsl(317, 48%, 50%)", "hsl(275, 54%, 53%)", "hsl(252, 87%, 61%)"],
          hoverOffset: 4,
        }]
      };

    answerOptionsMobile = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "top"
            },
            title: {
                display: true,
                text: "Query Responses",
                font: {
                    size: 28,
                    family: "'Mukta', sans-serif",
                    weight: 400
                },
                align: 'start',
                color: '#333333',
                padding: {
                    top: 10,
                    bottom: 20
                }
            }
        }
    }

    // console.log(`data is set`);
    return;
    };

    setAllTheData();


    // Dougnut Chart for Popularity - Static data - no useState/useEffect
    const popularityData = {
        labels: [
          'Likes',
          'Dislikes',
        ],
        datasets: [{
          label: 'Popularity',
          data: [survey.upvotes, survey.downvotes],
          backgroundColor: [
            '#A896FB',
            '#FFBE76',
          ],
          hoverOffset: 4,
          barThickness: .1
        }]
      };

    const popularityOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "top"
            },
            title: {
                display: true,
                text: "Query Popularity",
                font: {
                    size: 28,
                    family: "'Mukta', sans-serif",
                    weight: 400
                },
                align: 'start',
                color: '#333333',
                padding: {
                    top: 10,
                    bottom: 20
                }
            }
        }
     }


    // Mobile rendering of response data - Doughnut preferrable to bar at this size
    // Data is static (no useState, no useEffect)

     // Managing display of doughnut versus bar chart with useState and useEffect

     const [viewportIsMobile, setMobileViewport] = useState(false);

     useEffect(() => {
        function handleResize() {
          setMobileViewport(window.innerWidth < 640);
        }
    
        window.addEventListener("resize", handleResize);
    
        handleResize();
    
        return () => window.removeEventListener("resize", handleResize);
      }, []);


    // Desktop bar chart for Survey Response data
    // This is using useState and useEffect but is a little wonky

    

    useEffect(() => {
        const waitFunc = async() =>{
        await setAllTheData();
        console.log(`rendering chart`);
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
                   display: true,
                   text: "Query Responses",
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
        console.log(`updated chart`);
    }
    
        waitFunc();

        setTimeout(async() => {
            console.log(`setting timer`);
            // await setAllTheData();
            timerSetting ? setTimer(false) : setTimer(true);
        }, 6000);

    }, [timerSetting]);



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
            <div className='doughnut-chart-container'>
            <Doughnut data={popularityData} options={popularityOptions} />
            </div>
            
            {viewportIsMobile ? (
                <div className='doughnut-chart-container'>
                 <Doughnut data={answerDataMobile} options={answerOptionsMobile} />
                 </div>
            ) : (
                <div className="bar-chart-container">
                <Bar
                options={chartOptions}
                data={chartData}
                />
                 </div>
            )}
            </div>
            </div>
            <img id='data-viz-llama' className='llama-watermark' src={LlamaGraphicSmall} alt="watermark of Llama" />
            </div>
        </>
    );
};
  
  export default ViewData;