import React, { Component } from 'react';
//component imports
import AddAuthor from './AddAuthor';
import AddNewReview from './AddNewReview';
//api call imports
import { saveAuthor } from '../services/authorsApi';
import { saveBook } from '../services/booksApi';
import { fetchAuthors } from '../services/authorsApi';
import { fetchBooks } from '../services/booksApi';
import { saveMyBook } from '../services/myBooksApi';

class AddBook extends Component {
    constructor(props) {
        super(props)
        this.state={
            title: '',
            publication_year: '',
            author_id: '',
            book_id: '',
            newAuthor: '',
            isAddBook: true,
            isNewBook: false,
            isAddReview: false,
            isNotLoggedIn: false
        }
        this.handleChange=this.handleChange.bind(this);
        this.authorSetOff=this.authorSetOff.bind(this);
        this.toggleAddReview=this.toggleAddReview.bind(this);
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    authorSetOff(authorInfo){
        if (this.props.nameToUserId()) {
            this.setState({newAuthor: authorInfo})
            const jwt = localStorage.getItem("jwt")
            saveAuthor(authorInfo, jwt)
            .then(() => fetchAuthors())
            .then(data => (data.message))
            .then((message) => {
                const newAuthorId = message.length;
                this.setState({author_id: newAuthorId})
                saveBook({"title": this.state.title, 
                        "publication_year": this.state.publication_year, 
                        "author_id": this.state.author_id}, jwt)
                .then(() => fetchBooks())
                .then(data => (data.message))
                .then((message) => {
                    const newBookId = message.length;
                    this.setState({book_id: newBookId})
                    this.setState({isNewBook: true})
                })
                .then(() => saveMyBook({"book_id": this.state.book_id, "user_id": this.props.nameToUserId()}, jwt))
                .then(()=>this.props.resetMyBooks());
            })
        } else {
            this.setState({isNotLoggedIn: true})
        }
    }
    toggleAddReview(){
        if (this.state.isAddReview === false) {
            this.setState({isAddReview: true})
        } else {
            this.setState({isAddReview: false})
        }
    }
    showAddBook(){
        if (this.state.isNewBook === false){
            return(
                <div className="addBookForm">
                    <h3>Add a book to the collective library:</h3>
                    <br></br>
                    <input
                        type='text'
                        name='title'
                        value={this.state.title}
                        onChange={this.handleChange}
                        placeholder="book title"
                    />
                    <br></br><br></br>
                    <input 
                        type='integer'
                        name='publication_year'
                        value={this.state.publication_year}
                        onChange={this.handleChange}
                        placeholder="year of publication"
                    />
                    <br></br><br></br>
                    <AddAuthor authorSetOff={this.authorSetOff}/>
                </div>
            )
        } else {
            return(
                <div className="addBookFormContainer">
                    <div className="addBookForm">
                        <h2>new book:</h2>
                            <br></br>
                        <h2>{this.state.title}</h2>
                        <h3>{this.state.publication_year}</h3>
                        <h3>{this.state.newAuthor.first_name} {this.state.newAuthor.last_name}</h3>
                            <br></br>
                            <div className="newBookButtonContainer">
                                <div 
                                    onClick={()=>this.toggleAddReview()}
                                    className="newBookButton">
                                    add your review of this book
                                </div>
                                <div 
                                    onClick={()=>this.setState({isNewBook: false,
                                                                book_id: '', 
                                                                title: '', 
                                                                publication_year: '',
                                                                author_id: '',
                                                                newAuthor: ''})}
                                    className="newBookButton">
                                    add another book
                                </div>
                                <div 
                                    onClick={()=>this.props.switchCurrentViewToLibrary()}
                                    className="newBookButton">
                                    go to library
                                </div>
                            </div>
                    </div>
                        <AddNewReview 
                            isAddReview={this.state.isAddReview}
                            title={this.state.title}
                            nameToUserId={this.props.nameToUserId}
                            book_id={this.state.book_id}
                            toggleAddReview={this.toggleAddReview}
                        />
                </div>
            )
        }
    }
    showNotloggedIn(){
        if(this.state.isNotLoggedIn === true) {
            return(
                <div>
                    Sorry, you must be a registered user or logged in to add a book.
                </div>
            )
        }
    }

    render() {
        return(
            <div>
                {this.showAddBook()}
                {this.showNotloggedIn()}
            </div>
        )
    }
}
export default AddBook;