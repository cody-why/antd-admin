export interface RoleListParam {
    page_no: number;
    page_size?: number;
    role_name?: string;
    status?: number;
}

export interface RoleVo {
    create_time: string;
    id: number;
    remark: string;
    role_name: string;
    status: number;
    update_time: string;
}

export interface RoleListSearch{
    role_name?: string;
    status?: number;
}

export const defaultRoleVo: RoleVo = {
    create_time: '',
    id: 0,
    remark: '',
    role_name: '',
    status: 0,
    update_time: '',
}