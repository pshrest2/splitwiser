module Api
  module V1
    class FriendshipsController < ApplicationController
      before_action :authorize, :set_user
      before_action :set_friend, only: %i[show update destroy]

      # GET /friends
      def index
        @friends = @user.all_friends
        render json: @friends
      end

      # GET /friends/:id
      def show
        render json: @friend
      end

      # POST /friends
      def create
        @potential_friend = User.find(friendship_params[:friend_id])
        @friendship = @user.send_friend_request(@potential_friend)

        if @friendship.save
          render json: @friendship, status: :created
        else
          render json: @friendship.errors, status: :unprocessable_entity
        end
      end

      # PUT /friends/:id
      def update
        if params[:status] == 'accept'
          @user.accept_friend_request(@friend)
          render_success('Friend request accepted')
        elsif params[:status] == 'decline'
          @user.decline_friend_request(@friend)
          render_success('Friend request rejected')
        end
      end

      # DELETE /friends/:id
      def destroy
        @friend.destroy
        head :no_content
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_user
        @user = User.find_by(sub: user_id)
      end

      def set_friend
        @friend = @user.friends.find(params[:id])
      end

      def friendship_params
        params.require(:friendship).permit(:friend_id)
      end
    end
  end
end
