import mongoose, { Schema, type Document } from 'mongoose';

export interface IActivity extends Document {
  userId: mongoose.Types.ObjectId;
  type: 'running' | 'walking' | 'strength';
  duration: number;
  distance?: number;
  notes?: string;
  createdAt: Date;
}

const activitySchema = new Schema<IActivity>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: {
    type: String,
    enum: ['running', 'walking', 'strength'],
    required: true,
  },
  duration: { type: Number, required: true, min: 1 },
  distance: { type: Number, min: 0 },
  notes: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now },
});

export const Activity = mongoose.model<IActivity>('Activity', activitySchema);
