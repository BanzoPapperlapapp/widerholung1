const initialStateTodoReducer: TodoReducerState[] = [
    {id: 'id1', title: 'Todo 1', filter: 'all'},
    {id: 'id2', title: 'Todo 2', filter: 'all'}
]
export const TodoReducer = (state = initialStateTodoReducer, action:UnionTodoReducerType) => {
    switch (action.type) {
        case "GET-TODO": {
            return [...state];
        }
        default: return state;
    }
};
/*AC*/
const getTodoReducerAC = () => {
    return { type: 'GET-TODO' } as const
}

export type TodoReducerState = {
    id: string
    title: string
    filter: TodoFilterType
}

type TodoFilterType = 'all' | 'completed' | 'active'

export type UnionTodoReducerType =
    | ReturnType<typeof getTodoReducerAC>
