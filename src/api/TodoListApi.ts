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

export const todoApi = {
    getTodos(){
        return instance.get<TodoListApiType[]>('todo-lists')
    }
}

