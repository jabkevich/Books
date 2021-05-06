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
        if (this.state.bookName !== "") {
            this.setState({
                intervalID: this.props.getBooks(this.state.bookName)
            })
        } else {
            this.props.clear_book_list()
        }
        if (this.props.requestGet) {
            clearInterval(this.intervalId);
            this.props.request_get()
        }
    }

    set_search_in_a_second() {
        this.intervalId = setTimeout(this.timer.bind(this), 1000);
    }

    non_search_in_a_second() {
        clearTimeout(this.intervalId);
    }

    onSubmit = e => {
        e.preventDefault()
        this.props.getBooks(this.state.bookName)
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
                                <div className={styles.BookContainer} key={i}  >
                                    <div className={styles.Book}>
                                        <div className={styles.Cover}>
                                            {book.cover_i && book.cover_i !==-1?<img src={`http://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg`}/>:<div>обложка <br/>отсутствует</div>}
                                        </div>
                                        <div className={styles.Info}>
                                            <div className={styles.Title}><button  onClick={()=>this.setModalActivate(book)}>{book.author_name}</button></div>
                                            <div className={styles.Title}>{book.title}</div>
                                        </div>
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
