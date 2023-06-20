module Api
  module V1
    # app/controllers/api/v1/test_controller.rb
    class TestController < ApplicationController
      before_action :authorize

      def index
        render json: { message: 'hit successfully!' }, status: :ok
      end
    end
  end
end
