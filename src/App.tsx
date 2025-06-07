import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'antd/dist/reset.css';
import './App.less';
import Login from "./pages/login";
import Page404 from "./pages/404";
import Admin from "./pages/admin";
import { ConfigProvider, message, theme } from "antd";
import { useState } from "react";
import {App as AntdApp} from "antd"
import { MessageInstance } from "antd/es/message/interface";
import { storageUtils } from '@/utils/storageUtils'

import zh_CN from 'antd/es/locale/zh_CN';
import en_US from 'antd/es/locale/en_US';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

let myMessage: MessageInstance;

function App() {
    const basename = import.meta.env.BASENAME || "/";
    const [currentTheme, setCurrentTheme] = useState<'default' | 'dark'>('default');
    const [messageApi, contextHolder] = message.useMessage();
    myMessage = messageApi;
    // 获取当前语言
    const [locale] = useState(storageUtils.getI18n);
    // 设置antd国际化语言
    dayjs.locale(locale === 'en' ? 'en-US' : 'zh-cn');
    const antdLocale = locale === 'en' ? en_US : zh_CN;
    return (
        <ConfigProvider
            theme={{
                algorithm: currentTheme === 'default' ? theme.defaultAlgorithm : theme.darkAlgorithm
            }}
            locale={antdLocale}
        >
        <AntdApp>
            <BrowserRouter basename={basename}>
                <Routes>
                    <Route path="/login" element={<Login setTheme={setCurrentTheme} />} />
                    <Route path="/404" element={<Page404 />} />
                    <Route path="/*" element={<Admin  setTheme={setCurrentTheme} />} />
                </Routes>
            </BrowserRouter>
            {contextHolder}
        </AntdApp>
                
        </ConfigProvider>
    );
}

export default App;
export { myMessage as message };
