import React, { Component } from 'react';
//component imports
import AddBook from '../underAddBook/AddBook';
import OneMyBook from './OneMyBook';
import MyLoans from './MyLoans';
//api call imports
import { fetchOneBook } from '../services/booksApi';
import { fetchMyBooksForUserId } from '../services/myBooksApi';
import { fetchAuthors } from '../services/authorsApi';
import { fetchRatingForBook } from '../services/ratingsApi';
import { fetchLoanForBookId } from '../services/loansApi';
import { fetchBookForLoan } from '../services/loansApi';

class MyLibrary extends Component {
    constructor(props) {
        super(props)
        this.state={
            myBooks: '',
            myLoans: '',
            authors: '',
            oneMyBook: '',
            ratingsForOneMyBook: '',
            loanForOneMyBook: '',
            isAddBook: false,
            isMyLoans: false,
            isOneMyBook: false,
            isOneMyBookReviews: false,

        }
        this.resetMyBooks=this.resetMyBooks.bind(this);
        this.toggleIsOneMyBookReviews=this.toggleIsOneMyBookReviews.bind(this);
    }
    //api call for logged in user's books
    componentDidMount(){
        fetchMyBooksForUserId(this.props.nameToUserId())
        .then(data => this.setState({myBooks: data.message}))
        fetchAuthors()
        .then(data => this.setState({authors: data.message}))
        fetchBookForLoan(this.props.nameToUserId())
        .then(data => this.setState({myLoans: data.message}))
    }
    toggleIsAddBook(){
        if(this.state.isAddBook === false){
            this.setState({isAddBook: true, isOneMyBook: false, isOneMyBookReviews: false, isMyLoans: false})
        } else {
            this.setState({isAddBook: false})
        }
    }
    toggleIsOneMyBookReviews(){
        if(this.state.isOneMyBookReviews === false){
            this.setState({isOneMyBookReviews: true})
        } else {
            this.setState({isOneMyBookReviews: false})
        }
    }
    toggleIsMyLoans(){
        if(this.state.isMyLoans===false){
            this.setState({isMyLoans: true, isOneMyBook: false, isOneMyBookReviews: false, isAddBook: false})
        } else {
            this.setState({isMyLoans: false})
        }
    }
    //resets user's books to reflect newly created book
    resetMyBooks(){
        fetchAuthors()
        .then(data => this.setState({authors: data.message}))
        fetchMyBooksForUserId(this.props.nameToUserId())
        .then(data => this.setState({myBooks: data.message}))
    }
    //renders add-book or one-my-book component 
    showAddBookOrOneMyBook(){
        if (this.state.isAddBook === true && this.state.isOneMyBook === false) {
            return(
                <AddBook 
                //userIdToName={this.props.userIdToName}
                  nameToUserId={this.props.nameToUserId}
                  switchCurrentViewToLibrary={this.props.switchCurrentViewToLibrary}
                  resetMyBooks={this.resetMyBooks}
                />
            )
        } else if (this.state.isOneMyBook === true){
            return(
                <OneMyBook 
                    userIdToName={this.props.userIdToName}
                    nameToUserId={this.props.nameToUserId}
                    oneMyBook={this.state.oneMyBook}
                    authors={this.state.authors}
                    ratingsForOneMyBook={this.state.ratingsForOneMyBook}
                    loanForOneMyBook={this.state.loanForOneMyBook}
                    toggleIsOneMyBookReviews={this.toggleIsOneMyBookReviews}
                    isOneMyBookReviews={this.state.isOneMyBookReviews}
                />
            )
        } else if(this.state.isMyLoans===true){
            return(
                <MyLoans 
                    userIdToName={this.props.userIdToName}
                    myLoans={this.state.myLoans}
                />
            )
        }
    }
    //fetches reviews and loan info for user's selected book
    pickOneMyBook(bookId){
        if(this.state.isAddBook===true){
            this.setState({isAddBook: false})
        }
        if(this.state.isMyLoans===true){
            this.setState({isMyLoans: false})
        }
        fetchOneBook(bookId)
        .then(data => this.setState({oneMyBook: data.message}))
        .then(()=>this.setState({isOneMyBook: true}))
        fetchRatingForBook(bookId)
        .then(data => this.setState({ratingsForOneMyBook: data.message}))
        fetchLoanForBookId(bookId)
        .then(data => this.setState({loanForOneMyBook: data.message}))
    }
    showMyBookList(){
        if (this.state.myBooks !== '') {
            return(
                <div>
                    {this.state.myBooks.map(book=> {
                        return(
                            <div 
                                className="oneBooke"
                                onClick={()=>this.pickOneMyBook(book.id)}
                                key={book.id}>
                                {book.title}
                            </div>
                        )
                    })}
                </div>
            )
        }
    }
    render() {
        return(
            <div className="columnContainerMyLibrary">
                <div className="columnContainer">
                    <div className="filterBar">                
                        <div 
                            onClick={()=>this.toggleIsAddBook()}
                            className="filterBabyMyLibrary">
                            Add a book
                        </div>
                        <div 
                            onClick={()=>this.toggleIsMyLoans()}
                            className="filterBabyMyLibrary">
                            My loans
                        </div>
                        <div className="filterBabyMyLibrary">
                            My reviews
                        </div>
                    </div>
                    <div className="title">
                        <h2>My book list:</h2>
                    </div>
                        <br></br>
                    <div className="info">
                        <div className="bbyListBooks">
                            {this.showMyBookList()}
                        </div>
                            {this.showAddBookOrOneMyBook()}
                    </div>
                </div>
            </div>            
        )
    }
}
export default MyLibrary;