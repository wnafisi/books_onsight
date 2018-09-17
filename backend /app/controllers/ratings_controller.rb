class RatingsController < ApplicationController
    # before_action :authenticate_user, only: [:create, :update, :destroy]

    def index
        render json: {message: Rating.all}
    end

    #SELECT * FROM ratings JOIN ratings ON (ratings.book_id = books.id) WHERE books.id = 3;
    # def show
    #     @book = Rating.joins("INNER JOIN books ON ratings.book_id = books.id AND books.id = #{params[:id]}")
    #     render json: {message: @book}
    # end

    def show
        @book = Rating.find_by_sql("SELECT ratings.id, book_id, user_id, rating, comment, title 
                                    FROM ratings JOIN books ON ratings.book_id = books.id 
                                    AND books.id = #{params[:id]}")
        render json: {message: @book}
    end

    def create
        @rating = Rating.new(rating_params)
        if @rating.save
            render json: {message: rating_params}
        else
            render json: {message: "Error"}
        end
    end

    def update
        @rating = Rating.find(params[:id])
        if @rating.update(rating_params)
            render json: {message: rating_params}
        else
            render json: {message: "Error"}
        end
    end

    def destroy
        @rating = Rating.find(params[:id])
        if @rating.destroy
            render json: {message: ("rating with id: " + (params[:id]) + " destroyed")}
        else
            render json: {message: "Error"}
        end
    end


    private

    def rating_params
        params.permit(
            :book_id,
            :user_id,
            :rating,
            :comment
        )
    end
end
