class BookLoansController < ApplicationController
    def show
        @loan = Book.joins("INNER JOIN loans ON loans.book_id = books.id JOIN users ON loans.user_id = users.id AND users.id = #{params[:id]}")
        render json: {message: @loan}
    end
end
