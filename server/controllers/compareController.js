import Comparison from '../models/Comparison.js';
import axios from 'axios';

export const compare = async (req, res) => {
  const { text1, text2 } = req.body;
  console.log(text1, text2);

  const response = await axios.post(
    process.env.PYTHON_API_URL,
    { text1, text2 }
  );
  console.log(response);

  const similarityScore =
    response.data?.similarityScore || 0;

  await Comparison.create({
    text1,
    text2,
    similarityScore,
  });

  return res
    .status(200)
    .json({ similarityScore });
};

export const getAllCompares = async (
  req,
  res
) => {
  const data = await Comparison.find({}).sort({
    createdAt: -1,
  });
  return res.status(200).json({ compares: data });
};
