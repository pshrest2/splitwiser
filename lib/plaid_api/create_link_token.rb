module PlaidApi
  class CreateLinkToken < PlaidApiBase
    def call
      # Create a link_token for the given user
      request = Plaid::LinkTokenCreateRequest.new({
        user: { client_user_id: "1" },
        client_name: ENV["CLIENT_NAME"],
        products: [ENV["PLAID_PRODUCTS"]],
        country_codes: [ENV["PLAID_COUNTRY_CODES"]],
        language: "en",
        redirect_uri: nil,
      })
      response = client.link_token_create(request)
      { link_token: response.link_token }
    rescue Plaid::ApiError => e
      format_error(e)
    end
  end
end