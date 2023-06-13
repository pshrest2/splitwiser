module Api::V1
  class TestController < ApplicationController
    before_action :authorize

    def index
      render json: {message: "hit successfully!"}, status: :ok
    end
  end
end