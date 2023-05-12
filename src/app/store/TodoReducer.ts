import {v1} from "uuid";
import {todoApi, TodoListApiType} from "../../api/TodoListApi";
import {AppThunk} from "./Store";

const initialStateTodoReducer: TodoType[] = []
export const TodoReducer = (state = initialStateTodoReducer, action:UnionTodoReducerType) => {
    switch (action.type) {
        case "SET-TODO": {
            return [...state,...action.payload.todos];
        }
        case "ADD-TODO": {
            return [...state,{id: action.payload.todoId, title: action.payload.title,addedDate: '', order: 0, filter: 'all'}]
        }
        case "CHANGE-FILTER": {
            return state.map(t => t.id === action.payload.todoId ? {...t, filter: action.payload.filter} : t)
        }
        case "DEL-TODO": {
            return state.filter(t => t.id !== action.payload.todoId)
        }
        default: return state;
    }
};
/*******AC*******/
const setTodosAC = (todos: TodoListApiType[]) => {
    return {type: 'SET-TODO',payload: {todos}} as const
}
export const addTodoReducerAC = (title: string) => {
    const todoId = v1()
    return {type: 'ADD-TODO', payload: {title, todoId}} as const
}
export const changeTodoFilterAC = (todoId: string, filter: TodoFilterType) => {
    return {type: 'CHANGE-FILTER', payload: {todoId, filter}} as const
}
export const delTodoAC = (todoId: string) => {
    return {type: 'DEL-TODO', payload: {todoId}} as const
}

/*******TC*******/
export const setTodoTC = (): AppThunk => {
    return async (dispatch) => {
            const todos = await todoApi.getTodos()
            dispatch(setTodosAC(todos.data))
    }
}

/*******TYPES*******/
export type TodoType = TodoListApiType & {
    filter: TodoFilterType
}
export type TodoFilterType = 'all' | 'completed' | 'active'
export type UnionTodoReducerType =
    | ReturnType<typeof setTodosAC>
    | ReturnType<typeof addTodoReducerAC>
    | ReturnType<typeof changeTodoFilterAC>
    | ReturnType<typeof delTodoAC>
