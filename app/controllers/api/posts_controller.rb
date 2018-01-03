module Api
  class PostsController < ApplicationController
    before_action :find_post, only: [:update, :show, :destroy, :tags]

    def index
      posts_per_page = 1
      posts = Post.all
      #check for tag
      if /^\w+$/ === params["tag"]
        tag = Tag.find_by(name: params["tag"])
        if tag
          posts = tag.posts
        else
          render json: []
          return
        end
      end
      posts = posts.order('updated_at DESC')
      #check if page is provided and is a positive number
      if /^\d+$/ === params["offset"] and params["offset"].to_i > 0
        # start from page number
        posts = posts.offset(params["offset"])
      end
      render json: posts.limit(posts_per_page)
    end

    def create
      post = Post.create(post_params)
      if post.valid?
        post.add_tags
        render json: post
      else
        render json: post.errors.messages, status: :bad_request
      end
    end

    def destroy
      @post.remove_tags
      render json: @post.destroy
    end

    def update
      if @post
        old_body = @post.body
        @post.update_attributes(post_params)
        @post.update_tags(old_body, post_params[:body])
      end
      render json: @post
    end

    def show
      render json: @post
    end

    def comments
      render json: Post.find_by(id: params[:id]).comments.order(:updated_at)
    end

    def tags
      if @post
        render json: @post.tags.order(:name)
      else
        render json: nil
      end
    end

    private

    def find_post
      @post = Post.find_by(id: params[:id])
    end

    def post_params
      params.require(:post).permit(:id, :user_id, :body)
    end
  end
end
