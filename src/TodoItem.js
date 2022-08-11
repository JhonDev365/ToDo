import React from "react";
import './TodoItem.css';

function TodoItem (props) {

    return (
        <li className="TodoItem">
            {/* si props.completed es completada con && podemos agregar la clase que necesitemos */}
            <span className={`Icon icon-check ${props.completed && 'Icon-check--active'}`} onClick={props.onComplete}>▷</span>
            <p className={`TodoItem-p ${props.completed && 'TodoItem-p--complete'}`}>
                {props.text}
            </p>
            <span className="Icon Icon-delete" onClick={props.onDelete}>X</span>
        </li>
    );
}

export { TodoItem };