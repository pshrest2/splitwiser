module Api
  module V1
    # app/controllers/api/v1/test_controller.rb
    class UsersController < ApplicationController
      before_action :authorize

      # GET /user
      def show
        user = User.find_by(sub: user_id)

        if user.nil?
          render_error('User not found', :not_found)
          return
        end

        render json: user, status: :ok
      end

      # PATCH /users
      def update
        user = User.find_by(sub: user_id)

        if user.nil?
          render_error('User not found', :not_found)
          return
        end

        if user.update(user_edit_params)
          render json: user, status: :ok
        else
          render_error(user.errors.full_messages)
        end
      end

      # POST /users
      def create
        user = User.find_by(sub: user_create_params[:sub]) || User.find_by(email: user_create_params[:email])

        unless user.nil?
          render_success('User already registered')
          return
        end

        user = User.new(user_create_params)

        if user.save
          render json: user, status: :ok
        else
          render_error(user.errors.full_messages)
        end
      end

      private

      def user_create_params
        params.require(:user).permit(:name, :email, :email_verified, :sub, :picture)
      end

      def user_edit_params
        params.require(:user).permit(:name, :picture)
      end
    end
  end
end
