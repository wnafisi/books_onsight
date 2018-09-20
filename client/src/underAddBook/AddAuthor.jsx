import React, { Component } from 'react';

class AddAuthor extends Component {
    constructor(props) {
        super(props)
        this.state={
            first_name: '',
            last_name: ''
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.authorSetOff(this.state);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    render() {
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                <input
                    type='text'
                    name='first_name'
                    value={this.state.first_name}
                    onChange={this.handleChange}
                    placeholder="Author's first name"
                />
                <br></br><br></br>
                <input
                    type='text'
                    name='last_name'
                    value={this.state.last_name}
                    onChange={this.handleChange}
                    placeholder="Author's last name"
                />
                <br></br><br></br>
                        <input className="newBookButton"
                            type='submit'
                            value='add book'
                        />
                </form>
            </div>
        )
    }

}
export default AddAuthor;