module Api
  # Managing posts
  class PostsController < ApplicationController
    before_action :find_post, only: %i[update show destroy tags likes comments]

    def index
      posts_per_page = 30
      posts = Post.get_posts(params)
      posts = posts.sort_by_param(posts, params['sort'], params['type'])
      posts = posts.offset_posts(posts, params['offset'])
      render json: posts.limit(posts_per_page)
    end

    def create
      post = Post.new(post_params)
      if post.valid?
        post.save
        render json: post
      else
        render json: post.errors.messages, status: :bad_request
      end
    end

    def destroy
      render json: @post.destroy
    end

    def update
      old_body = @post.body
      if @post.update_attributes(post_params)
        @post.update_tags(old_body, post_params[:body])
        render json: @post
      else
        render json: @post.errors.messages, status: :bad_request
      end
    end

    def show
      render json: @post
    end

    def comments
      render json: @post.comments.order(:updated_at)
    end

    def tags
      render json: @post.tags
    end

    def likes
      render json: @post.likes
    end

    private

    def find_post
      @post = Post.find(params[:id])
    end

    def post_params
      params.require(:post).permit(:id, :user_id, :body)
    end
  end
end
