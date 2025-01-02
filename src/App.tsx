import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'antd/dist/reset.css';
import './App.less';
import Login from "./pages/login";
import Admin from "./pages/admin";
import { ConfigProvider, message, theme } from "antd";
import { useState } from "react";
import { MessageInstance } from "antd/es/message/interface";
import { App as AntdApp } from "antd"

let myMessage: MessageInstance;

function App() {
    const basename = process.env.REACT_APP_BASENAME;
    const [currentTheme, setCurrentTheme] = useState<'default' | 'dark'>('default');
    const [messageApi, contextHolder] = message.useMessage();
    myMessage = messageApi;
    return (
        <ConfigProvider
            theme={{
                algorithm: currentTheme === 'default' ? theme.defaultAlgorithm : theme.darkAlgorithm
            }}
        >
        <AntdApp>
            <BrowserRouter basename={basename}>
                <Routes>
                    <Route path="/login" element={<Login setTheme={setCurrentTheme} />} />
                    <Route path="/*" element={<Admin setTheme={setCurrentTheme} />} />
                </Routes>
            </BrowserRouter>
            {contextHolder}
        </AntdApp>
        </ConfigProvider>
    );
}

export default App;

export { myMessage as message };
