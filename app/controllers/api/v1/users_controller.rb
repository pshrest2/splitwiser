module Api
  module V1
    # app/controllers/api/v1/test_controller.rb
    class UsersController < ApplicationController
      before_action :authorize

      # GET /users/:auth0_id
      def show
        user = User.find_by(auth0_id: params[:auth0_id])
        render json: user
      end

      # POST /users
      def create
        user = User.new(user_params)

        if user.save
          render json: { message: 'user created successfully' }, status: :created
        else
          render json: { error: 'Unable to create user' }, status: :unprocessable_entity
        end
      end

      private

      def user_params
        params.require(:user).permit(:auth0_id, :name, :email)
      end
    end
  end
end
