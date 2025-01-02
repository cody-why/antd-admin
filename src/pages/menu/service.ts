import {ajax, IResponse} from "../../api/ajax";
import {MenuVo, MenuListParam} from "./data";

/**
 * @description: 用户列表
 * @params {req} MenuListReq
 * @return {Promise}
 */
export const menuList = (req: MenuListParam): Promise<IResponse> => {
    return ajax.post('admin/menu/list', req)
};

/**
 * @description: 添加用户
 * @params {menu} Menu
 * @return {Promise}
 */
export const addMenu = (menu: MenuVo): Promise<IResponse> => {
    return ajax.post('admin/menu', menu)
};

/**
 * @description: 更新用户
 * @params {{menu} Menu
 * @return {Promise}
 */
export const updateMenu = (menu: MenuVo): Promise<IResponse> => {
    return ajax.put('admin/menu', menu)
};

/**
 * @description: 删除用户
 * @params {ids} number[]
 * @return {Promise}
 */
export const removeMenu = (ids: Number[]): Promise<IResponse> => {
    return ajax.delete('admin/menu', {data: { ids: ids }})
};

