module Api
  class PostsController < ApplicationController
    def index
      posts_per_page = 30
      posts = Post.order('updated_at DESC')
      #check if page is provided and is a positive number
      if /\d+/ === params["page"] and params["page"].to_i > 0
        # start from page number
        posts = posts.offset((params["page"].to_i - 1) * posts_per_page)
      end
      render json: posts.limit(posts_per_page)
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
