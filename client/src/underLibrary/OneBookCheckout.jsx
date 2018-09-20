import React, { Component } from 'react';
//api call imports
import { saveLoan } from '../services/loansApi';

class OneBookCheckout extends Component {
    constructor(props){
        super(props)
        this.state={
            isWeeksDropdown: false
        }
    }
  
    createLoan(weeks){
        if (this.props.nameToUserId()) {
            const newLoan = {"book_id": this.props.oneBook.id, 
                                "user_id": this.props.nameToUserId(), 
                                "weeks": weeks}
            const jwt = localStorage.getItem("jwt")
            saveLoan(newLoan, jwt)
            .then(()=>this.props.resetStateAfterAddedLoan(this.props.oneBook.id))
        }
    }
    //if loan record is empty, returns "avaible for checkout"
    hideWeeks(){
        window.onclick = function(event) {
            // console.log('before if')
            if (this.state.isWeeksDropdown === true && !event.target.matches('.dropdown-contentForLoan')) {
                console.log('matches if')
                this.showDropDown();
            }
        } 
    }
    showDropDown(){
        if(this.state.isWeeksDropdown === false) {
            this.setState({isWeeksDropdown: true})
        } else {
            this.setState({isWeeksDropdown: false})
        }
    }
    showWeeks(){
        if(this.state.isWeeksDropdown === true) {
            return(
                <div 
                    className="dropdown-contentForLoan">
                    <a onClick={()=>this.createLoan(1)} >1 week</a>
                    <a onClick={()=>this.createLoan(2)} >2 weeks</a>
                    <a onClick={()=>this.createLoan(3)} >3 weeks</a>
                    <a onClick={()=>this.createLoan(4)} >4 weeks</a>
                    <a onClick={()=>this.createLoan(5)} >5 weeks</a>
                </div>
            )
        }
    }
    isCheckoutEmpty(){
        if(this.props.loansForBook.length >= 1) {
            return(
                <div className="oneBookContainer">
                    <p className="oneBookUnderTitle">
                        Loan record for {this.props.oneBook.title}:
                    </p>
                    {
                    this.props.loansForBook.map(loan => {
                        return(
                            <div 
                                className="oneReview"
                                key={loan.id}
                            >
                                    <br></br>
                                <p>{loan.title} is currently on loan to user:</p>
                                <p>{this.props.userIdToName(loan.user_id)}</p>
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
                        {this.props.oneBook.title} is available for checkout</p>
                        <div className="dropdown">
                            <button 
                                onClick={()=>this.showDropDown()} 
                                className="dropbtnForLoan"
                            >Check {this.props.oneBook.title} out
                            </button>
                            {this.showWeeks()}
                        </div>
                </div>
            )
        }
    }
    //responds to checkout button
    showLoans(){
        if (this.props.isOneBookCheckout === true) {
            return(
                <div>
                    {this.isCheckoutEmpty()}
                </div>
                
            )
        }
    }
    render() {
        return(
            <div>
                {this.showLoans()}
            </div>
        ) 
    }
}
export default OneBookCheckout;