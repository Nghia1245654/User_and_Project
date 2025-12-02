
import Project from "../models/projectModel.js";
export const createProject = async (data) => {
  return await Project.create(data);
};
export const getAllProjects = async (ownerId) => {
    return await Project.find({ owner: ownerId }).populate('owner', 'name email');
};
export const getProjectById = async (id) => {
    return await Project.findById(id).populate('owner', 'name email');
};
export const updateProject = async (id, data) => {   
    return await Project.findByIdAndUpdate(id, data, { new: true });
};
export const deleteProject = async (id) => {
    return await Project.findByIdAndDelete(id);
};