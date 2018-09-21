import React, { Component } from 'react';

class OneMyBook extends Component{
    constructor(props){
        //class and state built out for possibility of edit feature
        super(props)
        this.state={
            rating_id: '',
            book_id: '',
            user_id: '',
            comment: '',
            rating: ''
        }
    }
     //pulls author name for every book
     showAuthor(author_id) {
        const authorsArr = this.props.authors;
        const correctAuthor = authorsArr.filter(author => author.id === author_id)
       return(correctAuthor[0].first_name + ' ' + correctAuthor[0].last_name)
   }
    showOneMyBook(){
        if(this.props.oneMyBook !== ''){
            return(
                <div className="oneMyBook">
                    <h3>{this.props.oneMyBook.title}</h3>
                    <h4>{this.showAuthor(this.props.oneMyBook.author_id)}</h4>
                    <span><h4>{this.props.oneMyBook.publication_year}</h4></span>
                    <br></br> 
                    <div className="oneBookButtons">
                        <div 
                            onClick={()=>this.props.toggleIsOneMyBookReviews()}
                            className="oneBookReviewCheckout">
                            see reviews
                        </div>
                    </div>
                </div>
            )
        }
    }

    showReviews(){
        if(this.props.isOneMyBookReviews === true){
            console.log("showReviews")
            return(
                <div className="oneMyBookReview">
                <div className="oneBookContainer">
                <p className="oneBookUnderTitle">
                    Reviews for {this.props.oneMyBook.title}:
                </p>
                    {
                    this.props.ratingsForOneMyBook.map(rating => {
                        return(
                            <div 
                                className="oneReview"
                                key={rating.id}
                            >
                                    <br></br>
                                <p>Review by {this.props.userIdToName(rating.user_id)}:</p>
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
                </div>
            )
        }
    }

    render(){
        return(
            <div>
            {this.showOneMyBook()}
            {this.showReviews()}
            </div>
        )
    }
}
export default OneMyBook;