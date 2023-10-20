module Api
  module V1
    class ExpensesController < ApplicationController
      before_action :authorize, :set_user
      before_action :set_expense, only: %i[show update destroy]

      # GET /expenses
      def index
        @expenses = @user.paid_expenses
        render json: @expenses
      end

      # GET /expenses/:id
      def show
        render json: @expense
      end

      # POST /expenses
      def create
        @expense = @user.paid_expenses.build(expense_params)

        if @expense.save
          render json: @expense, status: :created
        else
          render json: @expense.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /expenses/:id
      def update
        if @expense.update(expense_params)
          render json: @expense
        else
          render json: @expense.errors, status: :unprocessable_entity
        end
      end

      # DELETE /expenses/:id
      def destroy
        @expense.destroy
        head :no_content
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_user
        @user = User.find_by(sub: user_id)
      end

      def set_expense
        @expense = @user.paid_expenses.find(params[:id])
      end

      # Only allow a list of trusted parameters through.
      def expense_params
        params.require(:expense).permit(:amount, :description, :name, :receipt_url, :group_id, :transaction_id)
      end
    end
  end
end
