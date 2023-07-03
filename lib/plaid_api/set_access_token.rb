module PlaidApi
  class SetAccessToken < PlaidApiBase
    def initialize(public_token)
      @public_token = public_token
      super()
    end

    def call!(account)
      exchange_request = Plaid::ItemPublicTokenExchangeRequest.new({ public_token: @public_token })
      access_token = client.item_public_token_exchange(exchange_request).access_token

      account.update(access_token:, status: :active)
    rescue Plaid::ApiError => e
      log_error(e)
      raise e
    end
  end
end
