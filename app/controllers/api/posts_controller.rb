module Api
  class PostsController < ApplicationController
    def index
      posts_per_page = 30
      posts = Post.order('updated_at DESC')
      #check if page is provided and is a positive number
      if /^\d+$/ === params["page"] and params["page"].to_i > 0
        # start from page number
        posts = posts.offset((params["page"].to_i - 1) * posts_per_page)
      end
      render json: posts.limit(posts_per_page)
    end

    def create
      post = Post.create(post_params)
      if post.valid?
        render json: post
      else
        render json: post.errors.messages, status: :bad_request
      end
    end

    def destroy
      render json: Post.destroy(params[:id])
    end

    def update
      post = Post.find_by(id: params[:id])
      if post
        post.update_attributes(post_params)
      end
      render json: post
    end

    def show
      render json: Post.find_by(id: params[:id])
    end

    def comments
      render json: Post.find_by(id: params[:id]).comments.order(:updated_at)
    end

    def tags
      render json: Post.find_by(id: params[:id]).tags.order(:name)
    end

    private

    def post_params
      params.require(:post).permit(:id, :user_id, :body)
    end
  end
end
