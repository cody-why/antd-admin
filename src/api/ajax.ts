import axios, {AxiosInstance, AxiosResponse} from 'axios';

import {showStatusMessage} from "./status";
import {storageUtils} from "../utils/storageUtils";
import { t } from 'i18next';
import { message } from '@/App';

// 返回res.data的interface
export interface IResponse {
    code: number | string;
    data: any;
    msg: string;
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
            showStatusMessage(response.status);
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
            showStatusMessage(response.status);
            if (response.status === 401) {
                storageUtils.logout()
                setTimeout(() => {
                    let base = process.env.REACT_APP_BASENAME;
                    base = base? base: "/";
                    if (!base.endsWith("/")) {
                        base = base + "/";
                    }
                    window.location.href = base+"login";
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
        config.headers.lang = storageUtils.getI18n()
        config.headers.timestamp = new Date().getTime()
        return config;
    },
    (error: any) => {
        return Promise.reject(error);
    }
)

const showMessage = (resp: IResponse) => {
    if (resp.msg) {
        resp.code === 0 ? message.success(resp.msg) : message.error(resp.msg)
    }
    
}

// 封装axios实例, 方便调用, 如: ajax.post('/api/login', data)
export interface Ajax {
    get: (url: string, config?: any) => Promise<IResponse>;
    post: (url: string, data: any, config?: any) => Promise<IResponse>;
    put: (url: string, data: any, config?: any) => Promise<IResponse>;
    delete: (url: string, config?: any) => Promise<IResponse>;
}

export const ajax: Ajax = {
    get: (url: string, config: any) => {
        return axiosInstance.get(url, config).then(resp => {
            showMessage(resp.data)
            return resp.data
        })
    },
    post: (url: string, data: any, config: any) => {
        return axiosInstance.post(url, data, config).then(resp => {
            showMessage(resp.data)
            return resp.data
        })
    },
    put: (url: string, data: any, config: any) => {
        return axiosInstance.put(url, data, config).then(resp => {
            showMessage(resp.data)
            return resp.data
        })
    },
    delete: (url: string, config: any) => {
        return axiosInstance.delete(url, config).then(resp => {
            showMessage(resp.data)
            return resp.data
        })
    }
};

