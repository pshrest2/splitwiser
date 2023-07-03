module PlaidApi
  class RotateAccessToken < PlaidApiBase
    def call!(account)
      # generate a new access_token for an item, invalidating the old one
      request = Plaid::ItemAccessTokenInvalidateRequest.new({ access_token: account.access_token })
      response = client.item_access_token_invalidate(request)

      account.update(access_token: response.new_access_token, status: :active)
    rescue Plaid::ApiError => e
      log_error(e)
      raise e
    end
  end
end
