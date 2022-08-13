import React from "react";
import { TodoContext } from "../TodoContext";
import { TodoCounter } from "../TodoCounter";
import { TodoSearch } from "../TodoSearch";
import { TodoList } from "../TodoList";
import { CreateTodoButton} from '../CreateTodoButton'
import { TodoItem } from "../TodoItem";
import { ProgressBar } from "../ProgressBar";
import { Modal } from "../Modal";

function AppUI() {
    const {error, loading, searchedTodos, completeTodo, deleteTodo, openModal, setOpenModal} = React.useContext(TodoContext)
    return (
    //react solo acepta un componente, por lo cual
    //renderizamos una etiqueta invisible --> React.fragment
    <React.Fragment>
        <TodoCounter/>
        <ProgressBar/>
        <TodoSearch/>

        <TodoList>
            {error && <p>Desespérate, hubo un Error.</p>}
            {loading && <p>Estamos cargando, NO desespéres ...</p>}
            {(!loading && !searchedTodos.length) && <p>¡Crea tu primer ToDo!</p>}

            {searchedTodos.map(todo => (
                <TodoItem
                //al renderizar elementos de una lista,a rray, tenemso que usar
                // la propiedad key a nuestros componentes para que react los pueda identificar
                key={todo.text}
                text={todo.text}
                completed={todo.completed}
                onComplete={() => completeTodo(todo.text)}
                onDelete={() => deleteTodo(todo.text)}/>
            ))}
        </TodoList>

            {openModal && (
                <Modal>
                    <p>{searchedTodos[0]?.text}</p>
                </Modal>
            )}
        
        
        <CreateTodoButton
            setOpenModal={setOpenModal}
        />
    </React.Fragment>
    );
}

export { AppUI };