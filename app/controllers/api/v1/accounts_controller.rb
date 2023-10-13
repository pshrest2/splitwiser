module Api
  module V1
    class AccountsController < ApplicationController
      before_action :authorize

      # GET /accounts
      def index
        @accounts = Account.where(user_id:).select(:id, :name, :status, :created_at)
        render json: @accounts, status: :ok
      end

      # POST /accounts
      def create
        @account = Account.new(account_params)
        @account.user_id = user_id

        api = PlaidApi::SetAccessToken.new(params[:public_token])
        api.call!(@account)

        if @account.save
          render_success('Account created successfully')
        else
          render_error('Could not create account')
        end
      end

      # DELETE /accounts/:id
      def destroy
        @account = Account.find_by(id: params[:id], user_id:)
        if @account.delete
          render_success('Account deleted successfully')
        else
          render_error('Could not delete account')
        end
      end

      private

      def account_params
        params.require(:account).permit(:name)
      end
    end
  end
end
