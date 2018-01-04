module Api
  class LikesController < ApplicationController
    before_action :find_like, only: [:show, :destroy]

    def create
      like = Like.create(like_params)
      if like.valid?
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
      @like = Like.find_by(id: params[:id])
    end

    def like_params
      params.require(:like).permit(:id, :user_id, :post_id)
    end
  end
end
