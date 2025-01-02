import {ajax, IResponse} from "../../api/ajax";
import {RoleVo, RoleListParam} from "./data";

/**
 * @description: 角色列表
 * @params {req} RoleListParam
 * @return {Promise}
 */
export const roleList = (req: RoleListParam): Promise<IResponse> => {
    return ajax.post('admin/role/list', req)
};

/**
 * @description: 添加角色
 * @params {role} RoleVo
 * @return {Promise}
 */
export const addRole = (role: RoleVo): Promise<IResponse> => {
    return ajax.post('admin/role', role)
};

/**
 * @description: 更新角色
 * @params {{role} RoleVo
 * @return {Promise}
 */
export const updateRole = (role: RoleVo): Promise<IResponse> => {
    return ajax.put('admin/role', role)
};

/**
 * @description: 删除角色
 * @params {ids} number[]
 * @return {Promise}
 */
export const removeRole = (ids: Number[]): Promise<IResponse> => {
    return ajax.delete('admin/role', { data: { ids: ids } })
};

/**
 * @description: 查询角色菜单
 * @params {ids} number[]
 * @return {Promise}
 */
export const query_role_menu = (role_id: Number): Promise<IResponse> => {
    return ajax.post('admin/role/menu', {role_id: role_id})
};

/**
 * @description: 更新角色菜单
 * @params {ids} number[]
 * @return {Promise}
 */
export const update_role_menu = (role_id: Number, menu_ids: Number[]): Promise<IResponse> => {
    return ajax.put('admin/role/menu', {role_id: role_id, menu_ids: menu_ids})
};
