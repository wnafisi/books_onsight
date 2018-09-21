import React from 'react';

function OneBookReview(props) {

    //if reviews are empty, returns an empty message
    function isReviewEmpty() {
        if (props.ratingsForBook.length >= 1) {
            return(
                <div className="oneBookContainer">
                    <p className="oneBookUnderTitle">
                        Reviews for {props.oneBook.title}:
                    </p>
                        {
                        props.ratingsForBook.map(rating => {
                            return(
                                <div 
                                    className="oneReview"
                                    key={rating.id}
                                >
                                        <br></br>
                                    <p>Review by {props.userIdToName(rating.user_id)}:</p>
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
        } else {
            return(
                <div className="oneBookContainer">
                    <p className="oneBookUnderTitle">
                        {props.oneBook.title} does not have reviews yet.
                    </p>
                </div>
            )
        }
    }

    
    //responds to see reviews button
    function showReview(){
        if (props.isOneBookReview === true) {
            return(
                <div>
                    {isReviewEmpty()}
                </div>
            )
        }
    }

    return(
        <div>
            {showReview()}
        </div>
    )
}


export default OneBookReview;