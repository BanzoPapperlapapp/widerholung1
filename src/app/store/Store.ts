import {combineReducers, legacy_createStore as createStore} from "redux";
import {TodoReducer} from "./TodoReducer";
import {TaskReducer} from "./TaskReducer";
export type RootReducerType = ReturnType<typeof RootReducer>
const RootReducer = combineReducers({
    todos: TodoReducer,
    tasks: TaskReducer
})
export const store = createStore(RootReducer)
