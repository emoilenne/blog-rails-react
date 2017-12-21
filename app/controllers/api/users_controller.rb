module Api
  class UsersController < ApplicationController
    def create
      render json: User.create(user_params)
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
      user = User.find_by(id: params[:id])
      if user.nil?
        user = User.find_by(name: params[:id])
      end
      render json: user
    end

    private

    def user_params
      params.require(:user).permit(:id, :name)
    end
  end
end
