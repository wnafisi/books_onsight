import React from 'react';

function MyLoans(props) {
    return(
        <div className="oneMyBookReview">
        <div className="oneBookContainer">
                    <p className="oneBookUnderTitle">
                        Your loan record:
                    </p>
                        {
                        props.myLoans.map(loan => {
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
                </div>
    )
}

export default MyLoans;