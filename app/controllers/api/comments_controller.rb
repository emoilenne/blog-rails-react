module Api
  class CommentsController < ApplicationController
    def create
      comment = Comment.create(comment_params)
      if comment.valid?
        render json: comment
      else
        render json: comment.errors.messages, status: :bad_request
      end
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
