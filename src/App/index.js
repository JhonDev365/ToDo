import React from "react";
import { AppUI } from "./AppUI";
// import './App.css';

const defaultTodos = [
  {text:'Terminar La Unión', completed: true},
  {text:'Llamar CR El Oasis', completed: false},
  {text:'Llamar Lusitania', completed: true},
  {text:'Llamar PD Las Vegas', completed: false},
]

//creando nuestro propio hooks de local storage
function useLocalStorage (itemName, initialValue) {
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [item, setItem] = React.useState(initialValue);
  
  
  React.useEffect(() => {
    setTimeout(() => {
      try {
        const localStorageItem = localStorage.getItem(itemName);
  
        let parsedItem;
        if(!localStorageItem) {
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parsedItem = initialValue;
        } else {
          parsedItem= JSON.parse(localStorageItem);
        }

        setItem(parsedItem);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    
    }, 4000);
  });
  
  
  

  const saveItem = (newItem) =>  {
   try {
    const stringifiedItem = JSON.stringify(newItem);
    // cuando recibe un nombre y valor, lo almacena o actualiza si ya existe.
    localStorage.setItem('itemName', stringifiedItem);
    setItem(newItem);
   } catch (error) {
    setError(error);
   }
  };

  //cuando tenesmos mas de 2 estados en el mismo hook, debemos enviar NO array SINO un objetos
  return {item, saveItem, loading, error};
}

function App() {

  
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

  return (
    <AppUI
    error={error}
    loading={loading}
    totalTodos={totalTodos}
    completedTodos={completedTodos}
    searchValue={searchValue}
    setSearchValue={setSearchValue}
    searchedTodos={searchedTodos}
    completeTodo={completeTodo}
    deleteTodo={deleteTodo}
    />
  );
}

export default App;
