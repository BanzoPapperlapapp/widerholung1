import React from 'react';
import Box from '@mui/material/Box';
import st from './TodoList.module.css';
import {Todo} from "../todo/Todo";
import {useSelector} from "react-redux";
import {TodoReducerState} from "../../app/store/TodoReducer";
import {RootReducerType} from "../../app/store/Store";

export const TodoList = () => {
    const todos = useSelector<RootReducerType,TodoReducerState[]>( state => state.todos)
    return (
            <Box className={st.items_box}>
                {todos.map((t,i) => <Todo key={i} todoId={t.id}/>)}
            </Box>
    );
};