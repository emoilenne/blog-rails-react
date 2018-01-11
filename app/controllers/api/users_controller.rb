module Api
  # Managing users
  class UsersController < ApplicationController
    before_action :find_user, only: %i[update destroy show]

    def create
      user = User.new(user_params)
      if user.valid?
        user.save
        render json: user
      else
        render json: user.errors.messages, status: :bad_request
      end
    end

    def destroy
      render json: @user.destroy
    end

    def update
      if @user.update_attributes(user_params)
        render json: @user
      else
        render json: @user.errors.messages, status: :bad_request
      end
    end

    def show
      render json: @user
    end

    def name
      render json: User.find_by(name: params[:name])
    end

    private

    def find_user
      @user = User.find(params[:id])
    end

    def user_params
      params.require(:user).permit(:id, :name)
    end
  end
end
