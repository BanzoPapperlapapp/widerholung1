import {todoApi, TodoListApiType} from "../../api/TodoListApi";
import {AppThunk} from "./Store";
import {Dispatch} from "redux";
import {setTasksTC} from "./TaskReducer";
import {setAppStatusAC} from "./AppReducer";

const initialStateTodoReducer: TodoType[] = []
export const TodoReducer = (state = initialStateTodoReducer, action:UnionTodoReducerType) => {
    switch (action.type) {
        case "SET-TODO": {
            return [...state,...action.payload.todos];
        }
        case "ADD-TODO": {
            return [...state,{...action.payload.todo}]
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
export const addTodoReducerAC = (todo: TodoType) => {
    return {type: 'ADD-TODO', payload: {todo}} as const
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
        try{
            dispatch(setAppStatusAC('pending'))
            const todos = await todoApi.getTodos()
            todos.data.forEach(el => dispatch(setTasksTC(el.id)))
            dispatch(setTodosAC(todos.data))
        } catch (e){
            console.log(e)
        } finally {
            dispatch(setAppStatusAC('idle'))
        }

    }
}
export const addTodoTC = (title: string) => {
    return async (dispatch: Dispatch) => {
        const res = await todoApi.addTodo(title)
        const todo:TodoType= {...res.data.data.item,filter: 'all'}
        dispatch(addTodoReducerAC(todo))
    }
}
export const delTodoTC = (todoId: string): AppThunk => {
    return async (dispatch) => {
        const res = await todoApi.delTodo(todoId)
        dispatch(delTodoAC(todoId))
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
