import {addTodoReducerAC, delTodoAC} from "./TodoReducer";
import {AppThunk, RootStateType} from "./Store";
import {TaskApiStatuses, TasksApiType, todoApi, UpdateTaskApiType} from "../../api/TodoListApi";
import {setAppStatusAC} from "./AppReducer";

const initialTaskReducerState: TasksReducerStateType = {}

export const TaskReducer = (state = initialTaskReducerState, action: UnionActionType): TasksReducerStateType => {
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
                    .map(t => t.id === action.payload.taskId ? {...t, status: action.payload.status} : t)
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
                [action.payload.todoId] : [...state[action.payload.todoId],{...action.payload.tasks}]
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
/********************TC********************/
export const setTasksTC = (todoId: string): AppThunk => {
    return async (dispatch) => {
        try {
            const tasks = await todoApi.getTasks(todoId)
            dispatch(setTasksAC(todoId, tasks.data.items))
        }catch (e){
            console.log(e)
        }

    }
}
export const addTaskTC = (todoId: string, title: string): AppThunk => {
    return async (dispatch) => {
        const res = await todoApi.addTask(todoId,title)
        const tempTask:TasksApiType = res.data.data.item
        dispatch(addTaskAC(todoId,tempTask))
    }
}
export const delTaskTC = (todoId: string, taskId: string): AppThunk => {
    return async (dispatch) => {
        const res = await todoApi.delTask(todoId,taskId)
        dispatch(delTaskAC(todoId,taskId))
    }
}
export const changeTaskStatusTC = (todoId: string, taskId: string, status: TaskApiStatuses): AppThunk => {
    return async(dispatch,getState: () => RootStateType) => {
        const task = getState().tasks[todoId].find(t => t.id === taskId)
        if(!task) return
        const tempTask:UpdateTaskApiType = {
            title: task.title,
            description: task.description,
            status: status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline
        }
        const res = await todoApi.updateTask(todoId,taskId,tempTask)
        dispatch(setTaskStatusAC(todoId,taskId,status))
    }
}
/********************AC********************/
const setTasksAC = (todoId: string, tasks: TasksApiType[]) => {
    return {type: 'SET-TASKS', payload: {todoId, tasks}} as const
}
export const setTaskStatusAC = (todoId: string, taskId: string, status: TaskApiStatuses) => {
    return {type: 'SET-TASK_STATUS', payload: {todoId, taskId, status}} as const
}
export const delTaskAC = (todoId: string, taskId: string) => {
    return {type: 'DEL-TASK', payload: {todoId, taskId}} as const
}
export const addTaskAC = (todoId: string, tasks: TasksApiType) => {
    return {type: 'ADD-TASK', payload: {todoId, tasks}} as const
}

export type TasksReducerStateType = {
    [key: string]: TasksApiType[]
}
export type UnionActionType =
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof setTaskStatusAC>
    | ReturnType<typeof delTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof addTodoReducerAC>
    | ReturnType<typeof delTodoAC>
