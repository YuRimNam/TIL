import React from 'react';
import './CSS/Main.css';

const Main = ({From, Childeren}) => {
    return (
        <div className="main">
             <div className="header">
                오늘 할 일
             </div>
             <div className="input">
                {From}
             </div>
             <div className="text">
                {Childeren}
             </div>
        </div>
    );
}

export default Main;