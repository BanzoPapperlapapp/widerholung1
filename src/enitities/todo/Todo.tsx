import React, {memo, useCallback, useMemo} from 'react';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from "@mui/icons-material/Delete";
import st from "./Todo.module.css";
import {Task} from "../task/Task";

import {addTaskTC, changeTaskStatusTC, delTaskTC,} from "../../app/store/TaskReducer";

import {AddItem} from "../../shared/addItem/addItem";
import {changeTodoFilterAC, delTodoTC, TodoFilterType} from "../../app/store/TodoReducer";
import {useAppDispatch} from "../../app/store/Store";
import {TaskApiStatuses, TasksApiType} from "../../api/TodoListApi";


type TodoPropsType = {
    todoId: string
    todoTitle: string
    filter: TodoFilterType
    tasks: TasksApiType[]
}
export const Todo = memo(({todoId, todoTitle, filter, tasks}: TodoPropsType) => {

        const dispatch = useAppDispatch()

        const onClickChangeTaskStatusHandler = useCallback((taskId: string, status: boolean) => dispatch(changeTaskStatusTC(todoId, taskId, status ? TaskApiStatuses.Completed : TaskApiStatuses.Now)), [todoId])
        const onClickDelTaskHandler = useCallback((taskId: string) => dispatch(delTaskTC(todoId, taskId)), [todoId])
        const onEnterAddTaskHandler = useCallback((title: string) => dispatch(addTaskTC(todoId,title)), [todoId])
        const onClickChangeFilterHandler = useCallback((filter: TodoFilterType) => dispatch(changeTodoFilterAC(todoId, filter)), [todoId])
        const onClickDeleteTodo = () => dispatch(delTodoTC(todoId))

        const filteredTasks = useMemo(() => {
            switch (filter) {
                case "active": {
                    return tasks.filter(t => !t.status)
                }
                case "completed": {
                    return tasks.filter(t => t.status)
                }
                default:
                    return tasks
            }
        }, [tasks, filter])

        return (
            <Paper elevation={3} className={st.item_box}>
                <h3>{todoTitle}
                    <IconButton edge="end" aria-label="comments" onClick={onClickDeleteTodo}>
                        <DeleteIcon/>
                    </IconButton>
                </h3>
                <div>
                    <AddItem fullWidth={true} addItem={onEnterAddTaskHandler} subTitle={'Input task title'}/>
                </div>

                <List>
                    {filteredTasks?.map(t => <Task
                        key={t.id}
                        id={t.id}
                        title={t.title}
                        completed={!!t.status}
                        changeTaskStatus={(taskId, status) => onClickChangeTaskStatusHandler(taskId, status)}
                        delTask={(taskId) => onClickDelTaskHandler(taskId)}
                    />)}
                </List>
                <ButtonGroup variant="outlined" aria-label="outlined button group">
                    <Button onClick={() => onClickChangeFilterHandler('all')}>All</Button>
                    <Button onClick={() => onClickChangeFilterHandler('active')}>Active</Button>
                    <Button onClick={() => onClickChangeFilterHandler('completed')}>Completed</Button>
                </ButtonGroup>
            </Paper>
        );
    }
)
