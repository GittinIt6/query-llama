import React from 'react';
import { useQuery } from '@apollo/client';
import QuestionCard from '../components/QuestionCard';




const Home = () => {


  return (
    <main>
      <section className='question-cards-container'>
      <QuestionCard />
      <QuestionCard />
      <QuestionCard />
      <QuestionCard />
      <QuestionCard />
      </section>
    </main>
  );
};

export default Home;
