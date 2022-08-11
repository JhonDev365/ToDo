import React from "react";
import './CreateTodoButton.css';

function CreateTodoButton () {
    return (
        <button className="CreateTodoButton" onClick={() => alert('Aquí va el Modal')}>+</button>
    );
}

export {CreateTodoButton};