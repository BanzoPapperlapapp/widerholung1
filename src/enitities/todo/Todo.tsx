import React, {ReactHTML, ReactHTMLElement, useState} from 'react';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from '@mui/material/TextField';
import st from "./Todo.module.css";
import {Task} from "../task/Task";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../app/store/Store";
import {addTask, delTask, setTaskStatus, TasksReducerStateType} from "../../app/store/TaskReducer";
import {AddItem} from "../../shared/addItem/addItem";
type TodoPropsType = {
    todoId: string
    todoTitle: string
}
export const Todo = ({todoId , todoTitle}:TodoPropsType) => {
    const tasks = useSelector<RootReducerType,TasksReducerStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const onClickChangeTaskStatusHandler = (taskId: string, status: boolean) =>
        dispatch(setTaskStatus(todoId,taskId,status))
    const onClickDelTaskHandler = (taskId: string) => dispatch(delTask(todoId, taskId))
    const onEnterAddTaskHandler = (title: string) => dispatch(addTask(todoId,title))


    return (
        <Paper elevation={3} className={st.item_box}>
            <h3>{todoTitle}</h3>
            <div>
                <AddItem fullWidth={true} addItem={onEnterAddTaskHandler} subTitle={'Input task title'}/>
            </div>

            <List>
                {tasks[todoId]?.map(t => <Task
                    key={t.id}
                    id={t.id}
                    title={t.title}
                    Done={t.Done}
                    changeTaskStatus={(taskId, status) => onClickChangeTaskStatusHandler(taskId, status)}
                    delTask={(taskId) => onClickDelTaskHandler(taskId)}
                />)}
            </List>
            <ButtonGroup variant="outlined" aria-label="outlined button group">
                <Button>All</Button>
                <Button>Active</Button>
                <Button>Completed</Button>
            </ButtonGroup>
        </Paper>
    );
};
