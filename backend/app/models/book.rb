class Book < ApplicationRecord
    belongs_to :author
    has_many :ratings
    has_many :users, through: :ratings
end
