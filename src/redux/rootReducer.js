import {combineReducers} from "redux";
import {books_reducer} from "./books/books_reducer";

export const rootReducer = combineReducers({
    books: books_reducer
})