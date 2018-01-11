require 'rails_helper'

describe 'Likes API' do
  describe 'GET' do
    it 'get valid like' do
      get "/api/likes/#{Like.first.id}"
      expect(response).to be_success
      json = JSON.parse(response.body)
      expect(json['user_id']).to eq(1)
    end

    it 'get invalid like' do
      get "/api/likes/0"
      expect(response.status).to eq(404)
    end
  end

  describe 'POST' do
    before(:all) do
      @post_id = Post.last.id
      @user_id = User.last.id
    end

    it 'create like with valid attributes' do
      params = { like: {
        post_id: @post_id,
        user_id: @user_id,
      }}
      post '/api/likes', params: params.to_json, headers: { 'Content-Type': 'application/json' }
      expect(response).to be_success
    end

    it 'don\'t create like without user' do
      params = { like: {} }
      post '/api/likes', params: params.to_json, headers: { 'Content-Type': 'application/json' }
      expect(response).to_not be_success
    end

    it 'don\'t create like without post' do
      params = { like: {
        name: '',
      }}
      post '/api/likes', params: params.to_json, headers: { 'Content-Type': 'application/json' }
      expect(response).to_not be_success
    end

    it 'don\'t create like with same user and post' do
      params = { like: {
        post_id: 1,
        user_id: 2,
      }}
      post '/api/likes', params: params.to_json, headers: { 'Content-Type': 'application/json' }
      expect(response).to_not be_success
    end
  end

  describe 'DELETE' do
    it 'delete like with valid id' do
      delete "/api/likes/#{Like.last.id}"
      expect(response).to be_success
    end

    it 'don\'t delete like with invalid like id' do
      delete '/api/likes/0'
      expect(response.status).to eq(404)
    end
  end
end
