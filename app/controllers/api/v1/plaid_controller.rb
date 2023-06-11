module Api::V1
  class PlaidController < ApplicationController
    attr_reader :access_token

    # POST /create_link_token
    def create_link_token
      api = PlaidApi::CreateLinkToken.new
      result = api.call
      
      render json: {link_token: result}, status: :ok
    rescue => e
      render_error
    end

    #POST /set_access_token
    def set_access_token
      api = PlaidApi::SetAccessToken.new(plaid_params[:public_token])
      api.call

      head :ok
    rescue => e
      render_error
    end

    private

    def plaid_params
      params.require(:plaid).permit(:public_token)
    end

    def render_error
      render json: {error: "Something went wrong"}, status: :unprocessable_entity
    end
  end
end

