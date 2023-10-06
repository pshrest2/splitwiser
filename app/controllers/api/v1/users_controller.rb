module Api
  module V1
    # app/controllers/api/v1/test_controller.rb
    class UsersController < ApplicationController
      before_action :authorize

      def initialize
        super
        @api ||= Auth0Api::User.new
      end

      # GET /users/:sub
      def show
        user = User.find_by(params[:sub])
        render json: user, status: :ok
      end

      # PATCH /users/:id
      def update
        @api.update(params[:id], user_edit_params)

        render_success('User updated successfully')
      rescue StandardError => _e
        render_error
      end

      # POST /users
      def create
        user = User.find_by(sub: user_params[:sub]) || User.find_by(email: user_params[:email])

        if user
          render_success('User already registered')
          return
        end

        user = User.new(user_params)

        if user.save
          render_success('User created successfully')
        else
          render_error('Could not create user')
        end
      end

      private

      def user_params
        params.require(:user).permit(:name, :email, :email_verified, :sub, :picture)
      end

      def user_edit_params
        params.require(:user).permit(:name, :picture)
      end
    end
  end
end
