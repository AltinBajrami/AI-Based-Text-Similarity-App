import { useEffect, useState } from 'react';
import axios from 'axios';
import TextForm from './TextForm';
import AllSimilarity from './AllSimilarity';
import styled from 'styled-components';

function App() {
  const [
    similarityResults,
    setSimilarityResults,
  ] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] =
    useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const response = await axios(
          'https://ai-based-text-similarity-app.onrender.com/compare/all'
        );
        setSimilarityResults(
          response.data?.compares || []
        );
      } catch (error) {
        console.error(
          'Error fetching similarity results:',
          error
        );
      }
      setIsLoading(false);
    };

    fetchResults();
  }, [refresh]);

  const refetchData = () =>
    setRefresh(prev => !prev);

  return (
    <Wrapper>
      <TextForm refetchData={refetchData} />
      <AllSimilarity
        results={similarityResults}
        isLoading={isLoading}
      />
    </Wrapper>
  );
}

const Wrapper = styled.main`
  margin-top: 5rem;
  @media (min-width: 800px) {
    display: grid;
    grid-template-columns: auto auto;
    justify-content: center;
    gap: 2rem;
  }
`;

export default App;
