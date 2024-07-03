import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'antd/dist/reset.css';
import './App.less';
import Login from "./pages/login";
import Admin from "./pages/admin";
import { ConfigProvider, theme } from "antd";
import { useState } from "react";

function App() {
    const basename = process.env.REACT_APP_BASENAME;
    const [currentTheme, setCurrentTheme] = useState<'default' | 'dark'>('default');
    return (
        <ConfigProvider
            theme={{
                algorithm: currentTheme === 'default' ? theme.defaultAlgorithm : theme.darkAlgorithm
            }}
        >
            <BrowserRouter basename={basename}>
                <Routes>
                    <Route path="/login" element={<Login setTheme={setCurrentTheme} />} />
                    <Route path="/*" element={<Admin  setTheme={setCurrentTheme} />} />
                </Routes>
            </BrowserRouter>
        </ConfigProvider>
    );
}

export default App;
