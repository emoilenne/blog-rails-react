module Api
  class UsersController < ApplicationController
    def create
      user = User.create(user_params)
      if user.valid?
        render json: user
      else
        render json: user.errors.messages, status: :bad_request
      end
    end

    def destroy
      render json: User.destroy(params[:id])
    end

    def update
      user = User.find(params[:id])
      user.update_attributes(user_params)

      render json: user
    end

    def show
      render json: User.find_by(id: params[:id])
    end

    def name
      render json: User.find_by(name: params[:name])
    end

    private

    def user_params
      params.require(:user).permit(:id, :name)
    end
  end
end
