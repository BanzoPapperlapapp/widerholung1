import React, {useEffect} from 'react';
import Box from '@mui/material/Box';
import st from './TodoList.module.css';
import {Todo} from "../todo/Todo";
import {useDispatch, useSelector} from "react-redux";
import {addTodoTC, TodoType} from "../../app/store/TodoReducer";
import {RootReducerType, useAppDispatch, useAppSelector} from "../../app/store/Store";
import {AddItem} from "../../shared/addItem/addItem";
import {TasksReducerStateType} from "../../app/store/TaskReducer";
import {todoApi} from "../../api/TodoListApi";

export const TodoList = () => {
    console.log('TodoList Rerender')
    useEffect(()=>{
        todoApi.getTodos().then(res => {
            console.log(res.data)
        })
    },[])

    const todos = useAppSelector<TodoType[]>(state => state.todos)
    const tasks = useSelector<RootReducerType, TasksReducerStateType>(state => state.tasks)
    const dispatch = useAppDispatch()

    const onEnterAddTodoHandler = (title: string) => dispatch(addTodoTC(title))


    return (
        <div style={{display: 'flex', flexDirection: 'column' ,alignItems: 'center'}}>
            <div style={{padding: '20px 0px 20px 0px', width: '300px'}}>
                <AddItem fullWidth={true} addItem={onEnterAddTodoHandler} subTitle={'Input todo title'}/>
            </div>

            <Box className={st.items_box}>
                {todos.map((t, i) => <Todo key={i} todoId={t.id} todoTitle={t.title} filter={t.filter} tasks={tasks[t.id]}/>)}
            </Box>
        </div>
    );
};