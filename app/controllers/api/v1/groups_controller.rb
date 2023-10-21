module Api
  module V1
    class GroupsController < ApplicationController
      before_action :authorize, :set_user
      before_action :set_group, only: %i[show update destroy]

      # GET /groups
      def index
        @groups = @user.groups.select(:id, :name, :description)
        render json: @groups, status: :ok
      end

      # GET /groups/:id
      def show
        render json: @group
      end

      # POST /groups
      def create
        @group = @user.groups.build(group_params)

        api = PlaidApi::SetAccessToken.new(params[:public_token])
        api.call!(@group)

        if @group.save
          render json: @group, status: :created
        else
          render json: @group.errors, status: :unprocessable_entity
        end
      end

      # DELETE /groups/:id
      def destroy
        @group.destroy
        head :no_content
      end

      private

      def set_user
        @user = User.find_by(sub: user_id)
      end

      def group_params
        params.require(:group).permit(:name, :description)
      end

      def set_group
        @group = @user.groups.find(params[:id])
      end
    end
  end
end
