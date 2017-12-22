module Api
  class TagsController < ApplicationController
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
      tag = Tag.find(params[:id])
      tag.update_attributes(tag_params)

      render json: tag
    end

    def show
      render json: Tag.find_by(id: params[:id])
    end

    def name
      render json: Tag.find_by(name: params[:name])
    end

    private

    def tag_params
      params.require(:tag).permit(:id, :name)
    end
  end
end
