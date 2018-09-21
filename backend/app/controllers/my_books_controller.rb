class MyBooksController < ApplicationController

    def index
        render json: {message: MyBook.all}
    end

    def show 
        @books = MyBook.find_by_sql("SELECT books.id, books.title, books.publication_year,
                                    books.author_id FROM books 
                                    JOIN my_books ON books.id = my_books.book_id 
                                    AND my_books.user_id = #{params[:id]}")
        render json: {message: @books}
    end

    def create
        @myBook = MyBook.new(myBook_params)
        if @myBook.save
            render json: {message: myBook_params}
        else
            render json: {message: "Error"}
        end
    end

    private

    def myBook_params
        params.permit(
            :book_id,
            :user_id
        )
    end

end
