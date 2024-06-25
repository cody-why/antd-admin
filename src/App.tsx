import {BrowserRouter, Routes, Route} from "react-router-dom";
import 'antd/dist/reset.css';
import './App.less';
import Login from "./pages/login";
import Admin from "./pages/admin";

function App() {
    const basename = process.env.REACT_APP_BASENAME;
    return (
        <BrowserRouter basename={basename}>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/*" element={<Admin/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;