import React from "react";

export interface UserListParam {
    pageNo: number;
    pageSize?: number;
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
