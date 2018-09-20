import React, { Component } from 'react';
//component imports
import AddBook from './underAddBook/AddBook';

class MyLibrary extends Component {
    constructor(props) {
        super(props)
        this.state={
            isAddBook: false
        }
    }

    showAddBook(){
        if (this.state.isAddBook === true) {
            return(
                <AddBook 
                  userIdToName={this.props.userIdToName}
                  nameToUserId={this.props.nameToUserId}
                  switchCurrentViewToLibrary={this.props.switchCurrentViewToLibrary}
                />
            )
        }
    }

    render() {
        return(
            <div >
                <h1>My library</h1>
                <div
                    onClick={()=>this.setState({isAddBook: true})}>
                    Add a book
                </div>
                {this.showAddBook()}
            </div>
        )
    }
}
export default MyLibrary;