module Api
  module V1
    class TransactionsController < ApplicationController
      before_action :authorize, :validate_user, :validate_user_account

      # GET /users/:user_id/accounts/:account_id/transactions
      def index
        # TODO: add pagination
        api = PlaidApi::Transactions.new
        result = api.call(params[:account_id])

        render json: { latest_transactions: result }, status: :ok
      rescue StandardError => _e
        render_error
      end

      private

      def validate_user_account
        account = Account.find_by(id: params[:account_id], user_id: params[:user_id])
        render_error("Cannot view other's transactions", :unauthorized) unless account.present?
      end
    end
  end
end
