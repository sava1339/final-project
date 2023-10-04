import React from 'react';
import {Route, Routes} from "react-router-dom";
import App from "./App";
import MainPage from "./pages/mainPage";

const RouterPage = () => {
    return (
        <>
            <Routes >
                <Route path='/' element={<App/>} />
                <Route path='/main' element={<MainPage/>} />
            </Routes>
        </>
    );
};

export default RouterPage;