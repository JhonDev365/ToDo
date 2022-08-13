import React from "react";
import './CreateTodoButton.css';

function CreateTodoButton (props) {
    const onClickButton = () => {
        //nos permiten enviarle una funcion al set
        props.setOpenModal(prevState => !prevState);
    };
    
    return (
        <button className="CreateTodoButton" onClick={onClickButton}>+</button>
    );
}

export { CreateTodoButton };