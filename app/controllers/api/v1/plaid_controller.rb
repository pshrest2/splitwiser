module Api
  module V1
    # app/controllers/api/v1/plaid
    class PlaidController < ApplicationController
      before_action :authorize

      # GET /plaid
      def index
        api = PlaidApi::CreateLinkToken.new
        result = api.call

        render json: { link_token: result }, status: :ok
      rescue StandardError => _e
        render_error
      end
    end
  end
end
