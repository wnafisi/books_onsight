import React, { Component } from 'react';
//api call imports
import { fetchBooks, fetchOneBook } from './services/booksApi';
import { fetchAuthors } from './services/authorsApi';
import { fetchRatingForBook } from './services/ratingsApi';
import { fetchLoanForBookId } from './services/loansApi';
//component imports
import OneBook from './OneBook';


class OurLibrary extends Component {
    constructor(props){
        super(props)
        this.state={
            books: '',
            oneBook: '',
            authors: '',
            ratingsForBook: '',
            loansForBook: ''
        }
    }

    //book api calls
    componentDidMount() {
        fetchBooks()
        .then(data => this.setState({books: data.message}))
        fetchAuthors()
        .then(data => this.setState({authors: data.message}))
    }

    pickOneBook(bookId){
        fetchOneBook(bookId)
            .then(data => this.setState({oneBook: data.message}))
        fetchRatingForBook(bookId)
            .then(data => this.setState({ratingsForBook: data.message}))
            .then(()=> console.log(this.state.ratingsForBook))
        fetchLoanForBookId(bookId)
            .then(data => this.setState({loansForBook: data.message}))
    }

    //list of books display
    showList(){
        if (this.state.books !== '') {
            return(
                <div>
                    {
                    this.state.books.map(book=> {
                        return(
                            <div 
                                className="oneBooke"
                                onClick={()=>this.pickOneBook(book.id)}
                                key={book.id}>
                                {book.title}
                            </div>
                        )
                    })
                    }
                </div>
            )
        }
    }

    render () {
        return(
            <div className="columnContainer">

                <div className="title">
                    <h2>Book list:</h2>
                </div>
                <br></br>

                <div className="info">
                    <div className="bbyListBooks">
                        {this.showList()}
                    </div>

                    <div className="bbyOneBook">
                        <OneBook 
                            oneBook={this.state.oneBook}
                            authors={this.state.authors}
                            ratingsForBook={this.state.ratingsForBook}
                            loansForBook={this.state.loansForBook}
                            userIdToName={this.props.userIdToName}
                        />
                    </div>
                </div>

            </div>
            
        )
    }
}


export default OurLibrary;