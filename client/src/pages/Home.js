import React from 'react';
import { useQuery } from '@apollo/client';

import SurveyCards from '../components/SurveyCards';
// Import the query we are going to execute from its file
import { QUERY_SURVEYS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_SURVEYS);

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

    </main>
  );
};

export default Home;