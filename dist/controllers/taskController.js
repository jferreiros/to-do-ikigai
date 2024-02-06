"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const taskService_1 = require("../services/taskService");
class TaskController {
    constructor() {
        this.taskService = new taskService_1.TaskService();
    }
    addTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description, isDone, dueDate } = req.body;
            try {
                const task = yield this.taskService.addTask(title, description, isDone, new Date(dueDate));
                req.app.get('io').emit('taskAdded', task); // Emit an event for real-time updates
                res.status(201).json(task);
            }
            catch (error) {
                console.error("Error adding task:", error);
                res.status(500).json({ message: 'Error adding task', error });
            }
        });
    }
    getTasks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tasks = yield this.taskService.getTasks();
                res.status(200).json(tasks);
            }
            catch (error) {
                console.error("Error fetching tasks:", error);
                res.status(500).json({ message: 'Error fetching tasks', error });
            }
        });
    }
    updateTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { taskId } = req.params;
            const { title, description, isDone, dueDate } = req.body;
            try {
                const task = yield this.taskService.updateTask(taskId, { title, description, isDone, dueDate });
                if (!task) {
                    return res.status(404).json({ message: 'Task not found' });
                }
                req.app.get('io').emit('taskUpdated', task); // Emit an event for real-time updates
                res.status(200).json(task);
            }
            catch (error) {
                console.error("Error updating task:", error);
                res.status(500).json({ message: 'Error updating task', error });
            }
        });
    }
    deleteTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { taskId } = req.params;
            try {
                const task = yield this.taskService.removeTask(taskId);
                if (!task) {
                    return res.status(404).json({ message: 'Task not found' });
                }
                req.app.get('io').emit('taskDeleted', taskId); // Emit an event for real-time updates
                res.status(204).send();
            }
            catch (error) {
                console.error("Error deleting task:", error);
                res.status(500).json({ message: 'Error deleting task', error });
            }
        });
    }
}
exports.TaskController = TaskController;
