import { Task, ITask } from '../models/taskModel';

export class TaskRepository {
  async createTask(title: string, description: string, isDone: boolean, dueDate: Date): Promise<ITask> {
    const task = new Task({
      title,
      description,
      isDone: isDone, 
      dueDate: new Date(dueDate) 
    });
    await task.save();
    return task;
  }

  async getAllTasks(): Promise<ITask[]> {
    return Task.find();
  }

  async updateTask(taskId: string, taskData: { title?: string; description?: string; isDone?: boolean; dueDate?: Date }): Promise<ITask | null> {
    return Task.findByIdAndUpdate(taskId, taskData, { new: true }).exec();
  }

  async deleteTask(taskId: string): Promise<ITask | null> {
    return Task.findByIdAndDelete(taskId);
  }
}
