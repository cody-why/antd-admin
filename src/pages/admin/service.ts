/**
 * @description: 菜单列表
 * @params {param} ListParam
 * @return {Promise}
 */
import {ajax, IResponse} from "../../api/ajax";

export const query_user_menu = (): Promise<IResponse> => {
    return ajax.get('admin/user/menu', {});
};

