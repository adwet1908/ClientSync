import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/project.controller.js";
import express from 'express'; 

const projectRouter = express.Router();

projectRouter.post('/create', createProject);
projectRouter.get('/all', getAllProjects);
projectRouter.get('/:id', getProjectById);
projectRouter.put('/update/:id', updateProject);
projectRouter.delete('/delete/:id', deleteProject);

export default projectRouter;