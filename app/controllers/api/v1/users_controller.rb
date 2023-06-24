module Api
  module V1
    # app/controllers/api/v1/test_controller.rb
    class TestController < ApplicationController
      before_action :authorize

      def create
        user = User.new(user_params)

        if user.save
          render json: { message: 'user created successfully' }, status: :created
        else
          render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def user_params
        params.require(:user).permit(:auth0_id, :name, :email, :phone)
      end
    end
  end
end
