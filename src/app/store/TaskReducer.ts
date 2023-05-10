
const initialTaskReducerState:TasksReducerStateType = {
    'id1': [{id: '1', Done: false, title: 'Task 1'},{id: '2', Done: false, title: 'Task 2'},{id: '3', Done: false, title: 'Task 3'}],
    'id2': [{id: '11', Done: true, title: 'Task 11'},{id: '22', Done: true, title: 'Task 22'}]
}

export const TaskReducer = (state = initialTaskReducerState, action:UnionActionType) => {
   switch (action.type){
       case "SET-TASK_STATUS": {
           return {...state,
               [action.payload.todoId] : state[action.payload.todoId]
                   .map(t => t.id === action.payload.taskId ? {...t,Done: action.payload.status} : t )}
       }
       default: return state;
   }
};

/*AC*/
const getTasks = (todoId: string) => {
    return {type: 'GET-TASKS', payload: {todoId}} as const
}
export const setTaskStatus = (todoId: string, taskId: string, status: boolean) => {
    return {type: 'SET-TASK_STATUS', payload: {todoId, taskId, status}} as const
}

type TaskType = {
    id: string
    title: string
    Done: boolean
}
export type TasksReducerStateType = {
    [key: string] : TaskType[]
}
export type UnionActionType =
    | ReturnType<typeof getTasks>
    | ReturnType<typeof setTaskStatus>
