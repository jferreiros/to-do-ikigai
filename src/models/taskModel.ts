import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description: string;
  isDone: boolean;
  dueDate: Date;
}

const taskSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  isDone: { type: Boolean, default: false },
  dueDate: { type: Date, required: true }
});

export const Task = mongoose.model<ITask>('Task', taskSchema);
