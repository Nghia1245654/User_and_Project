import * as userService from '../services/userService.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const create = async (req, res) => {
  try {
    console.log('Request body:', req.body); // Debug log
    const newUser = await userService.createUser(req.body);
    return successResponse(res, 'Tạo người dùng thành công', newUser, 201);
  } catch (err) {
    console.error('Error creating user:', err); // Debug log
    return errorResponse(res, `Lỗi tạo người dùng: ${err.message}`, 500, 'CREATE_USER_FAILED');
  }
};

export const getAll = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    return successResponse(res, 'Lấy danh sách người dùng thành công', users);
  } catch (err) {
    console.error('Error getting users:', err); // Debug log
    return errorResponse(res, `Lỗi hệ thống: ${err.message}`, 500, 'GET_USERS_FAILED');
  }
};

export const getDetail = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return errorResponse(res, 'Không tìm thấy người dùng', 404, 'USER_NOT_FOUND');
    return successResponse(res, 'Lấy chi tiết thành công', user);
  } catch (err) {
    return errorResponse(res, 'Lỗi hệ thống', 500, 'GET_USER_FAILED');
  }
};
export const update = async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    if (!updatedUser) return errorResponse(res, 'Không tìm thấy người dùng', 404, 'USER_NOT_FOUND');
    return successResponse(res, 'Cập nhật người dùng thành công', updatedUser);
  } catch (err) {
    return errorResponse(res, 'Lỗi hệ thống', 500, 'UPDATE_USER_FAILED');
  }
};
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await userService.deleteUser(req.params.id);
    if (!deletedUser) return errorResponse(res, 'Không tìm thấy người dùng', 404, 'USER_NOT_FOUND');
    return successResponse(res, 'Xóa người dùng thành công', deletedUser);
  } catch (err) {
    return errorResponse(res, 'Lỗi hệ thống', 500, 'DELETE_USER_FAILED');
  }
};