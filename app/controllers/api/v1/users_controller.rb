module Api
  module V1
    # app/controllers/api/v1/test_controller.rb
    class UsersController < ApplicationController
      before_action :authorize
      before_action :set_user, only: %i[show_by_sub update]

      # GET /users
      def index
        render json: User.all
      end

      # GET /users/:id
      def show
        render json: User.find(params[:id])
      end

      # GET /user
      def show_by_sub
        render json: @user
      end

      # PATCH /users
      def update
        if @user.nil?
          render_error('User not found', :not_found)
          return
        end

        if @user.update(user_edit_params)
          render json: @user
        else
          render_error(@user.errors.full_messages)
        end
      end

      # POST /users
      def create
        @user = User.find_by(sub: user_create_params[:sub]) || User.find_by(email: user_create_params[:email])

        unless @user.nil?
          render_success('User already registered')
          return
        end

        @user = User.new(user_create_params)

        if @user.save
          render json: @user
        else
          render_error(@user.errors.full_messages)
        end
      end

      private

      def user_create_params
        params.require(:user).permit(:name, :email, :email_verified, :sub, :picture)
      end

      def user_edit_params
        params.require(:user).permit(:name, :picture)
      end

      def set_user
        @user = User.find_by(sub: user_id)
      end
    end
  end
end
