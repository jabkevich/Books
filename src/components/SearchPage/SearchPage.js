import React, {Component, Fragment} from 'react'
import styles from "./styles/styles.scss"

import {connect} from "react-redux";
import {get_books, request_get, clear_book_list} from "../../redux/books/booksActions";
import Modal from "./Modal"
class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            intervalID: null,
            bookName: '',
            modelActivate: false,
            data: null
        }
        this.setModalActivate = this.setModalActivate.bind(this)

    }


    onChange = e => {
            this.non_search_in_a_second()
            this.setState(
                {[e.target.name]: e.target.value}
            )
            this.set_search_in_a_second()
    }

    timer() {
        console.log("alo")
        if (this.state.bookName !== "") {
            console.log(this.state.bookName)
            this.setState({
                intervalID: this.props.getBooks(this.state.bookName)
            })
        } else {
            console.log(this.state.bookName)
            this.props.clear_book_list()
        }
        if (this.props.requestGet) {
            clearInterval(this.intervalId);
            this.props.request_get()
        }
    }

    set_search_in_a_second() {
        this.intervalId = setInterval(this.timer.bind(this), 1000);
    }

    non_search_in_a_second() {
        clearInterval(this.intervalId);
    }

    onSubmit = e => {
        e.preventDefault()

    }
    setModalActivate(data) {
        this.setState((state) => {
            return {modelActivate: !state.modelActivate, data: data}
        });
    }

    render() {
        const {bookName} = this.state.bookName
        return (
            <div className={styles.SearchPage}>
                <form className={styles.Search} onSubmit={this.onSubmit}>
                    <input type={"text"} placeholder={"Введите название книги"} name={"bookName"}
                           onChange={this.onChange} value={bookName}/>
                    <button type={"submit"}>Найти</button>
                </form>
                <div className={styles.BookList}>
                    {
                        this.props.books.docs?
                        this.props.books.docs.map((book, i)=>(
                            <div className={styles.BookContainer} key={i}>
                                <div className={styles.Book}>
                                    <div className={styles.Cover}>
                                        {book.cover_i && book.cover_i !==-1?<img src={`http://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg`}/>:<Fragment></Fragment>}
                                    </div>
                                    <div className={styles.Title}>{book.title}</div>
                                    <button  onClick={()=>this.setModalActivate(book)}>Нажать</button>
                                </div>
                            </div>
                        )): <div></div>
                    }
                </div>
                <Modal activate={this.state.modelActivate} setModalActivate={this.setModalActivate} data={this.state.data}/>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        books: state.books.books,
        requestGet: state.books.requestGet
    }
}

export default connect(mapStateToProps, {getBooks: get_books, request_get, clear_book_list})(SearchPage)