import {GET_BOOKS, CLEAR_BOOKS, REQEST_GET} from "./types";

const initial_state = {
    books: [],
    search_done: false,
}


export const books_reducer = (state = initial_state, action) => {
    switch (action.type) {
        case GET_BOOKS:
            return {
                ...state,
                books: action.payload,
                requestGet: true
            }
        case CLEAR_BOOKS:
            return {
                ...state,
                books: "",
                requestGet: true
            }
        case REQEST_GET:
            return {
                ...state,
                requestGet: false
            }
        default:
            return state
    }
}