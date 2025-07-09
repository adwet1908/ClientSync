import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/project.controller.js";
import express from 'express'; 
import verifyToken from "../middleware/verifyToken.js";
import isAdmin from "../middleware/isAdmin.js";

const projectRouter = express.Router();

projectRouter.post('/create',verifyToken, isAdmin, createProject);
projectRouter.get('/all',verifyToken, isAdmin, getAllProjects);
projectRouter.get('/:id',verifyToken, isAdmin, getProjectById);
projectRouter.put('/update/:id',verifyToken, isAdmin, updateProject);
projectRouter.delete('/delete/:id',verifyToken, isAdmin, deleteProject);
export default projectRouter;