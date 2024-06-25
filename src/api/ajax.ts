import axios, {AxiosInstance, AxiosResponse} from 'axios';

import {showMessage} from "./status";
import {message} from 'antd';
import {storageUtils} from "../utils/storageUtils";
import { t } from 'i18next';


// 返回res.data的interface
export interface IResponse {
    code: number | string;
    data: any;
    msg: string;
    total: number
}

export const axiosInstance: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    },
    timeout: 10000,
});

// axios实例拦截响应
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        // 刷新token
        // console.log('response headers', response.headers);
        const token = response.headers['authorization'];
        if (token) {
            // console.log('authorization: ', token);
            const tokenStr = token.replace('Bearer ', '');
            storageUtils.saveToken(tokenStr);
        }
        if (response.status === 200) {
            return response;
        } else {
            showMessage(response.status);
            return response;
        }
    },
    // 请求失败
    (error: any) => {
        // console.log(error);
        const {response} = error;
        if (response) {
            // console.log(response);
            // 请求已发出，但是不在2xx的范围
            showMessage(response.status);
            if (response.status === 401) {
                storageUtils.logout()
                setTimeout(() => {
                    let redirectUrl = process.env.REACT_APP_BASENAME+"/login";
                    window.location.href = redirectUrl;
                }, 1000);
                
            }
            return {data:{}}
            // return Promise.reject(response.message);
            
        } else {
            message.error(t('message.network-error'));
            return {data:{}}
            // return Promise.reject("Network Error");
        }
    }
);

// axios实例拦截请求
axiosInstance.interceptors.request.use(
    (config: any) => {//AxiosRequestConfig
        const token = storageUtils.getToken()
        if (token) {
            // @ts-ignore
            config.headers.Authorization = `Bearer ${token}`
        }

        return config;
    },
    (error: any) => {
        return Promise.reject(error);
    }
)



/**
 * 统一处理
 * @param resp
 */
export const handleResp = (resp: IResponse): boolean => {
    // resp.code === 0 ? message.success(resp.msg) : message.error(resp.msg);
    if (resp.code === 0) {
        message.success(resp.msg);
    } else {
        if (resp.msg) {
            message.error(resp.msg);
        }
    }
    return resp.code === 0
};