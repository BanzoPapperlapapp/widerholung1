import axios from 'axios'

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '4d930de1-8cb2-436a-8a88-6a8f5582290e'
    }
}
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

export type ApiResponseType<D = {}> = {
    data: D
    resultCode: number
    messages: string[]
}

/************TODOTYPE****************/
export type TodoListApiType = {
    id: string
    addedDate: string
    order: number
    title: string
}
export type AddTodoType = {
    item: TodoListApiType
}

/*************TASKTYPE***************/
export type TasksApiType = {
    description: string
    title: string
    status: TaskApiStatuses
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export enum TaskApiStatuses {
    Now,
    Active,
    Completed
}
export type AddTaskType = {
    item: TasksApiType
}
export type GetTasksResponseType = {
    items: TasksApiType[]
    totalCount: number
    error: string | null
}
export type UpdateTaskApiType = {
    title: string
    description: string
    status: TaskApiStatuses
    priority: number
    startDate: string
    deadline: string
}
export type UpdateTaskResponseType = {
    item: UpdateTaskApiType
}



export const todoApi = {
    getTodos() {
        return instance.get<TodoListApiType[]>('todo-lists')
    },
    addTodo(title: string) {
        return instance.post<ApiResponseType<AddTodoType>>('todo-lists', {title})
    },
    delTodo(todoId: string) {
        return instance.delete<ApiResponseType>(`todo-lists/${todoId}`)
    },
    getTasks(todoId: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todoId}/tasks`)
    },
    addTask(todoId: string, title: string) {
        return instance.post<ApiResponseType<AddTaskType>>(`todo-lists/${todoId}/tasks`, {title})
    },
    delTask(todoId: string, taskId: string) {
        return instance.delete<ApiResponseType>(`todo-lists/${todoId}/tasks/${taskId}`)
    },
    updateTask(todoId: string,taskId: string, task: UpdateTaskApiType) {
        return instance.put<ApiResponseType<UpdateTaskResponseType>>(`todo-lists/${todoId}/tasks/${taskId}`,{...task})
    }
}

