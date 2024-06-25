import {axiosInstance, IResponse} from "../../api/ajax";
import {UserVo, UserListParam} from "./data";

/**
 * @description: 用户列表
 * @params {req} UserListReq
 * @return {Promise}
 */
export const userList = (req: UserListParam): Promise<IResponse> => {
    return axiosInstance.post('admin/user_list', req).then(res => res.data);
};

/**
 * @description: 添加用户
 * @params {user} User
 * @return {Promise}
 */
export const addUser = (user: UserVo): Promise<IResponse> => {
    return axiosInstance.post('admin/user_save', user).then(res => res.data);
};

/**
 * @description: 更新用户
 * @params {{user} User
 * @return {Promise}
 */
export const updateUser = (user: UserVo): Promise<IResponse> => {
    return axiosInstance.post('admin/user_update', user).then(res => res.data);
};

/**
 * @description: 删除用户
 * @params {ids} number[]
 * @return {Promise}
 */
export const removeUser = (ids: Number[]): Promise<IResponse> => {
    return axiosInstance.post('admin/user_delete', {ids: ids}).then(res => res.data);
};

/**
 * @description: 查询用户角色
 * @params {ids} number[]
 * @return {Promise}
 */
export const query_user_role = (user_id: Number): Promise<IResponse> => {
    return axiosInstance.post('admin/query_user_role', {user_id: user_id}).then(res => res.data);
};

/**
 * @description: 更新用户角色
 * @params {ids} number[]
 * @return {Promise}
 */
export const update_user_role = (user_id: Number, role_ids: Number[]): Promise<IResponse> => {
    return axiosInstance.post('admin/update_user_role', {user_id: user_id, role_ids: role_ids}).then(res => res.data);
};
