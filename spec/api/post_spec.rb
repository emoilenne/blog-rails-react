require 'rails_helper'

describe 'Posts API' do
  describe 'GET' do
    it 'get all posts' do
      get '/api/posts'
      expect(response).to be_success
      json = JSON.parse(response.body)
      expect(json.length).to eq(8)
    end

    it 'get all posts for tag' do
      get '/api/posts?tag=hello'
      expect(response).to be_success
      json = JSON.parse(response.body)
      expect(json.length).to eq(3)
    end

    it 'get all posts for user' do
      get '/api/posts?username=user1'
      expect(response).to be_success
      json = JSON.parse(response.body)
      expect(json.length).to eq(5)
    end

    it 'get valid post' do
      get "/api/posts/#{Post.last.id}"
      expect(response).to be_success
      json = JSON.parse(response.body)
      expect(json['body']).to eq('post8')
    end

    it 'get invalid post' do
      get "/api/posts/0"
      expect(response.status).to eq(404)
    end
  end

  describe 'POST' do
    before(:all) do
      @user_id = User.last.id
    end

    it 'create post with valid attributes' do
      params = { post: {
        user_id: @user_id,
        body: 'hello',
      }}
      post '/api/posts', params: params.to_json, headers: { 'Content-Type': 'application/json' }
      expect(response).to be_success
    end

    it 'don\'t create post without body' do
      params = { post: {
        user_id: @user_id,
      }}
      post '/api/posts', params: params.to_json, headers: { 'Content-Type': 'application/json' }
      expect(response).to_not be_success
    end

    it 'don\'t create post with empty body' do
      params = { post: {
        user_id: @user_id,
        body: '',
      }}
      post '/api/posts', params: params.to_json, headers: { 'Content-Type': 'application/json' }
      expect(response).to_not be_success
    end

    it 'don\'t create post with invalid body' do
      params = { post: {
        user_id: @user_id,
        body: 'this is more than 140 characters-------------------------------------------------------------------------------------------------------------',
      }}
      post '/api/posts', params: params.to_json, headers: { 'Content-Type': 'application/json' }
      expect(response).to_not be_success
    end

    it 'don\'t create post without user' do
      params = { post: {
        body: 'hello',
      }}
      post '/api/posts', params: params.to_json, headers: { 'Content-Type': 'application/json' }
      expect(response).to_not be_success
    end
  end

  describe 'PUT' do
    before(:all) do
      @user_id = User.first.id
      @post_id = Post.last.id
    end

    it 'update post with valid attributes' do
      params = { post: {
        user_id: @user_id,
        body: 'hello :)',
      }}
      put "/api/posts/#{@post_id}", params: params.to_json, headers: { 'Content-Type': 'application/json' }
      expect(response).to be_success
    end

    it 'don\'t update post with empty body' do
      params = { post: {
        user_id: @user_id,
        body: '',
      }}
      put "/api/posts/#{@post_id}", params: params.to_json, headers: { 'Content-Type': 'application/json' }
      expect(response).to_not be_success
    end

    it 'don\'t update post with invalid body' do
      params = { post: {
        user_id: @user_id,
        body: 'this is more than 140 characters-------------------------------------------------------------------------------------------------------------',
      }}
      put "/api/posts/#{@post_id}", params: params.to_json, headers: { 'Content-Type': 'application/json' }
      expect(response).to_not be_success
    end

    it 'don\'t update post with invalid post id' do
      params = { post: {
        user_id: @user_id,
        body: 'hello :)',
      }}
      put "/api/posts/0", params: params.to_json, headers: { 'Content-Type': 'application/json' }
      expect(response.status).to eq(404)
    end
  end

  describe 'DELETE' do
    it 'delete post with valid id' do
      delete "/api/posts/#{Post.last.id}"
      expect(response).to be_success
    end

    it 'don\'t delete post with invalid post id' do
      delete '/api/posts/0'
      expect(response.status).to eq(404)
    end
  end

  describe 'attributes' do
    before(:all) do
      @post_id = Post.first.id
    end

    it 'get likes' do
      get "/api/posts/#{@post_id}/likes"
      expect(response).to be_success
      json = JSON.parse(response.body)
      expect(json.length).to eq(3)
    end

    it 'get comments' do
      get "/api/posts/#{@post_id}/comments"
      expect(response).to be_success
      json = JSON.parse(response.body)
      expect(json.length).to eq(2)
    end

    it 'get tags' do
      get "/api/posts/#{@post_id}/tags"
      expect(response).to be_success
      json = JSON.parse(response.body)
      expect(json.length).to eq(5)
    end
  end
end
