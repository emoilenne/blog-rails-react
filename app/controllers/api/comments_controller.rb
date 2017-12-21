module Api
  class CommentsController < ApplicationController
    def index
      # check if want to return comments for specific post
      comments = Comment.order(:updated_at)
      if /\d+/ === params["post"]
        comments = comments.where(post_id: params["post"].to_i)
      end
      render json: comments
    end

    def create
      render json: Comment.create(comment_params)
    end

    def destroy
      render json: Comment.destroy(params[:id])
    end

    def update
      comment = Comment.find(params[:id])
      comment.update_attributes(comment_params)
      render json: comment
    end

    def show
      render json: Comment.find_by(id: params[:id])
    end

    private

    def comment_params
      params.require(:comment).permit(:id, :user_id, :post_id, :body)
    end
  end
end