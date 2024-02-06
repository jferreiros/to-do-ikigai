import express from 'express';
import { TaskController } from './controllers/taskController';

const router = express.Router();
const taskController = new TaskController();

router.post('/tasks', (req, res) => taskController.addTask(req, res));
router.get('/tasks', (req, res) => taskController.getTasks(req, res));
router.put('/tasks/:taskId', (req, res) => taskController.updateTask(req, res));
router.delete('/tasks/:taskId', (req, res) => taskController.deleteTask(req, res));

export default router;
