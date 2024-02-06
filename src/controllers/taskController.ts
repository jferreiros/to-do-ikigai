import { Request, Response } from 'express';
import { TaskService } from '../services/taskService';

export class TaskController {
  private taskService: TaskService;

  constructor() {
    this.taskService = new TaskService();
  }

  async addTask(req: Request, res: Response) {
    const { title, description, isDone, dueDate } = req.body;
    try {
      const task = await this.taskService.addTask(title, description, isDone, new Date(dueDate));
      req.app.get('io').emit('taskAdded', task); 
      res.status(201).json(task);
    } catch (error) {
      console.error("Error adding task:", error);
      res.status(500).json({ message: 'Error adding task', error });
    }
  }

  async getTasks(req: Request, res: Response) {
    try {
      const tasks = await this.taskService.getTasks();
      res.status(200).json(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ message: 'Error fetching tasks', error });
    }
  }

  async updateTask(req: Request, res: Response) {
    const { taskId } = req.params;
    const { title, description, isDone, dueDate } = req.body;
  
    try {
      const task = await this.taskService.updateTask(taskId, { title, description, isDone, dueDate });
  
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      req.app.get('io').emit('taskUpdated', task); 
      res.status(200).json(task);
    } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).json({ message: 'Error updating task', error });
    }
  }

  async deleteTask(req: Request, res: Response) {
    const { taskId } = req.params;
    try {
      const task = await this.taskService.removeTask(taskId);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      req.app.get('io').emit('taskDeleted', taskId); 
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).json({ message: 'Error deleting task', error });
    }
  }
}
