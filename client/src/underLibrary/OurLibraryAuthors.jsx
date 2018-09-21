import React, { Component } from 'react';



class OurLibraryAuthors extends Component{
    constructor(props){
        super(props)
        this.state={
            isOneAuthor: false
        }
    }

    showBookForAuthor(authorId){
        const booksArr = this.props.books;
        const correctBooks = booksArr.filter(book => (book.author_id === authorId))
        return(
            <div>
                {correctBooks.map(book => {
                    return(
                        <div>
                            <h4>{book.title}</h4>
                            <h4>{book.publication_year}</h4>
                                <br></br>
                        </div>
                    )
                })}
            </div>
        )
    }

    showOneAuthor(){
        if(this.props.oneAuthor !== ''){
            const authorsArr = this.props.authors;
            const correctAuthor = authorsArr.filter(author => (author.id === this.props.oneAuthor))
            return (
                <div className="bbyOneBook">
                    <h3>{correctAuthor[0].first_name + ' ' + correctAuthor[0].last_name}</h3>
                        <br></br>
                    {this.showBookForAuthor(this.props.oneAuthor)}
                </div>
            )
        }
    }

    showAuthors(){
        if(this.props.authors !== ''){
            return(
                <div>
                    <div className="title">
                        <h2>Author list:</h2>
                    </div>
                    <div className="info">
                        <div className="bbyListBooks">
                        <div>
                            {
                            this.props.authors.map(author => {
                                return(
                                    <div 
                                        className="oneBooke"
                                        onClick={()=>this.props.pickOneAuthor(author.id)}
                                        key={author.id}>
                                        {author.first_name} {author.last_name}
                                    </div>
                                )
                            })
                            }
                        </div>
                        </div>
                            {this.showOneAuthor()}
                    </div>
                </div>
            )
        }
    }

    render(){
        return(
            <div>
          {this.showAuthors()}
          </div>
        )
    }           
}

export default OurLibraryAuthors;