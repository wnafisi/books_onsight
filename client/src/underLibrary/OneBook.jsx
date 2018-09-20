import React, { Component } from 'react';
//component imports
import OneBookReview from './OneBookReview';
import OneBookCheckout from './OneBookCheckout';
import OneBookAddReview from './OneBookAddReview';

class OneBook extends Component {
    constructor(props) {
        super(props)
        this.state={
            isOneBookReview: false,
            isOneBookCheckout: false,
            isOneBookAddReview: false,
            isOneBookAddReviewBtn: false,
        }
        this.switchAddBookReview=this.switchAddBookReview.bind(this);
        this.resetStateAfterAddedReview=this.resetStateAfterAddedReview.bind(this);
        this.resetStateAfterAddedLoan=this.resetStateAfterAddedLoan.bind(this);
        this.removeAddReviewForm=this.removeAddReviewForm.bind(this);
    }
    componentDidMount(){
        this.setState({isOneBookReview: false,
                        isOneBookCheckout: false,
                        isOneBookAddReview: false,
                        isOneBookAddReviewBtn: false })
    }
    //pulls author name for every book
    showAuthor(author_id) {
         const authorsArr = this.props.authors;
         const correctAuthor = authorsArr.filter(author => author.id === author_id)
        return(correctAuthor[0].first_name + ' ' + correctAuthor[0].last_name)
    }
    //toggle functions for seeing the reviews and the checkout window-pages
    switchOneBookReview() {
        if(this.props.oneBook !== '' && this.state.isOneBookReview === false) {
            this.setState({ isOneBookReview: true, 
                            isOneBookAddReviewBtn: true,
                            isOneBookCheckout: false,
                        })
        } else if(this.state.isOneBookReview === true){
            this.setState({isOneBookReview: false,
                            isOneBookAddReview: false,
                            isOneBookAddReviewBtn: false})
        }
    }
    switchOneBookCheckout() {
        if(this.state.isOneBookCheckout === false) {
            this.setState({ isOneBookCheckout: true, 
                            isOneBookReview: false,
                            isOneBookAddReview: false,
                            isOneBookAddReviewBtn: false})
        } else {
            this.setState({isOneBookCheckout: false})
        }
    }
    switchAddBookReview(){
        if(this.state.isOneBookAddReview === false) {
            this.setState({isOneBookAddReview: true})
        } else {
            this.setState({isOneBookAddReview: false})
        }
    }

    //function that adds "add-review" button if initial "see-reviews" button is toggled
    addReviewBtn(){
        if (this.state.isOneBookAddReviewBtn === true) {
            return(
                <div 
                    onClick={()=>this.switchAddBookReview()}
                    className="oneBookReviewCheckout">
                    make a review
                </div>
            )
        }
    }
    removeAddReviewForm(){
        this.setState({isOneBookAddReview: false})
    }
    //resets ratings for book when a new rating is made
    resetStateAfterAddedReview(bookId) {
        this.props.resetRatingsForBook(bookId)
        this.setState({isOneBookAddReview: false})
    }
    //resets loan for book when a new loan is made
    resetStateAfterAddedLoan(bookId) {
        this.props.resetLoansForBook(bookId)
    }
    //renders basic book/author info and review/checkout buttons
    showOneBook(){
        if(this.props.oneBook !== '') {
            return(
                <div>
                    <div>
                        <h3>{this.props.oneBook.title}</h3>
                        <h4>{this.showAuthor(this.props.oneBook.author_id)}</h4>
                        <span><h4>{this.props.oneBook.publication_year}</h4></span>
                        <br></br> 
                        <div className="oneBookButtons">
                            <div 
                                onClick={()=>this.switchOneBookReview()}
                                className="oneBookReviewCheckout">
                                see reviews
                            </div>
                            {this.addReviewBtn()}
                            <div 
                                onClick={()=>this.switchOneBookCheckout()}
                                className="oneBookReviewCheckout">
                                checkout
                            </div>
                        </div>
                    </div>
                    <OneBookAddReview 
                        oneBook={this.props.oneBook}
                        isOneBookAddReview={this.state.isOneBookAddReview}
                        resetStateAfterAddedReview={this.resetStateAfterAddedReview}
                        nameToUserId={this.props.nameToUserId}
                        removeAddReviewForm={this.removeAddReviewForm}
                    />
                    <OneBookReview 
                        oneBook={this.props.oneBook}
                        isOneBookReview={this.state.isOneBookReview}
                        ratingsForBook={this.props.ratingsForBook}
                        userIdToName={this.props.userIdToName}
                    />
                    <OneBookCheckout 
                        oneBook={this.props.oneBook}
                        isOneBookCheckout={this.state.isOneBookCheckout}
                        loansForBook={this.props.loansForBook}
                        userIdToName={this.props.userIdToName}
                        nameToUserId={this.props.nameToUserId}
                        resetStateAfterAddedLoan={this.resetStateAfterAddedLoan}
                    />
                </div>
            )
        }
    }
    render() {
        return(
            <div>
            {this.showOneBook()}
            </div>
        )
    }
}

export default OneBook;