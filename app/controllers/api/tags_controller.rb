module Api
  class TagsController < ApplicationController
    before_action :find_tag, only: [:update, :show]

    def create
      tag = Tag.create(tag_params)
      if tag.valid?
        render json: tag
      else
        render json: tag.errors.messages, status: :bad_request
      end
    end

    def destroy
      render json: Tag.destroy(params[:id])
    end

    def update
      if @tag
        @tag.update_attributes(tag_params)
      else
        render json: tag
      end
    end

    def show
      render json: @tag
    end

    def name
      render json: Tag.find_by(name: params[:name])
    end

    private

    def find_tag
      @tag = Tag.find_by(id: params[:id])
    end

    def tag_params
      params.require(:tag).permit(:id, :name)
    end
  end
end
