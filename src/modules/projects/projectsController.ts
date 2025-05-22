import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { projectHelper } from './projectHelper';
import { projectService } from './projectsService';

const createProject = catchAsync(async (req, res) => {
    let imageUrl;
    if (req.file) {
        imageUrl = await projectHelper.handleImageUpload(
            req.file as Express.Multer.File,
        );
    }

    const project = await projectService.createProject({
        ...req.body,
        thumbnail: imageUrl,
    });

    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: 'Project created successfully!',
        data: project,
    });
});

const getAllProjects = catchAsync(async (req, res) => {
    const projects = await projectService.getAllProjects();

    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: 'Projects fetched successfully!',
        data: projects,
    });
});

const getProjectById = catchAsync(async (req, res) => {
    const { projectId } = req.params;

    const project = await projectService.getProjectById(projectId);

    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: 'Project fetched successfully!',
        data: project,
    });
});

const updateProjectById = catchAsync(async (req, res) => {
    const { projectId } = req.params;    

    let imageUrl;
    if (req.file) {
        imageUrl = await projectHelper.handleImageUpload(
            req.file as Express.Multer.File,
        );
    }

    const project = await projectService.updateProjectById(projectId, {
        ...req.body,
        thumbnail: imageUrl,
    });

    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: 'Project updated successfully!',
        data: project,
    });
});

const deleteProjectById = catchAsync(async (req, res) => {
    const { projectId } = req.params;

    await projectService.deleteProjectById(projectId);

    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: 'Project deleted successfully!',
    });
});

export const projectController = {
    createProject,
    getAllProjects,
    getProjectById,
    updateProjectById,
    deleteProjectById,
};
