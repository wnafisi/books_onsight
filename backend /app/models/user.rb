class User < ApplicationRecord
    has_many :ratings
    has_many :books, through: :ratings
    has_secure_password
end
