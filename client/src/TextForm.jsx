import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const TextForm = ({ refetchData }) => {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [similarity, setSimilarity] =
    useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        'https://ai-based-text-similarity-app.onrender.com/compare',
        {
          text1,
          text2,
        }
      );
      console.log(response.data);
      setSimilarity(
        response.data.similarityScore
      );

      refetchData();
    } catch (err) {
      setError('Error fetching similarity score');
    }

    setLoading(false);
  };

  return (
    <Wrapper>
      <h1>Text Similarity Checker</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Enter first text"
          value={text1}
          onChange={e => setText1(e.target.value)}
          required
        />
        <textarea
          placeholder="Enter second text"
          value={text2}
          onChange={e => setText2(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Comparing...' : 'Compare'}
        </button>
      </form>
      {similarity !== null && (
        <p className="result">
          Similarity Score:{' '}
          <strong>{similarity.toFixed(2)}</strong>
        </p>
      )}
      {error && <p className="error">{error}</p>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 500px;
  padding: 3rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  text-align: center;

  h1 {
    font-size: 22px;
    margin-bottom: 20px;
    letter-spacing: 1px;
  }

  textarea {
    width: 100%;
    height: 75px;
    margin-bottom: 10px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }

  button {
    margin-top: 20px;
    width: 100%;
    padding: 10px;
    border: none;
    background: #007bff;
    color: white;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
  }

  button:disabled {
    background: #ccc;
  }

  .result {
    margin-top: 20px;
    font-size: 18px;
    color: green;
  }

  .error {
    margin-top: 10px;
    color: red;
  }
`;

export default TextForm;
