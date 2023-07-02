module Api
  module V1
    # app/controllers/api/v1/test_controller.rb
    class UsersController < ApplicationController
      # before_action :authorize

      def initialize
        super
        @api ||= Auth0Api::User.new
      end

      # GET /users/:id
      def show
        user = @api.fetch(params[:id])
        render json: user, status: :ok
      end

      # PATCH /users/:id
      def update
        @api.update(params[:id], user_params)

        render_success('User updated successfully')
      rescue StandardError => _e
        render_error
      end

      private

      def user_params
        params.require(:user).permit(:name, :picture)
      end
    end
  end
end
