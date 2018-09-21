import React, { Component } from "react";
import onClickOutside from "react-onclickoutside";

class WeeksDropDown extends Component {
    constructor(props){
        super(props)
        this.state={
           
        }
    }
    showWeeks(){
        if(this.props.isWeeksDropdown === true){
            return(
                <div 
                    className="dropdown-contentForLoan">
                    <a onClick={()=>this.props.createLoan(1)} >1 week</a>
                    <a onClick={()=>this.props.createLoan(2)} >2 weeks</a>
                    <a onClick={()=>this.props.createLoan(3)} >3 weeks</a>
                    <a onClick={()=>this.props.createLoan(4)} >4 weeks</a>
                    <a onClick={()=>this.props.createLoan(5)} >5 weeks</a>
                </div>
            )
        }
    }
    handleClickOutside = evt => {
      this.props.toggleIsWeeks()
    }
    render() {
        return(
            this.showWeeks()
        )
    }
  }
  
  export default onClickOutside(WeeksDropDown);