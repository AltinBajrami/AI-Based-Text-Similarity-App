import mongoose from 'mongoose';

const ComparisonSchema = new mongoose.Schema({
  text1: String,
  text2: String,
  similarityScore: Number,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model(
  'ComparisonData',
  ComparisonSchema
);
