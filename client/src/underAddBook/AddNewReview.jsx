import React, { Component } from 'react';
//api call imports
import { saveRating } from '../services/ratingsApi';

class AddNewReview extends Component {
    constructor(props){
        super(props)
        this.state={
            book_id: this.props.book_id,
            user_id: this.props.nameToUserId(),
            comment: '',
            rating: '',
            isReviewSubmitted: false
        }
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.handleRating=this.handleRating.bind(this);
        
    }

    handleSubmit() {
        const jwt = localStorage.getItem("jwt")
        saveRating(this.state.book_id, this.state.user_id, this.state.rating, this.state.comment, jwt) 
        .then(()=> this.setState({isReviewSubmitted: true}))    
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    handleRating(num) {
        this.setState({ rating: num });
        const star1 = document.querySelector('.star1');
        const star2 = document.querySelector('.star2');
        const star3 = document.querySelector('.star3');
        const star4 = document.querySelector('.star4');
        const star5 = document.querySelector('.star5');
        const starArr = [star1, star2, star3, star4, star5]
            starArr.forEach(star => { star.style.color = 'rgb(42, 42, 101)' })
        if (num === 1) {
            star1.style.color = 'yellow'
        } else if (num === 2) {
            star1.style.color = 'yellow'
            star2.style.color = 'yellow'
        } else if (num === 3) {
            star1.style.color = 'yellow'
            star2.style.color = 'yellow'
            star3.style.color = 'yellow'
        } else if (num === 4) {
            star1.style.color = 'yellow'
            star2.style.color = 'yellow'
            star3.style.color = 'yellow'
            star4.style.color = 'yellow'
        } else if (num === 5) {
            star1.style.color = 'yellow'
            star2.style.color = 'yellow'
            star3.style.color = 'yellow'
            star4.style.color = 'yellow'
            star5.style.color = 'yellow'
        }
    }

    //toggles add-review-form based on add-review-button
    showAddReview(){
        if(this.props.isAddReview === true && this.state.isReviewSubmitted === false) {
            return(
                <div className="addBookForm2">
                    
                    <div className="OneBookAddReviewTitleButtons">
                        <div className="OneBookAddReviewTitle">
                            <p>Rate and review {this.props.title}</p>
                        </div>
                        
                        <div className="OneBookAddReviewButtons">
                            <div 
                                className="addReviewButton" 
                                onClick={()=>this.handleSubmit()}>
                                submit review
                            </div>
                            <div className="addReviewButton">
                                nevermind
                            </div>
                        </div>
                    </div>
                    
                    <div className="OneBookAddReviewComment">
                        <label>Review:</label>
                        <br></br><br></br>
                        <textarea rows="4" cols="50"
                            onChange={this.handleChange} 
                            value={this.state.comment}
                            type="text" 
                            name="comment" 
                            className="textReview"
                        >
                        </textarea>
                        <br></br><br></br><br></br>
                    </div>
                    
                    <div className="OneBookAddReviewStars"> 
                            <label>Rating:</label>
                            <br></br><br></br> 
                            <div className="star1">                              
                                <i className="fas fa-star" onClick={()=>this.handleRating(1)}></i>
                            </div>
                            <div className="star2">
                                <i className="fas fa-star" onClick={()=>this.handleRating(2)}></i>
                            </div>
                            <div className="star3">
                                <i className="fas fa-star" onClick={()=>this.handleRating(3)}></i>
                            </div>
                            <div className="star4">
                                <i className="fas fa-star" onClick={()=>this.handleRating(4)}></i>
                            </div>
                            <div className="star5">
                                <i className="fas fa-star" onClick={()=>this.handleRating(5)}></i>
                            </div> 
                    </div>
                    
                </div>
            )
        } else if (this.props.isAddReview === true){
            return(
                <div className="addBookForm2">
                    Your review has been submitted.
                </div>
            )
        }
    }

    render(){
        return(
            <div>
                {this.showAddReview()}
            </div>
        )
    }

}

export default AddNewReview;