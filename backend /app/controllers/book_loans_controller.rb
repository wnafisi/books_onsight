class BookLoansController < ApplicationController
    # def show
    #     @loan = Book.joins("INNER JOIN loans ON loans.book_id = books.id 
    #                         JOIN users ON loans.user_id = users.id 
    #                         AND users.id = #{params[:id]}")
    #     render json: {message: @loan}
    # end

    def show
        @loan = Book.find_by_sql("SELECT loans.id, loans.user_id, loans.book_id, loans.weeks,
                                    users.email, 
                                books.id, books.title, books.publication_year, books.author_id FROM books
                             JOIN loans ON loans.book_id = books.id 
                            JOIN users ON loans.user_id = users.id 
                            AND users.id = #{params[:id]}")
        render json: {message: @loan}
    end
end
