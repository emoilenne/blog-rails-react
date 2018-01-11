require 'rails_helper'

describe 'Posts API' do
  describe 'GET' do
    it 'GOOD all posts' do
      get '/api/posts'
      expect(response).to be_success
      json = JSON.parse(response.body)
      expect(json.length).to eq(8)
    end

    it 'GOOD all posts sorting by date ascending' do
      get '/api/posts?sort=date&type=asc'
      expect(response).to be_success
      json = JSON.parse(response.body)
      expect(json.length).to eq(8)
      expect(json.first['id']).to eq(1)
      expect(json.second['id']).to eq(2)
    end

    it 'GOOD all posts sorting by date descending' do
      get '/api/posts?sort=date&type=desc'
      expect(response).to be_success
      json = JSON.parse(response.body)
      expect(json.length).to eq(8)
      expect(json.first['id']).to eq(8)
      expect(json.second['id']).to eq(7)
    end

    it 'GOOD all posts sorting by likes ascending' do
      get '/api/posts?sort=likes&type=asc'
      expect(response).to be_success
      json = JSON.parse(response.body)
      expect(json.length).to eq(8)
      expect(json.last['id']).to eq(1)
      expect(json[-2]['id']).to eq(3)
    end

    it 'GOOD all posts sorting by likes descending' do
      get '/api/posts?sort=likes&type=desc'
      expect(response).to be_success
      json = JSON.parse(response.body)
      expect(json.length).to eq(8)
      expect(json.first['id']).to eq(1)
      expect(json.second['id']).to eq(3)
    end

    it 'GOOD all posts sorting by comments ascending' do
      get '/api/posts?sort=comments&type=asc'
      expect(response).to be_success
      json = JSON.parse(response.body)
      expect(json.length).to eq(8)
      expect(json.last['id']).to eq(1)
      expect(json[-2]['id']).to eq(4)
    end

    it 'GOOD all posts sorting by comments descending' do
      get '/api/posts?sort=comments&type=desc'
      expect(response).to be_success
      json = JSON.parse(response.body)
      expect(json.length).to eq(8)
      expect(json.first['id']).to eq(1)
      expect(json.second['id']).to eq(4)
    end

    it 'GOOD all posts for tag' do
      get '/api/posts?tag=hello'
      expect(response).to be_success
      json = JSON.parse(response.body)
      expect(json.length).to eq(3)
    end

    it 'GOOD all posts for user' do
      get '/api/posts?username=user1'
      expect(response).to be_success
      json = JSON.parse(response.body)
      expect(json.length).to eq(5)
    end

    it 'GOOD valid post' do
      get "/api/posts/#{Post.last.id}"
      expect(response).to be_success
      json = JSON.parse(response.body)
      expect(json['body']).to eq('post8')
    end

    it 'BAD invalid post' do
      get "/api/posts/0"
      expect(response.status).to eq(404)
    end

    it 'GOOD likes' do
      get "/api/posts/#{Post.first.id}/likes"
      expect(response).to be_success
      json = JSON.parse(response.body)
      expect(json.length).to eq(3)
    end

    it 'BAD likes' do
      get '/api/posts/0/likes'
      expect(response.status).to eq(404)
    end

    it 'GOOD comments' do
      get "/api/posts/#{Post.first.id}/comments"
      expect(response).to be_success
      json = JSON.parse(response.body)
      expect(json.length).to eq(3)
    end

    it 'BAD comments' do
      get '/api/posts/0/comments'
      expect(response.status).to eq(404)
    end

    it 'GOOD tags' do
      get "/api/posts/#{Post.first.id}/tags"
      expect(response).to be_success
      json = JSON.parse(response.body)
      expect(json.length).to eq(5)
    end

    it 'BAD tags' do
      get '/api/posts/0/tags'
      expect(response.status).to eq(404)
    end
  end

  describe 'POST' do
    before(:all) do
      @user_id = User.last.id
    end

    it 'GOOD valid attributes' do
      params = { post: {
        user_id: @user_id,
        body: 'hello',
      }}
      post '/api/posts', params: params.to_json, headers: { 'Content-Type': 'application/json' }
      expect(response).to be_success
    end

    it 'BAD no body' do
      params = { post: {
        user_id: @user_id,
      }}
      post '/api/posts', params: params.to_json, headers: { 'Content-Type': 'application/json' }
      expect(response).to_not be_success
    end

    it 'BAD empty body' do
      params = { post: {
        user_id: @user_id,
        body: '',
      }}
      post '/api/posts', params: params.to_json, headers: { 'Content-Type': 'application/json' }
      expect(response).to_not be_success
    end

    it 'BAD invalid body' do
      params = { post: {
        user_id: @user_id,
        body: 'this is more than 140 characters-------------------------------------------------------------------------------------------------------------',
      }}
      post '/api/posts', params: params.to_json, headers: { 'Content-Type': 'application/json' }
      expect(response).to_not be_success
    end

    it 'BAD no user' do
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

    it 'GOOD valid attributes' do
      params = { post: {
        user_id: @user_id,
        body: 'hello :)',
      }}
      put "/api/posts/#{@post_id}", params: params.to_json, headers: { 'Content-Type': 'application/json' }
      expect(response).to be_success
    end

    it 'BAD empty body' do
      params = { post: {
        user_id: @user_id,
        body: '',
      }}
      put "/api/posts/#{@post_id}", params: params.to_json, headers: { 'Content-Type': 'application/json' }
      expect(response).to_not be_success
    end

    it 'BAD invalid body' do
      params = { post: {
        user_id: @user_id,
        body: 'this is more than 140 characters-------------------------------------------------------------------------------------------------------------',
      }}
      put "/api/posts/#{@post_id}", params: params.to_json, headers: { 'Content-Type': 'application/json' }
      expect(response).to_not be_success
    end

    it 'BAD invalid post id' do
      params = { post: {
        user_id: @user_id,
        body: 'hello :)',
      }}
      put "/api/posts/0", params: params.to_json, headers: { 'Content-Type': 'application/json' }
      expect(response.status).to eq(404)
    end
  end

  describe 'DELETE' do
    it 'GOOD valid id' do
      delete "/api/posts/#{Post.last.id}"
      expect(response).to be_success
    end

    it 'BAD invalid post id' do
      delete '/api/posts/0'
      expect(response.status).to eq(404)
    end
  end

  describe 'GET attributes' do
    before(:all) do
      @post_id = Post.first.id
    end

    it 'likes' do
      get "/api/posts/#{Post.first.id}/likes"
      expect(response).to be_success
      json = JSON.parse(response.body)
      expect(json.length).to eq(3)
    end

    it 'comments' do
      get "/api/posts/#{Post.first.id}/comments"
      expect(response).to be_success
      json = JSON.parse(response.body)
      expect(json.length).to eq(3)
    end

    it 'tags' do
      get "/api/posts/#{Post.first.id}/tags"
      expect(response).to be_success
      json = JSON.parse(response.body)
      expect(json.length).to eq(5)
    end
  end
end
