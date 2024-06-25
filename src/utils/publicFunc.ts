import routes from '@/router'
// 菜单数据结构
interface MenuItem {
    id: number;
    parent_id: number;
    name: string;
    path: string;
    api_url: string;
    menu_type: number;
    icon: string;
    children?: MenuItem[];
}
// 路由对应菜单及面包屑值
interface MenuItemWithPath {
    menuItem: MenuItem | undefined;
    names: string[];
}
/**
 * 根据路由地址（不带参数）获取对应菜单及面包屑值
 * @param {String} path 路由地址（不带参数）
 * @param {MenuItem[]} menuList 菜单列表
 * @return {MenuItemWithPath} 路由对应菜单及面包屑值
 * */
export const getMenuItemFromPath = (path: string, menuList: MenuItem[]): MenuItemWithPath => {
    let result: MenuItemWithPath = {
        menuItem: undefined,
        names: []
    };
    function findRecursive(path: string, menuList: MenuItem[]): MenuItem | undefined {
        for (const item of menuList) {
            if (item.path === path) {
                return item;
            }
            if (item.children) {
                const found = findRecursive(path, item.children);
                if (found) {
                    return found;
                }
            }
        }
        return undefined;
    }

    const foundItem = findRecursive(path, menuList);

    if (foundItem) {
        result.menuItem = foundItem;
        let currentItem: MenuItem | undefined = foundItem;
        while (currentItem) {
            result.names.unshift(currentItem.name);
            const parentId: number = currentItem.parent_id;
            currentItem = parentId !== 0 ? menuList.find(item => item.id === parentId) : undefined;
        }
    }
    return result;
}
/**
 * 根据路由地址（不带参数）获取对应路由对象
 * @param {string} path 路由地址（不带参数）
 * @return {Object} 路由对象
 * */
export const getRoutesElement = (path: string) => {
    const curRoute = routes.filter(
        (item: { path: string | string[] }) => item.path.includes(path)
    )
    return curRoute[0]
}
