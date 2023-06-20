module PlaidApi
  class SetAccessToken < PlaidApiBase
    def initialize(public_token)
      @public_token = public_token
      super()
    end

    def call
      exchange_request = Plaid::ItemPublicTokenExchangeRequest.new({ public_token: @public_token })
      access_token = client.item_public_token_exchange(exchange_request).access_token

      Rails.cache.write('plaid_access_token', access_token)
    rescue Plaid::ApiError => e
      log_error(e)
      raise e
    end
  end
end
