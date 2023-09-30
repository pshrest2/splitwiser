# app/controllers/concerns/secured.rb
module Secured
  extend ActiveSupport::Concern

  REQUIRES_AUTHENTICATION = { message: 'Requires authentication' }.freeze

  BAD_CREDENTIALS = { message: 'Bad credentials' }.freeze

  MALFORMED_AUTHORIZATION_HEADER = {
    error: 'invalid_request',
    error_description: 'Authorization header value must follow this format: Bearer <access-token>',
    message: 'Bad credentials'
  }.freeze

  INSUFFICIENT_PERMISSIONS = {
    error: 'insufficient_permissions',
    error_description: 'The access token does not contain the required permissions',
    message: 'Permission denied'
  }.freeze

  def authorize
    token = token_from_request

    return if performed?

    validation_response = Auth0Client.validate_token(token)

    @decoded_token = validation_response.decoded_token

    return unless (error = validation_response.error)

    render json: INSUFFICIENT_PERMISSIONS, status: :forbidden and return unless params[:user_id] == @decoded_token[:sub]

    render json: { error: error.message }, status: error.status
  end

  def validate_permissions(permissions)
    raise 'validate_permissions needs to be called with a block' unless block_given?

    return yield if @decoded_token.validate_permissions(permissions)

    render json: INSUFFICIENT_PERMISSIONS, status: :forbidden
  end

  def validate_user
    return if @decoded_token.token[0]['sub'] == params[:user_id]

    render json: INSUFFICIENT_PERMISSIONS, status: :forbidden
  end

  private

  def token_from_request
    authorization_header_elements = request.headers['Authorization']&.split

    render json: REQUIRES_AUTHENTICATION, status: :unauthorized and return unless authorization_header_elements

    render json: MALFORMED_AUTHORIZATION_HEADER, status: :unauthorized and return unless authorization_header_elements.length == 2

    scheme, token = authorization_header_elements

    render json: BAD_CREDENTIALS, status: :unauthorized and return unless scheme.downcase == 'bearer'

    token
  end
end
