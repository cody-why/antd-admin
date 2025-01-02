import {ajax, IResponse} from "../../api/ajax";
import {UserVo, UserListParam, UpdateUserPasswordBody} from "./data";

/**
 * @description: 用户列表
 * @params {req} UserListReq
 * @return {Promise}
 */
export const userList = (req: UserListParam): Promise<IResponse> => {
    return ajax.post('admin/user/list', req)
};

/**
 * @description: 添加用户
 * @params {user} User
 * @return {Promise}
 */
export const addUser = (user: UserVo): Promise<IResponse> => {
    return ajax.post('admin/user', user)
};

/**
 * @description: 更新用户
 * @params {{user} User
 * @return {Promise}
 */
export const updateUser = (user: UserVo): Promise<IResponse> => {
    return ajax.put('admin/user', user)
};

/**
 * @description: 删除用户
 * @params {ids} number[]
 * @return {Promise}
 */
export const removeUser = (ids: Number[]): Promise<IResponse> => {
    return ajax.delete('admin/user', {data:{ids: ids}})
};

/**
 * @description: 查询用户角色
 * @params {ids} number[]
 * @return {Promise}
 */
export const query_user_role = (user_id: Number): Promise<IResponse> => {
    return ajax.post('admin/user/role', {user_id: user_id})
};

/**
 * @description: 更新用户角色
 * @params {ids} number[]
 * @return {Promise}
 */
export const update_user_role = (user_id: Number, role_ids: Number[]): Promise<IResponse> => {
    return ajax.put('admin/user/role', {user_id: user_id, role_ids: role_ids})
};


/**
 * @description: 重置用户密码
 * @params {user_id} number
 * @return {Promise}
 */
export const reset_user_password = (user_id: Number): Promise<IResponse> => {
    return ajax.put('admin/user/reset_password', {user_id: user_id})
};

/**
 * @description: 修改用户密码
 * @params {user_id} number
 * @return {Promise}
 */
export const update_user_password = (vo: UpdateUserPasswordBody): Promise<IResponse> => {
    return ajax.put('admin/user_password', vo)
}