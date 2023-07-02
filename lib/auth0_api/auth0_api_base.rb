require 'uri'
require 'net/http'

# TODO: add some error handling
module Auth0Api
  class Auth0ApiBase
    def access_token
      url = URI("#{base_url}/oauth/token")
      response = post_request(url, { client_id:, client_secret:, audience:, grant_type: 'client_credentials' })
      response['access_token']
    end

    def secure_get_request(url)
      http = setup_http_connection(url)
      request = Net::HTTP::Get.new(url)
      request['authorization'] = "Bearer #{access_token}"

      JSON.parse(http.request(request).read_body)
    end

    def secure_patch_request(url, body)
      http = setup_http_connection(url)
      request = Net::HTTP::Patch.new(url)
      request.body = body.to_json
      request['Content-Type'] = 'application/json'
      request['authorization'] = "Bearer #{access_token}"

      JSON.parse(http.request(request).read_body)
    end

    def secure_post_request(url, body)
      http = setup_http_connection(url)
      request = setup_post_request(url, body)
      request['authorization'] = "Bearer #{access_token}"

      JSON.parse(http.request(request).read_body)
    end

    def post_request(url, body)
      http = setup_http_connection(url)
      request = setup_post_request(url, body)
      JSON.parse(http.request(request).read_body)
    end

    private

    def setup_http_connection(url)
      http = Net::HTTP.new(url.host, url.port)
      http.use_ssl = true
      http.verify_mode = OpenSSL::SSL::VERIFY_NONE
      http
    end

    def setup_post_request(url, body)
      request = Net::HTTP::Post.new(url)
      request.body = body.to_json
      request['Content-Type'] = 'application/json'
      request
    end

    def base_url
      "https://#{Rails.application.credentials.dig(:auth0, :domain)}"
    end

    def audience
      "#{base_url}/api/v2/"
    end

    def client_id
      Rails.application.credentials.dig(:auth0, :client_id)
    end

    def client_secret
      Rails.application.credentials.dig(:auth0, :client_secret)
    end
  end
end
