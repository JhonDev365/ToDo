import React from "react";
import { useLocalStorage } from "./useLocalStorage";

const TodoContext = React.createContext();

function TodoProvider(props) {

    const {item:todos, saveItem:saveTodos, loading, error} = useLocalStorage('Todos_v1', []);
    //los estados se maneja como array, en posicion 0 el estado actual
    //en poscicion 1 una funcion para cambiar ese estado 
    
  
    const [searchValue, setSearchValue] = React.useState('');
  
    const completedTodos = todos.filter (todo => todo.completed).length;
  
    const totalTodos = todos.length;
  
    let searchedTodos = [];
    if (!searchValue.length >= 1) {
      searchedTodos = todos;
    }else{
      searchedTodos = todos.filter (todo => {
        // convierte en minuscula el texto de los todos creados
        const todoText = todo.text.toLowerCase();
        // convierte en minuscula lo que se escribe desde el input
        const searchText = searchValue.toLowerCase();
        // busca las coincidencias
        return todoText.includes(searchText);
      });
      // Operador ternario
      // searchedTodos = !searchValue.length >= 1 ? todos : todos.filter(todo => (todo.text.toLowerCase().includes(searchValue.toLowerCase())));
    }
  
  
    const completeTodo = (text) => {
      const todoIndex = todos.findIndex(todo => todo.text === text);
      const newTodos = [...todos];
      // todos[todoIndex] = {
      //   text: todos[todoIndex].text,
      //   completed: true,
      // }
      newTodos[todoIndex].completed = true;
      saveTodos(newTodos);
    };
  
    const deleteTodo = (text) => {
      const todoIndex = todos.findIndex(todo => todo.text === text);
      const newTodos = [...todos];
      newTodos.splice(todoIndex, 1);
      saveTodos(newTodos);
    };
  
    //el array como segundo parametro despues de la funcion lo usamos para definir caundo queremos inicializar useeffect
    //[] array vacio solo lo ejecuta una vez
    //[totalTodo] con variable, cada vez dque esta variable se actualice se rederiza el useeffect
    // React.useEffect(() => {
    //   console.log('use effect');
    // }, []);  

    return(
        <TodoContext.Provider value={{
            error,
            loading,
            totalTodos,
            completedTodos,
            searchValue,
            setSearchValue,
            searchedTodos,
            completeTodo,
            deleteTodo,
        }}>
            {props.children}
        </TodoContext.Provider>
    );
}

export { TodoContext, TodoProvider };