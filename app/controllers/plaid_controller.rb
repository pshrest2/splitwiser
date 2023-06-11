require 'plaid'

class PlaidController < ApplicationController
  include PlaidApi

  # GET /plaid/link_token
  def link_token
    link_token_api = PlaidApi::CreateLinkToken.new
    link_token = link_token_api.call

    render json: {token: link_token}, status: :ok
  end
end
