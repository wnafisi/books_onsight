class LoansController < ApplicationController
    def index
        render json: {message: Loan.all}
    end

    #SELECT * FROM ratings JOIN ratings ON (ratings.book_id = books.id) WHERE books.id = 3;
    # def show
    #     @book = Loan.joins("INNER JOIN books ON loans.book_id = books.id AND books.id = #{params[:id]}")
    #     render json: {message: @book}
    # end

    def show
        @book = Loan.find_by_sql("SELECT loans.id, book_id, user_id, weeks, title
                                 FROM loans INNER JOIN books ON loans.book_id = books.id 
                                 AND books.id = #{params[:id]}")
        render json: {message: @book}
    end

        

    def create
        @loan = Loan.new(loan_params)
        if @loan.save
            render json: {message: loan_params}
        else
            render json: {message: "Error"}
        end
    end


    private

    def loan_params
        params.permit(
            :book_id,
            :user_id,
            :weeks
        )
    end
end
