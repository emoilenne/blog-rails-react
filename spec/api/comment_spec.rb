require 'rails_helper'

describe 'Comments API' do
  describe 'GET' do
    it 'get valid comment' do
      get "/api/comments/#{Comment.last.id}"
      expect(response).to be_success
      json = JSON.parse(response.body)
      expect(json['user_id']).to eq(2)
    end

    it 'get invalid comment' do
      get "/api/comments/0"
      expect(response.status).to eq(404)
    end
  end

  describe 'POST' do
    before(:all) do
      @post_id = Post.last.id
      @user_id = User.last.id
    end

    it 'create comment with valid attributes' do
      params = { comment: {
        post_id: @post_id,
        user_id: @user_id,
        body: 'hello :)'
      }}
      post '/api/comments', params: params.to_json, headers: { 'Content-Type': 'application/json' }
      expect(response).to be_success
    end

    it 'don\'t create comment without user' do
      params = { comment: {
        post_id: @post_id,
        body: 'hello :)'
      }}
      post '/api/comments', params: params.to_json, headers: { 'Content-Type': 'application/json' }
      expect(response).to_not be_success
    end

    it 'don\'t create comment without post' do
      params = { comment: {
        user_id: @user_id,
        body: 'hello :)'
      }}
      post '/api/comments', params: params.to_json, headers: { 'Content-Type': 'application/json' }
      expect(response).to_not be_success
    end

    it 'don\'t create comment without body' do
      params = { comment: {
        post_id: @post_id,
        user_id: @user_id,
      }}
      post '/api/comments', params: params.to_json, headers: { 'Content-Type': 'application/json' }
      expect(response).to_not be_success
    end
  end

  describe 'DELETE' do
    it 'delete comment with valid id' do
      delete "/api/comments/#{Comment.last.id}"
      expect(response).to be_success
    end

    it 'don\'t delete comment with invalid comment id' do
      delete '/api/comments/0'
      expect(response.status).to eq(404)
    end
  end
end
