# Books onSight
This app allows users to share their personal library with friends, as well as get access to other user's libraries in turn. Beyound requesting books to loan from friends, users can also see what friends are reading, their reviews, and their ratings of specific books.

here's a link to the current app, (deployed on Heroku): [Books onSight](http://lonely-zoo.surge.sh/)

## Motivation
As someone who finds the richness in reading to be the sharing and discussion of ideas that come after the reading of a book, I wanted to create an app that allows not only the exchange of books, but also the exchange of ideas through user reviews and comments.

## Contribute
I'm a beginning developer and am looking to learn as much as I can. That said, feel free to submit issues and enhancement requests!

## Code style
This project uses AirBnB Javascript.

## Tech/framework used
Built with React on the front-end, and Ruby on Rails in the back-end.

## Features
* Register as user to create your own profile
* Filter books by rating or author
* Add a book to the collective library
* See reviews, ratings, and current loans on specific books
* See reviews, ratings, and current loans made by specific users
* Edit or delete your own reviews and ratings

## Code Example
Below is a snippet from './App.jsx':

```
pickOneBook(id) {
  fetchOneBook(id)
      .then(data => this.setState({ oneBook: data.message }))
  fetchRatingForBook(id) 
      .then(data => this.setState({ ratingForBook: data.message }))
  fetchLoanForBookId(id)
      .then(data => this.setState({ loanForBookId: data.message }))         
  fetchOneAuthor(id)
      .then(data => this.setState({ oneAuthor: data.message }))
  if (this.state.isAddRatingChecked === true) {
       this.setState({isAddRatingChecked: false})
       this.showRating()
  } 
} 
```

When a user clicks on a book title in 'Our library' page, 'pickOneBook' sets off a series of Api fetches to the back-end server's database that deal with requesting specific information related to an individual book. 'FetchOneBook' and 'fetchOneAuthor' call simple api fetches that return an instance of 'book' or 'author' with the requested id. 'FetchRatingForBook' and 'fetchLoanForBookId' make more complicated fetches that call across, and join multiple tables, to source the correct information, such as loans, reviews, and ratings. Finally, these calls reset various data components within the app's state, as well as the correct domain page components to render the sequestered information.

## How to install?
### Backend
* Fork and/or clone this repo
* Cd into 'backend' and 'gem install rails', if you don't have it already
* Install 'gems bundle install'
* Create the needed config, database, and load db/seeds with 'rake setup'
* Create and seed the database with 'rake db:setup'
* Finally, type 'rails s' to begin the server

### Frontend
* Cd into 'client' and type 'yarn install', and then 'yarn start'

## Credits

Thank you to the instructors at General Assembly, fellow peers, and Stack Overflow for helping solve various bugs and issues.
