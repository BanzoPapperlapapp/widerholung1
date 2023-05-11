import {v1} from "uuid";

const initialStateTodoReducer: TodoReducerState[] = [
    {id: 'id1', title: 'Todo 1', filter: 'all'},
    {id: 'id2', title: 'Todo 2', filter: 'all'}
]
export const TodoReducer = (state = initialStateTodoReducer, action:UnionTodoReducerType) => {
    switch (action.type) {
        case "GET-TODO": {
            return [...state];
        }
        case "ADD-TODO": {
            return [...state,{id: action.payload.todoId, title: action.payload.title, filter: 'all'}]
        }
        default: return state;
    }
};
/*AC*/
const getTodoReducerAC = () => {
    return {type: 'GET-TODO'} as const
}
export const addTodoReducerAC = (title: string) => {
    const todoId = v1()
    return {type: 'ADD-TODO', payload: {title, todoId}} as const
}

export type TodoReducerState = {
    id: string
    title: string
    filter: TodoFilterType
}

type TodoFilterType = 'all' | 'completed' | 'active'

export type UnionTodoReducerType =
    | ReturnType<typeof getTodoReducerAC>
    | ReturnType<typeof addTodoReducerAC>
