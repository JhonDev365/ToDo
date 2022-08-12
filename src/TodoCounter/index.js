import React from "react";
import './TodoCounter.css';
// const estilos = {
//     width: '50%',
//     backgroundColor: 'black'
// }
function TodoCounter({total, completed}) {
    return (
    <h2 className ="TodoCounter">Tareas Completadas {completed}/{total} TODOs</h2>
    // si deseamos incluir sytle en linea
    // <h2 style = {estilos}></h2>
    // o podemos incluirlo directamente con doble {}
    // <h2 style = {{
    //     width: '50%',
    //     backgroundColor: 'black'
    // }}></h2>
    );
}

// las llaves son para export nombrados, obligarnos a especificar en nombre identico
export { TodoCounter };
