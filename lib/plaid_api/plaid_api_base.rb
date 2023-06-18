module PlaidApi
  class PlaidApiBase
    attr_reader :client

    def initialize
      configuration ||= Plaid::Configuration.new 
      configuration.server_index = Plaid::Configuration::Environment[ENV['PLAID_ENV'] || 'sandbox']
      configuration.api_key['PLAID-CLIENT-ID'] = Rails.application.credentials.dig(:plaid, :client_id)
      configuration.api_key['PLAID-SECRET'] = Rails.application.credentials.dig(:plaid, :secret)

      api_client ||= Plaid::ApiClient.new(configuration)
      @client ||= Plaid::PlaidApi.new(api_client)
    end

    private

    def log_error(err)
      body = JSON.parse(err.response_body)
      error = { 
        error: { 
          status_code: err.code, 
          error_code: body['error_code'], 
          error_message: body['error_message'], 
          error_type: body['error_type']
        }
      }.to_json

      puts error
    end
  end
end