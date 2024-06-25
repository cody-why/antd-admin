/**
 * @description: 菜单列表
 * @params {param} ListParam
 * @return {Promise}
 */
import {axiosInstance, IResponse} from "../../api/ajax";

export const query_user_menu = (): Promise<IResponse> => {
    return axiosInstance.get('admin/query_user_menu', {}).then(res => res.data);
};

