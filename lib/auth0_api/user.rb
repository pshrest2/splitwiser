require 'uri'

module Auth0Api
  class User < Auth0ApiBase
    def update(id, body)
      encoded_id = URI.encode_www_form_component(id)
      url = URI("#{audience}users/#{encoded_id}")
      secure_patch_request(url, body)
    end
  end
end
