
export interface UserListParam {
    page_no: number;
    page_size?: number;
    mobile?: string;
    status?: number;
}

export interface UserVo {
    create_time: string;
    id: number;
    mobile: string;
    user_name: string;
    remark: string;
    status: number;
    update_time: string;
}

export interface UserListSearch {
    mobile?: string;
    status?: number;
}

export const defaultUserVo: UserVo = {
    create_time: '',
    id: 0,
    mobile: '',
    user_name: '',
    remark: '',
    status: 0,
    update_time: '',
}

export interface UpdateUserPasswordBody {
    username: string;
    password: string;
    new_password: string;
    code: string;
}