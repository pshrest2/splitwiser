module Api
  module V1
    class TransactionsController < ApplicationController
      before_action :authorize, :set_account

      # GET /accounts/:account_id/transactions
      def index
        # TODO: add pagination
        api = PlaidApi::Transactions.new
        result = api.call(params[:account_id])

        render json: { latest_transactions: result }, status: :ok
      rescue StandardError => _e
        render_error
      end

      private

      def user
        User.find_by(sub: user_id)
      end

      def set_account
        @account = user.accounts.find(params[:account_id])
      rescue ActiveRecord::RecordNotFound => _e
        render_error("Cannot view other's transactions", :unauthorized)
      end
    end
  end
end
