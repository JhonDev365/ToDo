import React from "react";
import { TodoCounter } from "./TodoCounter";
import { TodoSearch } from "./TodoSearch";
import { TodoList } from "./TodoList";
import { CreateTodoButton} from './CreateTodoButton'
import { TodoItem } from "./TodoItem";
import { ProgressBar } from "./ProgressBar";
// import './App.css';

// const defaultTodos = [
//   {text:'Terminar La Unión', completed: true},
//   {text:'Llamar CR El Oasis', completed: false},
//   {text:'Llamar Lusitania', completed: true},
//   {text:'Llamar PD Las Vegas', completed: false},
// ]

//creando nuestro propio hooks de local storage
function useLocalStorage (itemName, initialValue) {
  
  const localStorageItem = localStorage.getItem('itemName');
  
  let parsedItem;
  if(!localStorageItem) {
    localStorage.setItem('itemName', JSON.stringify(initialValue));
    parsedItem = initialValue;
  } else {
    parsedItem= JSON.parse(localStorageItem);
  }
  
  const [item, setItem] = React.useState(parsedItem);

  const saveItem = (newItem) =>  {
    const stringifiedItem = JSON.stringify(newItem);
    // cuando recibe un nombre y valor, lo almacena o actualiza si ya existe.
    localStorage.setItem('itemName', stringifiedItem);
    setItem(newItem);
  };

  return [item, saveItem];
}

function App() {

  
  const [todos, saveTodos] = useLocalStorage('Todos_v1', []);
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

  return (
    //react solo acepta un componente, por lo cual
    //renderizamos una etiqueta invisible --> React.fragment
    <React.Fragment>
      <TodoCounter
        total={totalTodos}
        completed={completedTodos}
      />
      <ProgressBar
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
          //al renderizar elementos de una lista,a rray, tenemso que usar
          // la propiedad key a nuestros componentes para que react los pueda identificar
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
