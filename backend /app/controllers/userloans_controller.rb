class UserloansController < ApplicationController
    def show
        @user = Loan.joins("INNER JOIN users ON loans.user_id = users.id AND users.id = #{params[:id]}")
        render json: {message: @user}
    end
end
