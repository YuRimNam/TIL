import React from 'react'; 
import './CSS/Input.css';

const Input = ({text, onEnter, OnChange, OnCreate}) => {
    return(
        <div className="form">
            <input placeholder="오늘 할 일을 입력해라" onEnter={onEnter} text={text} onChange={OnChange} />
            <div className="creat-button" onClick={OnCreate}>추가</div>
        </div>
    );
}

export default Input;