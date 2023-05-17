import React, {useEffect} from 'react';

import './App.css';
import {TodoList} from "../enitities/todoList/TodoList";
import {useAppDispatch, useAppSelector} from "./store/Store";
import {setTodoTC} from "./store/TodoReducer";
import {SkeletonFC} from "../shared/skeleton/SkeletonFC";
import {AppStateType} from "./store/AppReducer";
import {FirstRenderHook} from "../hooks/FirstRenderHook";

function App() {
    const isFirstRender = FirstRenderHook()
    const app = useAppSelector<AppStateType>(state => state.app)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(setTodoTC())
    }, [])


    return (
        <div className="App">
            {isFirstRender || app.status === 'pending' && <SkeletonFC/>}
            {app.status === 'idle' && <TodoList/>}
        </div>
    );
}

export default App;
