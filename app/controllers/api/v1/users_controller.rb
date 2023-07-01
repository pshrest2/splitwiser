module Api
  module V1
    # app/controllers/api/v1/test_controller.rb
    class UsersController < ApplicationController
      before_action :authorize

      # GET /users/:auth0_id
      def show
        @user = User.find_by(auth0_id: params[:auth0_id])
        render json: @user
      end

      # POST /users
      def create
        @user = User.new(user_params)

        if @user.save
          render_success('User created successfully', :created)
        else
          render_error('Unable to create user')
        end
      rescue StandardError => _e
        render_error
      end

      # PUT /users/:auth0_id
      def update
        @user = User.find_by(auth0_id: params[:auth0_id])
        if @user&.update(user_params)
          render_success('User updated successfully')
        else
          render_error('Cannot find user', 400)
        end
      rescue StandardError => _e
        render_error
      end

      private

      def user_params
        params.require(:user).permit(:auth0_id, :name, :email, :picture)
      end
    end
  end
end
