class BooksController < ApplicationController
    before_action :authenticate_user, only: [:create, :update, :destroy]

    def index
        render json: {message: Book.all}
    end

    def show
        @book = Book.find(params[:id])
        render json: {message: @book}
    end

    def create
        @book = Book.new(book_params)
        if @book.save
            render json: {message: book_params}
        else
            render json: {message: "Error"}
        end
    end

    def update
        @book = Book.find(params[:id])
        if @book.update(book_params)
            render json: {message: book_params}
        else
            render json: {message: "Error"}
        end
    end

    def destroy
        @book = Book.find(params[:id])
        if @book.destroy
            render json: {message: ("book with id: " + (params[:id]) + " destroyed")}
        else
            render json: {message: "Error"}
        end
    end
    
    private

    def book_params
        params.permit(
            :title,
            :publication_year,
            :author_id
        )
    end
end
