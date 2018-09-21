class User < ApplicationRecord
    has_many :ratings
    has_many :books, through: :ratings 
    has_many :books, through: :my_books
    has_secure_password
end
