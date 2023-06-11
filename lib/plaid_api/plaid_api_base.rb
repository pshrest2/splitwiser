module PlaidApi
  class PlaidApiBase
    private
    def client
      configuration = Plaid::Configuration.new
      configuration.server_index = Plaid::Configuration::Environment[ENV['PLAID_ENV'] || 'sandbox']
      configuration.api_key['PLAID-CLIENT-ID'] = ENV['PLAID_CLIENT_ID']
      configuration.api_key['PLAID-SECRET'] = ENV['PLAID_SECRET']
      configuration.api_key['Plaid-Version'] = '2020-09-14'
      
      api_client = Plaid::ApiClient.new(
        configuration
      )
      
      Plaid::PlaidApi.new(api_client)
    end

    def format_error(err)
      body = JSON.parse(err.response_body)
      
      {
        error: {
          status_code: err.code,
          error_code: body['error_code'],
          error_message: body['error_message'],
          error_type: body['error_type']
        }
      }
    end
  end
end