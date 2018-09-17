class StarsController < ApplicationController
    def index
        render json: {message: Rating.all}
    end

#SELECT * FROM books JOIN ratings ON (ratings.book_id = books.id) WHERE ratings.rating = 3;
    def show
        @ratings = Book.joins("INNER JOIN ratings ON ratings.book_id = books.id AND ratings.rating = #{params[:id]}")
        render json: {message: @ratings}
    end

  

   



end
