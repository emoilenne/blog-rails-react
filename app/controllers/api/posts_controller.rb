module Api
  class PostsController < ApplicationController
    def index
      render json: Post.all
    end

    def create
      render json: Post.create(post_params)
    end

    def destroy
      render json: Post.destroy(params[:id])
    end

    def update
      post = Post.find(params[:id])
      post.update_attributes(post_params)
      render json: post
    end

    def show
      render json: Post.find(params[:id])
    end

    private

    def post_params
      params.require(:post).permit(:id, :user_id, :body)
    end
  end
end
