import {GET_BOOKS, CLEAR_BOOKS, REQEST_GET} from "./types";
import axios from "axios";



export const get_books = (text)=> dispatch=>{
    console.log("act")
    axios.get(`http://openlibrary.org/search.json?q=${text}`).then(res=>{
        dispatch({
            type: GET_BOOKS,
            payload: res.data
        })
    })

}
export const request_get = (text)=>dispatch=>{
    dispatch({
        type: REQEST_GET,
    })
}

export const clear_book_list = (text)=>dispatch=>{
    dispatch({
        type: CLEAR_BOOKS,
    })
}