import React, { Component } from 'react';
//api call imports
import { fetchBooks, fetchOneBook } from '../services/booksApi';
import { fetchAuthors } from '../services/authorsApi';
import { fetchRatingForBook, fetchSpecificRating } from '../services/ratingsApi';
import { fetchLoanForBookId } from '../services/loansApi';
//component imports
import OneBook from './OneBook';
import FilterByRating from './FilterByRating';
import OurLibraryAuthors from './OurLibraryAuthors';

class OurLibrary extends Component {
    constructor(props){
        super(props)
        this.state={
            books: '',
            oneBook: '',
            authors: '',
            oneAuthor: '',
            ratingsForBook: '',
            loansForBook: '',
            isFilterByAuthors: false,
            showIsFilterByStarsButton: true,
            isFilterByStars: false,
            showBackToMainBookListButton: false,
        }
        this.pickOneBook=this.pickOneBook.bind(this);
        this.resetRatingsForBook=this.resetRatingsForBook.bind(this);
        this.resetLoansForBook=this.resetLoansForBook.bind(this);
        this.filterByStars=this.filterByStars.bind(this);
        this.pickOneAuthor=this.pickOneAuthor.bind(this);
    }
    //book api calls
    componentDidMount() {
        fetchBooks()
        .then(data => this.setState({books: data.message}))
        fetchAuthors()
        .then(data => this.setState({authors: data.message}))
    }
    //sends out api calls for specific book's ratings and loan info
    pickOneBook(bookId){
        fetchOneBook(bookId)
            .then(data => this.setState({oneBook: data.message}))
        fetchRatingForBook(bookId)
            .then(data => this.setState({ratingsForBook: data.message}))
        fetchLoanForBookId(bookId)
            .then(data => this.setState({loansForBook: data.message}))
    }
    pickOneAuthor(authorId){
        this.setState({oneAuthor: authorId})
    }
    backToMainBookList(){
        if(this.state.showIsFilterByStarsButton===true){
            return(
                <div className="filterBaby">
                    <FilterByRating filterByStars={this.filterByStars}/>
                </div>
            )
        } else if (this.state.showBackToMainBookListButton===true){
            return(
                <div className="filterBaby">
                    <div 
                        onClick={()=>this.setState({isFilterByAuthors: false, 
                                                    oneAuthor: '',
                                                    showBackToMainBookListButton:false,
                                                    showIsFilterByStarsButton: true})}
                        className="dropbtnForBackToMainBookList">
                        Back to main book catalogue
                    </div>
                </div>
            )
        }
    }
    //filter by rating, (re-renders oneBook component so it starts clean)
    filterByStars(starNumber){
        this.setState({ isFilterByStars: true, 
                        oneBook: '', 
                        isFilterByAuthors: false })
        fetchSpecificRating(starNumber)
        .then(data => this.setState({books: data.message}))
    }
    showOneBookThroughStars(){
        if(this.state.isFilterByStars === true && this.state.isFilterByAuthors === false){
            return(
                <div className="bbyOneBook">
                    <OneBook 
                        oneBook={this.state.oneBook}
                        authors={this.state.authors}
                        ratingsForBook={this.state.ratingsForBook}
                        loansForBook={this.state.loansForBook}
                        userIdToName={this.props.userIdToName}
                        nameToUserId={this.props.nameToUserId}
                        pickOneBook={this.pickOneBook}
                        resetRatingsForBook={this.resetRatingsForBook}
                    />
                </div>
            )
        }
    }
    //resets ratings for book when a new rating is made
    resetRatingsForBook(bookId){
        fetchRatingForBook(bookId)
            .then(data => this.setState({ratingsForBook: data.message}))
    }
     //resets loan for book when a new loan is made
     resetLoansForBook(bookId){
        fetchLoanForBookId(bookId)
            .then(data => this.setState({loansForBook: data.message}))
    }
    //list of books or authors display based on "isFilterByAuthors"
    showList(){
        if (this.state.books !== '' && this.state.isFilterByAuthors === false) {
            return(
                <div>
                    <div className="title">
                        <h2>Book list:</h2>
                    </div>
                    <div className="info">
                        <div className="bbyListBooks">
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
                        </div>
                            {this.showOneBook()}
                            {this.showOneBookThroughStars()}
                    </div>
                </div>
            )
        } else if (this.state.authors !== '' && this.state.isFilterByAuthors === true) {
            return(
                <OurLibraryAuthors
                    pickOneAuthor={this.pickOneAuthor}
                    oneAuthor={this.state.oneAuthor}                            
                    authors={this.state.authors} 
                    books={this.state.books}
                />
            )
        }
    }
    //original render of oneBook component, if filter by rating or authors happens, a new render happens
    showOneBook() {
        if(this.state.isFilterByAuthors === false && this.state.isFilterByStars === false) {
            return(
                <div className="bbyOneBook">
                        <OneBook 
                            oneBook={this.state.oneBook}
                            authors={this.state.authors}
                            ratingsForBook={this.state.ratingsForBook}
                            loansForBook={this.state.loansForBook}
                            userIdToName={this.props.userIdToName}
                            nameToUserId={this.props.nameToUserId}
                            pickOneBook={this.pickOneBook}
                            resetRatingsForBook={this.resetRatingsForBook}
                            resetLoansForBook={this.resetLoansForBook}
                        />
                </div>
            )
        }
    }

    render () {
        return(
            <div className="columnContainer">
                <div className="filterBar">
                    {this.backToMainBookList()}
                    <div className="filterBaby">
                        <div 
                        onClick={()=> { 
                            if (this.state.isFilterByAuthors === false) {
                                //books called incase filter was on when filterAuthors is called
                                fetchBooks()
                                .then(data => this.setState({books: data.message}))
                                this.setState({isFilterByAuthors: true, 
                                                isFilterByStars: false,  
                                                showBackToMainBookListButton: true,
                                                showIsFilterByStarsButton: false,
                                                oneBook: '', oneAuthor: ''})
                            } else {
                                this.setState({isFilterByAuthors: false,
                                                showBackToMainBookListButton: false,
                                                showIsFilterByStarsButton: true,
                                                oneAuthor: '' 
                                            })
                            }
                        }}
                        className="dropbtnAuthor">
                        Filter by author
                        </div>
                    </div>
                </div>
                {this.showList()}
            </div>  
        )
    }
}
export default OurLibrary;