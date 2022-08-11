import React from "react";
import './TodoCounter.css';

function TodoCounter({total, completed}) {
    return (
    <h2 className ="TodoCounter">Tareas Completadas {completed}/{total} TODOs</h2>
    );
}

export {TodoCounter};
