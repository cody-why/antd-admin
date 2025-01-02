import {ajax, IResponse} from "../../api/ajax";
import {ILogin, IUser} from "./data";

/**
 * @description: 用户登录
 * @params {ILogin} params
 * @return {Promise}
 */
export const reqLogin = (params: ILogin): Promise<IResponse> => {
    return ajax.post('admin/login', params);
};

/**
 * @description: 通过id获取用户
 * @params {IUser} params
 * @return {Promise}
 */
export const getUserInfo = (params: IUser): Promise<IResponse> => {
    return ajax.post('user/getInfo', params);
};