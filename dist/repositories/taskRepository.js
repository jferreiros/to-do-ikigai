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
exports.TaskRepository = void 0;
const taskModel_1 = require("../models/taskModel");
class TaskRepository {
    createTask(title, description, isDone, dueDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = new taskModel_1.Task({
                title,
                description,
                isDone: isDone,
                dueDate: new Date(dueDate)
            });
            yield task.save();
            return task;
        });
    }
    getAllTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            return taskModel_1.Task.find();
        });
    }
    updateTask(taskId, taskData) {
        return __awaiter(this, void 0, void 0, function* () {
            return taskModel_1.Task.findByIdAndUpdate(taskId, taskData, { new: true }).exec();
        });
    }
    deleteTask(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            return taskModel_1.Task.findByIdAndDelete(taskId);
        });
    }
}
exports.TaskRepository = TaskRepository;
