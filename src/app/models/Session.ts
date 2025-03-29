import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ISession extends Document {
  exercise: string;
  weight: string;
  reps: string;
  sets: string;
  volume: number;
  date: string;
  templateId?: Types.ObjectId;
}

const schema: Schema = new mongoose.Schema(
  {
    exercise: {
      type: String,
    },
    weight: {
      type: String,
    },
    reps: {
      type: String,
    },
    sets: {
      type: String,
    },
    volume: {
      type: Number,
    },
    date: {
      type: String,
    },
    templateId: { type: Schema.Types.ObjectId, ref: 'Template' },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

const Session =
  mongoose.models.Session || mongoose.model<ISession>('Session', schema);

export default Session;
