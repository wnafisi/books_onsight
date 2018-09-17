class UserratingsController < ApplicationController
    def show
        @user = Rating.joins("INNER JOIN users ON ratings.user_id = users.id AND users.id = #{params[:id]}")
        render json: {message: @user}
    end
end
