# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)



User.create!([
    {email: 'admin@bananas.com', password: 'bananaKing', password_confirmation: 'bananaKing'},
    {email: 'user@bananas.com', password: 'bananaBro', password_confirmation: 'bananaBro'},
    {email: 'waseemnafisi@gmail.com', password: 'love', password_confirmation: 'love'},
    {email: 'jhmayfield00@gmail.com', password: 'love', password_confirmation: 'love'}
])

Author.create!([
    {first_name: 'Sook Nyul', last_name: 'Choi'},
    {first_name: 'Fyodor', last_name: 'Dostoevsky'},
    {first_name: 'Toni', last_name: 'Morrison'},
    {first_name: 'Jean', last_name: 'Baudrillard'},
    {first_name: 'Lauren', last_name: 'Berlant'},
    {first_name: 'Ralph', last_name: 'Ellison'},
    {first_name: 'Roland', last_name: 'Barthes'},
    {first_name: 'Albert', last_name: 'Camus'},
    {first_name: 'Chinua', last_name: 'Achebe'},
    {first_name: 'Hisham', last_name: 'Matar'},
    {first_name: 'V.S.', last_name: 'Naipaul'},
    {first_name: 'Betool', last_name: 'Khedairi'},
    {first_name: 'Anne', last_name: 'Friedberg'},
    {first_name: 'Hannah', last_name: 'Arendt'},
    {first_name: 'Vilém', last_name: 'Flusser'},
    {first_name: 'Timothy', last_name: 'Morton'},
    {first_name: 'Ernest', last_name: 'Hemingway'},
    {first_name: 'Franz', last_name: 'Kafka'},
    {first_name: 'Jamaica', last_name: 'Kincaid'},
    {first_name: 'Jacques', last_name: 'Ranciere'},
    {first_name: 'Joseph A.', last_name: 'Massad'},
    {first_name: 'Oscar', last_name: 'Wilde'},
    {first_name: 'George', last_name: 'Orwell'},
    {first_name: 'Henry', last_name: 'Adams'}
])

Book.create!([
    {title: "Year of Impossible Goodbyes", publication_year: 1991, author_id: 1},
    {title: "The Brothers Karamazov", publication_year: 1880, author_id: 2},
    {title: "Beloved", publication_year: 1987, author_id: 3},
    {title: "America", publication_year: 1986, author_id: 4},
    {title: "Cruel Optimism", publication_year: 2011, author_id: 5},
    {title: "Invisible Man", publication_year: 1952, author_id: 6},
    {title: "Mythologies", publication_year: 1957, author_id: 7},
    {title: "The Stranger", publication_year: 1942, author_id: 8},
    {title: "Things Fall Apart", publication_year: 1958, author_id: 9},
    {title: "In the Country of Men", publication_year: 2008, author_id: 10},
    {title: "A House for Mr Biswas", publication_year: 1961, author_id: 11},
    {title: "A Sky So Close", publication_year: 2002, author_id: 12},
    {title: "The Virtual Window", publication_year: 2006, author_id: 13},
    {title: "Eichmann in Jerusalem: A Report on the Banality of Evil", publication_year: 1963, author_id: 14},
    {title: "Gestures", publication_year: 1999, author_id: 15},
    {title: "Hyperobjects: Philosophy and Ecology after the End of the World", publication_year: 2013, author_id: 16},
    {title: "The Old Man and the Sea", publication_year: 1951, author_id: 17},
    {title: "The Metamorphosis", publication_year: 1915, author_id: 18},
    {title: "The Autobiography of My Mother", publication_year: 1996, author_id: 19},
    {title: "The Emancipated Spectator", publication_year: 2011, author_id: 20},
    {title: "Passwords", publication_year: 2011, author_id: 4},
    {title: "Desiring Arabs", publication_year: 2007, author_id: 21},
    {title: "The Picture of Dorian Gray", publication_year: 1890, author_id: 22},
    {title: "Animal Farm", publication_year: 1945, author_id: 23},
    {title: "The Education of Henry Adams", publication_year: 1907, author_id: 24}
])


Rating.create!([
    {book_id: 1, user_id: 2, rating: 5, comment: "year of impossible goodbyes was heart wrenching, very beautiful dark moments"},
    {book_id: 2, user_id: 2, rating: 2, comment: "long and hard to understand"},
    {book_id: 3, user_id: 1, rating: 3, comment: "cried much during this book"},
    {book_id: 2, user_id: 1, rating: 3, comment: "loved this book, the part about christ and the ghost will haunt me"},
    {book_id: 3, user_id: 3, rating: 4, comment: "cried even more than the first guy"}
])

Loan.create!([
    {book_id: 1, user_id: 2, weeks: 5},
    {book_id: 4, user_id: 2, weeks: 4},
    {book_id: 3, user_id: 1, weeks: 3},
    {book_id: 2, user_id: 1, weeks: 2},
    {book_id: 5, user_id: 3, weeks: 4}
])








