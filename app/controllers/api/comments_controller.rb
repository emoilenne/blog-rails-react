module Api
  # Managing comments
  class CommentsController < ApplicationController
    before_action :find_comment, only: %i[show update destroy]

    def create
      comment = Comment.create(comment_params)
      if comment.valid?
        render json: comment
      else
        render json: comment.errors.messages, status: :bad_request
      end
    end

    def destroy
      render json: @comment.destroy
    end

    def update
      if @comment.update_attributes(comment_params)
        render json: @comment
      else
        render json: @comment.errors.messages, status: :bad_request
      end
    end

    def show
      render json: @comment
    end

    private

    def find_comment
      @comment = Comment.find(params[:id])
    end

    def comment_params
      params.require(:comment).permit(:id, :user_id, :post_id, :body)
    end
  end
end
