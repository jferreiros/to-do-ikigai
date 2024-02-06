"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taskController_1 = require("./controllers/taskController");
const router = express_1.default.Router();
const taskController = new taskController_1.TaskController();
router.post('/tasks', (req, res) => taskController.addTask(req, res));
router.get('/tasks', (req, res) => taskController.getTasks(req, res));
router.put('/tasks/:taskId', (req, res) => taskController.updateTask(req, res));
router.delete('/tasks/:taskId', (req, res) => taskController.deleteTask(req, res));
exports.default = router;
