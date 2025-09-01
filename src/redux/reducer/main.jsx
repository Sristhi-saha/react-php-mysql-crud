import { todoReducer } from "./reducer";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
    todos: todoReducer
});
