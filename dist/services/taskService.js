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
exports.TaskService = void 0;
const taskRepository_1 = require("../repositories/taskRepository");
class TaskService {
    constructor() {
        this.taskRepository = new taskRepository_1.TaskRepository();
    }
    addTask(title, description, isDone = false, dueDate) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.taskRepository.createTask(title, description, isDone, dueDate);
        });
    }
    getTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.taskRepository.getAllTasks();
        });
    }
    updateTask(taskId, taskData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.taskRepository.updateTask(taskId, taskData);
        });
    }
    removeTask(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.taskRepository.deleteTask(taskId);
        });
    }
}
exports.TaskService = TaskService;
