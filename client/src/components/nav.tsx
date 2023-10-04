import React from 'react';
import {Link} from "react-router-dom";

const NavPage = () => {
    return (
        <div>
            <div className="nav">
                <Link to='/main'>Главная</Link>
                <Link to='/'>Чат</Link>
            </div>
        </div>
    );
};

export default NavPage;