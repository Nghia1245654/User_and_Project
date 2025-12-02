import * as projectService from "../services/projectService.js";
import * as userService from "../services/userService.js";
import { successResponse, errorResponse } from "../utils/response.js";

export const create = async (req, res) => {
  try {
    console.log('Request body:', req.body); // Debug log
    
    // Kiểm tra owner có tồn tại trong database không
    if (!req.body.owner) {
      return errorResponse(res, "Owner là bắt buộc", 400, "OWNER_REQUIRED");
    }

    const ownerExists = await userService.getUserById(req.body.owner);
    if (!ownerExists) {
      return errorResponse(res, "Owner không tồn tại trong hệ thống", 400, "OWNER_NOT_EXISTS");
    }

    const newProject = await projectService.createProject(req.body);
    return successResponse(res, "Tạo dự án thành công", newProject, 201);
  } catch (err) {
    console.errorResponse('Error creating project:', err); // Debug log
    return errorResponse(res, `Lỗi tạo dự án: ${err.message}`, 500, "CREATE_PROJECT_FAILED");
  }
};

export const getAll = async (req, res) => {
  try {
    const projects = await projectService.getAllProjects();
    return successResponse(res, "Lấy danh sách dự án thành công", projects);
  } catch (err) {
    return errorResponse(res, "Lỗi hệ thống", 500, "GET_PROJECTS_FAILED");
  }
};

export const getDetail = async (req, res) => {
  try {
    const project = await projectService.getProjectById(req.params.id);
    if (!project)
      return errorResponse(res, "Không tìm thấy dự án", 404, "PROJECT_NOT_FOUND");
    return successResponse(res, "Lấy chi tiết thành công", project);
  } catch (err) {
    return errorResponse(res, "Lỗi hệ thống", 500, "GET_PROJECT_FAILED");
  }
};
export const update = async (req, res) => {
  try {
    const updatedProject = await projectService.updateProject(
      req.params.id,
      req.body
    );
    if (!updatedProject)
      return errorResponse(res, "Không tìm thấy dự án", 404, "PROJECT_NOT_FOUND");
    return successResponse(res, "Cập nhật dự án thành công", updatedProject);
  } catch (err) {
    return errorResponse(res, "Lỗi hệ thống", 500, "UPDATE_PROJECT_FAILED");
  }
};
export const deleteProject = async (req, res) => {
  try {
    const deletedProject = await projectService.deleteProject(req.params.id);
    if (!deletedProject)
      return errorResponse(res, "Không tìm thấy dự án", 404, "PROJECT_NOT_FOUND");
    return successResponse(res, "Xóa dự án thành công", deletedProject);
  } catch (err) {
    return errorResponse(res, "Lỗi hệ thống", 500, "DELETE_PROJECT_FAILED");
  }
};
