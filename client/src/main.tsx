import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import RouterPage from "./RouterPage";
import NavPage from "./components/nav";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <NavPage/>
        <RouterPage/>
    </BrowserRouter>
)
