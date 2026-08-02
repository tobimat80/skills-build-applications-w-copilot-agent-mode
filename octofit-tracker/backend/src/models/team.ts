import mongoose, { Schema, type Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  members: mongoose.Types.ObjectId[];
  points: number;
  createdAt: Date;
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true, trim: true, unique: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  points: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export const Team = mongoose.model<ITeam>('Team', teamSchema);
