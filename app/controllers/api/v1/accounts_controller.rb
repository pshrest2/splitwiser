module Api
  module V1
    class AccountsController < ApplicationController
      before_action :authorize, :set_user
      before_action :set_account, only: %i[show update destroy]

      # GET /accounts
      def index
        @accounts = @user.accounts.select(:id, :name, :status, :created_at)
        render json: @accounts, status: :ok
      end

      # GET /accounts/:id
      def show
        render json: @account
      end

      # POST /accounts
      def create
        @account = @user.accounts.build(account_params)

        api = PlaidApi::SetAccessToken.new(params[:public_token])
        api.call!(@account)

        if @account.save
          render json: @account, status: :created
        else
          render json: @account.errors, status: :unprocessable_entity
        end
      end

      # DELETE /accounts/:id
      def destroy
        @account.destroy
        head :no_content
      end

      private

      def set_user
        @user = User.find_by(sub: user_id)
      end

      def account_params
        params.require(:account).permit(:name)
      end

      def set_account
        @account = @user.accounts.find(params[:id])
      end
    end
  end
end
