module Api
  # Managing likes
  class LikesController < ApplicationController
    before_action :find_like, only: %i[show destroy]

    def create
      like = Like.new(like_params)
      if like.valid?
        like.save
        render json: like
      else
        render json: like.errors.messages, status: :bad_request
      end
    end

    def destroy
      render json: @like.destroy
    end

    def show
      render json: @like
    end

    private

    def find_like
      @like = Like.find(params[:id])
    end

    def like_params
      params.require(:like).permit(:id, :user_id, :post_id)
    end
  end
end
