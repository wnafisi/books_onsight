import React, { Component } from 'react';
//api call imports
import { fetchBookForLoan } from '../services/loansApi';
import{ fetchUserRatings } from '../services/ratingsApi';
import{ fetchBooks } from '../services/booksApi';

class Users extends Component {
    constructor(props) {
        super(props)
        this.state={
            books: '',
            oneUser: '',
            loanForUser: '',
            ratingForUser: '',
            isOneUser: false,
            isOneUserReviews: false,
            isOneUserLoans: false
        }
    }
    bookIdToTitle(bookId) {
        const booksArr = this.state.books;
        const correctTitle = booksArr.filter(book => (book.id === bookId))
        return(correctTitle[0].title)
    }
    toggleIsOneUserLoans(){
        if(this.state.isOneUserLoans===false){
            this.setState({isOneUserLoans: true, isOneUserReviews: false})
        } else {
            this.setState({isOneUserLoans: false})
        }
    }
    toggleIsOneUserReviews(){
        if(this.state.isOneUserReviews===false){
            this.setState({isOneUserReviews: true, isOneUserLoans: false})
        } else {
            this.setState({isOneUserReviews: false})
        }
    }
    showOneUserReviewsLoans(){
        if (this.state.isOneUserReviews===true && this.state.ratingForUser.length >= 1) {
            return(
                <div className="oneBookContainer">
                    <p className="oneBookUnderTitle">
                        Reviews by {this.props.userIdToName(this.state.oneUser)}:
                    </p>
                        {
                        this.state.ratingForUser.map(rating => {
                            return(
                                <div 
                                    className="oneReview"
                                    key={rating.id}
                                >
                                        <br></br>
                                    <p>Review for {this.bookIdToTitle(rating.book_id)}:</p>
                                    <p>{rating.comment}</p>
                                        <br></br>
                                    <p>Stars:</p>
                                    <p>{rating.rating}</p>
                                        <br></br>
                                </div>
                            )
                        })
                        }
                </div>
            )
        } else if (this.state.isOneUserReviews===true && this.state.ratingForUser.length < 1){
            return(
                <div className="oneBookContainer">
                    <p className="oneBookUnderTitle">
                        User has no reviews.
                    </p>
                </div>
            )
        } else if (this.state.isOneUserLoans===true && this.state.loanForUser.length >= 1){
            return(
                <div className="oneBookContainer">
                    <p className="oneBookUnderTitle">
                        Books on Loan to {this.props.userIdToName(this.state.oneUser)}:
                    </p>
                        {
                        this.state.loanForUser.map(loan => {
                            return(
                                <div 
                                    className="oneReview"
                                    key={loan.id}
                                >
                                        <br></br>
                                    <p>{loan.title}</p>
                                    <p>for {loan.weeks} weeks</p>
                                        <br></br>
                                </div>
                            )
                        })
                        }
                </div>
            )
        } else if (this.state.isOneUserLoans===true && this.state.loanForUser.length < 1){
            return(
                <div className="oneBookContainer">
                    <p className="oneBookUnderTitle">
                        User has no books on loan.
                    </p>
                </div>
            )
        }
    }

    pickOneUser(userId){
        this.setState({oneUser: userId})
        fetchBooks()
        .then(data=> this.setState({books: data.message}))
        fetchBookForLoan(userId)
        .then(data => this.setState({loanForUser: data.message}))
        fetchUserRatings(userId)
        .then(data => this.setState({ratingForUser: data.message}))
        .then(()=>this.setState({isOneUser: true}))
    }
    showOneUser(){
        if(this.state.isOneUser===true){
            return(
                <div>
                <h3>{this.props.userIdToName(this.state.oneUser)}</h3>
                <div className="oneBookButtons">
                    <div
                        onClick={()=>this.toggleIsOneUserLoans()} 
                        className="oneBookReviewCheckout">
                        see user's reads
                    </div>
                    <div
                        onClick={()=>this.toggleIsOneUserReviews()} 
                        className="oneBookReviewCheckout">
                        see their reviews
                    </div>
                </div>
                {this.showOneUserReviewsLoans()}
                </div>
            )
        }
    }

    //list of users display
    showList(){
        if (this.props.users !== '') {
            return(
                <div>
                    {
                    this.props.users.map(user=> {
                        return(
                            <div 
                                onClick={()=>this.pickOneUser(user.id)}
                                className="oneBooke"
                                key={user.id}>
                                {user.email}
                            </div>
                        )
                    })
                    }
                </div>
            )
        }
    }
    render() {
        return(
            <div className="columnContainer">
                <div className="title">
                    <h2>Users list:</h2>
                </div>
                <br></br>
                <div className="info">
                    <div className="bbyListBooks">
                        {this.showList()}
                    </div>

                    <div className="bbyOneBook">
                        {this.showOneUser()}
                    </div>
                </div>
            </div>
        )
    }
}

export default Users;