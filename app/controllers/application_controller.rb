# app/controllers/application_controller.rb
class ApplicationController < ActionController::API
  include Secured

  def render_success(message = 'Success', status = :ok)
    render json: { message: }, status:
  end

  def render_error(message = 'Something went wrong', status = :unprocessable_entity)
    render json: { error: message }, status:
  end
end
