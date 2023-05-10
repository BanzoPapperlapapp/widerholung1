import React from 'react';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import st from "./Todo.module.css";
import {Task} from "../task/Task";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../app/store/Store";
import {setTaskStatus, TasksReducerStateType} from "../../app/store/TaskReducer";
type TodoPropsType = {
    todoId: string
}
export const Todo = ({todoId}:TodoPropsType) => {

    const tasks = useSelector<RootReducerType,TasksReducerStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const onClickChangeTodoStatusHandler = (taskId: string, status: boolean) =>
        dispatch(setTaskStatus(todoId,taskId,status))

    return (
        <Paper elevation={3} className={st.item_box}>
            <span>TodoList 1</span>
            <List>
                {tasks[todoId].map(t => <Task key={t.id} id={t.id} title={t.title} Done={t.Done} onClick={(taskId, status) => onClickChangeTodoStatusHandler(taskId, status)}/>)}
            </List>
            <ButtonGroup variant="outlined" aria-label="outlined button group">
                <Button>All</Button>
                <Button>Active</Button>
                <Button>Completed</Button>
            </ButtonGroup>
        </Paper>
    );
};
