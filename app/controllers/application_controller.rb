# Default class
class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session

  rescue_from(ActiveRecord::RecordNotFound) do |error|
    response = { error: error.to_s }
    respond_to do |format|
      format.json { render json: response, status: 404 }
    end
  end

  rescue_from(ActionController::ParameterMissing) do |error|
    response = { error: error.to_s }
    respond_to do |format|
      format.json { render json: response, status: :bad_request }
    end
  end
end
