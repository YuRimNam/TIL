import React from 'react';
import './CSS/Main.css';

const Main = ({Form, Childeren}) => {
    return (
        <div className="main">
             <div className="header">
                오늘 할 일
             </div>
             <div className="input">
                {Form}
             </div>
             <div className="text">
                {Childeren}
             </div>
        </div>
    );
}

export default Main;