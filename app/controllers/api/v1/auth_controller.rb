module Api
  module V1
    class AuthController < ApplicationController
      def callback
        user = find_or_initialize_user

        if user.save
          render_success('User created successfully', :created)
        else
          render_error('Unable to create user')
        end
      end

      private

      def auth_params
        params.require(:auth).permit(:name, :email, :auth0_id, :picture)
      end

      def find_or_initialize_user_from_auth0_auth
        User.find_by(email: auth_params[:email]) || User.new(auth_params)
      end
    end
  end
end
