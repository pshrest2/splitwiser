class PlaidController < ApplicationController
  # GET /plaid/link_token
  def link_token
    link_token_api = PlaidApi::CreateLinkToken.new
    link_token = link_token_api.call

    render json: {token: link_token}, status: :ok
  rescue => e
    render json: {error: "Something went wrong"}, status: :unprocessable_entity
  end
end
