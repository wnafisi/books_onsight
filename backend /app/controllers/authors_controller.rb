class AuthorsController < ApplicationController
    before_action :authenticate_user, only: [:create, :update, :destroy]

    def index
        render json: {message: Author.all}
    end


    def show
        @author = Author.joins("INNER JOIN books ON authors.id = books.author_id AND books.id = #{params[:id]}")
        render json: {message: @author}
    end

    def create
        @author = Author.new(author_params)
        if @author.save
            render json: {message: author_params}
        else
            render json: {message: "Error"}
        end
    end

    def update
        @author = Author.find(params[:id])
        if @author.update(book_params)
            render json: {message: author_params}
        else
            render json: {message: "Error"}
        end
    end

    def destroy
        @author = Author.find(params[:id])
        if @author.destroy
            render json: {message: ("author with id: " + (params[:id]) + " destroyed")}
        else
            render json: {message: "Error"}
        end
    end
    
    private

    def author_params
        params.permit(
            :first_name,
            :last_name
        )
    end
end
