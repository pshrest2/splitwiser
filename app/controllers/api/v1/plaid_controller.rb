module Api
  module V1
    # app/controllers/api/v1/plaid
    class PlaidController < ApplicationController
      before_action :authorize
      attr_reader :access_token

      def index
        # TODO: also check if the access token is expired
        account_linked = Rails.cache.exist?('plaid_access_token')
        render json: { account_linked: }, status: :ok
      end

      # POST /create_link_token
      def create_link_token
        api = PlaidApi::CreateLinkToken.new
        result = api.call

        render json: { link_token: result }, status: :ok
      rescue StandardError => _e
        render_error
      end

      # POST /set_access_token
      def set_access_token
        api = PlaidApi::SetAccessToken.new(plaid_params[:public_token])
        api.call

        head :ok
      rescue StandardError => _e
        render_error
      end

      # GET /transactions
      def transactions
        api = PlaidApi::Transactions.new
        result = api.call

        render json: { latest_transactions: result }, status: :ok
      rescue StandardError => _e
        render_error
      end

      private

      def plaid_params
        params.require(:plaid).permit(:public_token)
      end
    end
  end
end
