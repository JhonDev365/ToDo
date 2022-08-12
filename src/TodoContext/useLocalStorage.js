import React from "react";

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

  export { useLocalStorage };