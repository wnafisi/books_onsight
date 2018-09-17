import React from 'react';

function OneBookCheckout(props) {

    //if loan record is empty, returns "avaible for checkout"
    function isCheckoutEmpty(){
        if(props.loansForBook.length >= 1) {
            return(
                <div className="oneBookContainer">
                    <p className="oneBookUnderTitle">
                        Loan record for {props.oneBook.title}:
                    </p>
                    {
                    props.loansForBook.map(loan => {
                        return(
                            <div 
                                className="oneReview"
                                key={loan.id}
                            >
                                    <br></br>
                                <p>{loan.title} is currently on loan to user:</p>
                                <p>{props.userIdToName(loan.user_id)}</p>
                                <p>for {loan.weeks} weeks</p>
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
                        {props.oneBook.title} is available for checkout
                    </p>
                </div>
            )
        }
    }

    //responds to checkout button
    function showLoans(){
        if (props.isOneBookCheckout === true) {
            return(
                <div>
                    {isCheckoutEmpty()}
                </div>
                
            )
        }
    }

    return(
        <div>
            {showLoans()}
        </div>
    )
}


export default OneBookCheckout;