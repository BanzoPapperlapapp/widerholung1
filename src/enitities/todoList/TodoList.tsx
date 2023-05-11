import React from 'react';
import Box from '@mui/material/Box';
import st from './TodoList.module.css';
import {Todo} from "../todo/Todo";
import {useDispatch, useSelector} from "react-redux";
import {addTodoReducerAC, TodoReducerState} from "../../app/store/TodoReducer";
import {RootReducerType} from "../../app/store/Store";
import {AddItem} from "../../shared/addItem/addItem";

export const TodoList = () => {
    const todos = useSelector<RootReducerType, TodoReducerState[]>(state => state.todos)
    const dispatch = useDispatch()

    const onEnterAddTodoHandler = (title: string) => dispatch(addTodoReducerAC(title))


    return (
        <div style={{display: 'flex', flexDirection: 'column' ,alignItems: 'center'}}>
            <div style={{padding: '20px 0px 20px 0px', width: '300px'}}>
                <AddItem fullWidth={true} addItem={onEnterAddTodoHandler} subTitle={'Input todo title'}/>
            </div>

            <Box className={st.items_box}>
                {todos.map((t, i) => <Todo key={i} todoId={t.id} todoTitle={t.title}/>)}
            </Box>
        </div>
    );
};