import mongoose, { Schema, Document } from 'mongoose';

type TCompany = {
  name: string;
  type: 'Electronics' | 'Finance' | 'Agriculture';
};

export type TPractice = Document & {
  name: {
    firstName: string;
    lastName: string;
  };
  age: number;
  score: number;
  companies: TCompany[];
  marks: number[];
  role: string;
  extra: string;
};

const companySchema = new Schema<TCompany>({
  name: String,
  type: {
    type: String,
    enum: ['Electronics', 'Finance', 'Agriculture'],
  },
});

const practiceSchema = new Schema<TPractice>({
  name: {
    firstName: String,
    lastName: String,
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    trim: true,
    unique: true,
    max: [50, 'Age must be less than 50'],
  },
  score: {
    type: Number,
    required: [true, 'Score is required'],
    trim: true,
    unique: true,
    max: [10, 'Score must be less than 10'],
  },
  companies: [companySchema],
  marks: [Number],
  role: {
    type: String,
    unique: true,
  },
  extra: String,
});

const Practice = mongoose.model<TPractice>('practice', practiceSchema);
export default Practice;
