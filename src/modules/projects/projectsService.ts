import status from 'http-status';
import { Project } from '../../../generated/prisma';
import AppError from '../../errors/AppError';
import prisma from '../../utils/prisma';

const createProject = async (payload: Project) => {
    const project = await prisma.project.create({
        data: payload,
    });

    return project;
};

const getAllProjects = async () => {
    const projects = await prisma.project.findMany();
    return projects;
};

const getProjectById = async (projectId: string) => {
    const project = await prisma.project.findUnique({
        where: {
            id: projectId,
        },
    });

    if (!project) {
        throw new AppError(status.NOT_FOUND, 'Project not found!');
    }
    return project;
};

const updateProjectById = async (
    projectId: string,
    payload: Partial<Project>,
) => {
    const project = await prisma.project.findUnique({
        where: {
            id: projectId,
        },
    });

    if (!project) {
        throw new AppError(status.NOT_FOUND, 'Project not found!');
    }

    const updatedProject = await prisma.project.update({
        where: {
            id: projectId,
        },
        data: payload,
    });

    return updatedProject;
};

const deleteProjectById = async (projectId: string) => {
    const project = await prisma.project.findUnique({
        where: {
            id: projectId,
        },
    });

    if (!project) {
        throw new AppError(status.NOT_FOUND, 'Project not found!');
    }
    
    await prisma.project.delete({
        where: {
            id: projectId,
        },
    });

    return;
};

export const projectService = {
    createProject,
    getAllProjects,
    getProjectById,
    updateProjectById,
    deleteProjectById,
};
