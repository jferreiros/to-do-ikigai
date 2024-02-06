import { TaskRepository } from '../repositories/taskRepository';

export class TaskService {
  private taskRepository: TaskRepository;

  constructor() {
    this.taskRepository = new TaskRepository();
  }

  async addTask(title: string, description: string, isDone: boolean = false, dueDate: Date): Promise<any> {
    return this.taskRepository.createTask(title, description, isDone, dueDate);
  }

  async getTasks(): Promise<any[]> {
    return this.taskRepository.getAllTasks();
  }

  async updateTask(taskId: string, taskData: { title?: string; description?: string; isDone?: boolean; dueDate?: Date }): Promise<any> {
    return this.taskRepository.updateTask(taskId, taskData);
  }

  async removeTask(taskId: string): Promise<any> {
    return this.taskRepository.deleteTask(taskId);
  }
}
