import React from "react";
import { TodoCounter } from "./TodoCounter";
import { TodoSearch } from "./TodoSearch";
import { TodoList } from "./TodoList";
import { CreateTodoButton} from './CreateTodoButton'
import { TodoItem } from "./TodoItem";
// import './App.css';

// const defaultTodos = [
//   {text:'Terminar La Unión', completed: true},
//   {text:'Llamar CR El Oasis', completed: false},
//   {text:'Llamar Lusitania', completed: true},
//   {text:'Llamar PD Las Vegas', completed: false},
// ]



function App() {

  const localStorageTodos = localStorage.getItem('Todos_v1');
  
  let parsedTodos;
  if(!localStorageTodos) {
    localStorage.setItem('Todos_v1', JSON.stringify([]));
    parsedTodos = [];
  } else {
    parsedTodos= JSON.parse(localStorageTodos);
  }

  const [todos, setTodos] = React.useState(parsedTodos);

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
    // intento de operador ternario
    // searchedTodos = !searchValue.length ? todos : todos.filter(todo => (todo.text.toLowerCase().includes(searchValue.toLowerCase())));
  }

  const saveTodos = (newTodos) =>  {
    const stringifiedTodos = JSON.stringify(newTodos);
    localStorage.setItem('Todos_v1', stringifiedTodos);
    setTodos(newTodos);
  };

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

  return (
    <React.Fragment>
      <TodoCounter
        total={totalTodos}
        completed={completedTodos}
      />
      <TodoSearch
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <TodoList>
        {searchedTodos.map(todo => (
          <TodoItem
           key={todo.text}
           text={todo.text}
           completed={todo.completed}
           onComplete={() => completeTodo(todo.text)}
           onDelete={() => deleteTodo(todo.text)}/>
        ))}
      </TodoList>
      <CreateTodoButton/>
    </React.Fragment>
  );
}

export default App;
