module Api::V1
  class PlaidController < ApplicationController
    # POST /plaid/create_link_token
    def create_link_token
      link_token_api = PlaidApi::CreateLinkToken.new
      link_token = link_token_api.call
      
      render json: {link_token: link_token}, status: :ok
    rescue => e
      render json: {error: "Something went wrong"}, status: :unprocessable_entity
    end
  end
end

