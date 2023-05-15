import {addTodoReducerAC, delTodoAC} from "./TodoReducer";
import {AppThunk} from "./Store";
import {TasksApiType, todoApi} from "../../api/TodoListApi";

const initialTaskReducerState: TasksReducerStateType = {}

export const TaskReducer = (state = initialTaskReducerState, action: UnionActionType) => {
    switch (action.type) {
        case "SET-TASKS": {
            return {
                ...state,
                [action.payload.todoId] : [...action.payload.tasks]
            }
        }
        case "SET-TASK_STATUS": {
            return {
                ...state,
                [action.payload.todoId]: state[action.payload.todoId]
                    .map(t => t.id === action.payload.taskId ? {...t, Done: action.payload.status} : t)
            }
        }
        case "DEL-TASK": {
            return {
                ...state,
                [action.payload.todoId] : state[action.payload.todoId].filter(t => t.id !== action.payload.taskId)
            }
        }
        case "ADD-TASK": {
            return {
                ...state,
                [action.payload.todoId] : [...state[action.payload.todoId],{...action.payload.tasks, Done: false}]
            }
        }
        case "ADD-TODO": {
            return {
                ...state,
                [action.payload.todo.id] : []
            }
        }
        case "DEL-TODO": {
            delete state[action.payload.todoId]
            return {...state}
        }
        default:
            return state;
    }
};
/*TC*/
export const setTasksTC = (todoId: string): AppThunk => {
    return async (dispatch) => {
        const tasks = await todoApi.getTasks(todoId)
        dispatch(setTasks(todoId, tasks.data.items))
    }
}
export const addTasksTC = (todoId: string, title: string): AppThunk => {
    return async (dispatch) => {
        const res = await todoApi.addTask(todoId,title)
        const tempTask:TasksApiType = res.data.data.item
        dispatch(addTask(todoId,tempTask))
    }
}
export const delTaskTC = (todoId: string, taskId: string): AppThunk => {
    return async (dispatch) => {
        const res = await todoApi.delTasks(todoId,taskId)
        dispatch(delTask(todoId,taskId))
    }
}
/*AC*/
const setTasks = (todoId: string, tasks: TasksApiType[]) => {
    return {type: 'SET-TASKS', payload: {todoId, tasks}} as const
}
export const setTaskStatus = (todoId: string, taskId: string, status: boolean) => {
    return {type: 'SET-TASK_STATUS', payload: {todoId, taskId, status}} as const
}
export const delTask = (todoId: string, taskId: string) => {
    return {type: 'DEL-TASK', payload: {todoId, taskId}} as const
}
export const addTask = (todoId: string, tasks: TasksApiType) => {
    return {type: 'ADD-TASK', payload: {todoId, tasks}} as const
}

export type TasksReducerStateType = {
    [key: string]: TasksApiType[]
}
export type UnionActionType =
    | ReturnType<typeof setTasks>
    | ReturnType<typeof setTaskStatus>
    | ReturnType<typeof delTask>
    | ReturnType<typeof addTask>
    | ReturnType<typeof addTodoReducerAC>
    | ReturnType<typeof delTodoAC>
