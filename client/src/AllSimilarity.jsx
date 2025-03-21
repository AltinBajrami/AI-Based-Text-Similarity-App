import React, {
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import axios from 'axios';
const AllSimilarity = ({
  results,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <Wrapper>
        <h2>All Similarity Results</h2>
        <div className="loading"></div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h2>All Similarity Results</h2>
      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ul className="data-list">
          {results.map((result, index) => (
            <li key={index}>
              <p>
                <strong> Text 1: </strong>{' '}
                {result.text1}
              </p>
              <p>
                <strong> Text 2:</strong>
                {result.text2}
              </p>
              <strong>Similarity Score:</strong>
              {result.similarityScore.toFixed(2)}
            </li>
          ))}
        </ul>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  justify-self: center;
  .data-list {
    display: grid;
    max-height: 400px;
    overflow-y: auto;
    padding: 10px;
    li {
      width: fit-content;
      display: flex;
      gap: 10px;
      padding-bottom: 5px;
      margin-bottom: 25px;
      border-bottom: 1px solid #ccc;
      align-items: center;
      p {
        max-width: 13rem;
        overflow-y: auto;
      }
    }
  }
  h2 {
    font-size: 22px;
    margin-bottom: 20px;
    letter-spacing: 1px;
  }
  .loading {
    width: 50px;
    height: 50px;
    border: 5px solid #f3f3f3;
    border-top: 5px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 20px auto;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
export default AllSimilarity;
