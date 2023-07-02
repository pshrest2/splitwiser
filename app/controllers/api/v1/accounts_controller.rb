module Api
  module V1
    class AccountsController < ApplicationController
      # GET /users/:user_id/accounts
      def index
        @accounts = Account.where(user_id: params[:user_id])
        render json: @accounts, status: :ok
      end

      # POST /users/:user_id/accounts
      def create
        @account = Account.new(account_params)
        api = PlaidApi::SetAccessToken.new(params[:public_token])
        api.call!(@account)

        if @account.save
          render_success("Account created successfully")
        else
          render_error("Could not create account")
        end
      end

      # DELETE /users/:user_id/accounts/:id
      def destroy
        @account = Account.find_by(id: params[:id], user_id: params[:user_id])
        if @account.delete
          render_success("Account deleted successfully")
        else 
          render_error("Could not delete account")
        end
      end

      private

      def account_params
        params.require(:account).permit(:name, :user_id)
      end
    end
  end
end

