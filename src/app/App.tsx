import React, {useEffect} from 'react';
import './App.css';
import {TodoList} from "../enitities/todoList/TodoList";
import {useAppDispatch} from "./store/Store";
import {setTodoTC} from "./store/TodoReducer";

function App() {
    const dispatch = useAppDispatch()
    useEffect(()=>{
        dispatch(setTodoTC())

    },[])

  return (
    <div className="App">
      <TodoList/>
    </div>
  );
}

export default App;
