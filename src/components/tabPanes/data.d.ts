// 单个页签数据类型
export interface PanesTab {
    key: string, // 对应 activeKey（路由路径(pathname)，不带参数）
    path: string, // 路由（完整路径，带参数的）
    label: string, // 选项卡头显示文字
    closable: boolean // 是否显示选项卡的关闭按钮
}