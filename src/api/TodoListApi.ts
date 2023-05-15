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

export type TodoListApiType = {
    id: string
    addedDate: string
    order: number
    title: string
}
export type AddTodoType = {
    item: TodoListApiType
}
export type AddTaskType = {
    item: TasksApiType
}
export type TodoApiResponseType<D = {}> = {
    data: D
    resultCode: number
    messages: string[]
}
export type GetTasksResponseType = {
    items: TasksApiType[]
    totalCount: number
    error: string | null
}
export type TasksApiType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export const todoApi = {
    getTodos() {
        return instance.get<TodoListApiType[]>('todo-lists')
    },
    addTodo(title: string) {
        return instance.post<TodoApiResponseType<AddTodoType>>('todo-lists', {title})
    },
    delTodo(todoId: string) {
        return instance.delete<TodoApiResponseType>(`todo-lists/${todoId}`)
    },
    getTasks(todoId: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todoId}/tasks`)
    },
    addTask(todoId: string, title: string) {
        return instance.post<TodoApiResponseType<AddTaskType>>(`todo-lists/${todoId}/tasks`, {title})
    },
    delTasks(todoId: string, taskId: string) {
        return instance.delete<TodoApiResponseType>(`todo-lists/${todoId}/tasks/${taskId}`)
    }
}

