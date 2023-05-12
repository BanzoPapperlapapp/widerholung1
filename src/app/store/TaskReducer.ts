import {v1} from "uuid";
import {addTodoReducerAC, delTodoAC} from "./TodoReducer";

const initialTaskReducerState: TasksReducerStateType = {
    'id1': [{id: '1', Done: false, title: 'Task 1'}, {id: '2', Done: false, title: 'Task 2'}, {
        id: '3',
        Done: false,
        title: 'Task 3'
    }],
    'id2': [{id: '11', Done: true, title: 'Task 11'}, {id: '22', Done: true, title: 'Task 22'}]
}

export const TaskReducer = (state = initialTaskReducerState, action: UnionActionType) => {
    switch (action.type) {
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
                [action.payload.todoId] : [...state[action.payload.todoId],{id: v1(), title: action.payload.title, Done: false}]
            }
        }
        case "ADD-TODO": {
            return {
                ...state,
                [action.payload.todoId] : []
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

/*AC*/
const getTasks = (todoId: string) => {
    return {type: 'GET-TASKS', payload: {todoId}} as const
}
export const setTaskStatus = (todoId: string, taskId: string, status: boolean) => {
    return {type: 'SET-TASK_STATUS', payload: {todoId, taskId, status}} as const
}
export const delTask = (todoId: string, taskId: string) => {
    return {type: 'DEL-TASK', payload: {todoId, taskId}} as const
}
export const addTask = (todoId: string, title: string) => {
    return {type: 'ADD-TASK', payload: {todoId, title}} as const
}

export type TaskType = {
    id: string
    title: string
    Done: boolean
}
export type TasksReducerStateType = {
    [key: string]: TaskType[]
}
export type UnionActionType =
    | ReturnType<typeof getTasks>
    | ReturnType<typeof setTaskStatus>
    | ReturnType<typeof delTask>
    | ReturnType<typeof addTask>
    | ReturnType<typeof addTodoReducerAC>
    | ReturnType<typeof delTodoAC>
