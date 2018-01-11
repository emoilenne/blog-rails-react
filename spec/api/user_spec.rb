require 'rails_helper'

describe 'Users API' do
  describe 'GET' do
    it 'get valid user' do
      get "/api/users/#{User.first.id}"
      expect(response).to be_success
      json = JSON.parse(response.body)
      expect(json['name']).to eq('user1')
    end

    it 'get invalid user' do
      get "/api/users/0"
      expect(response.status).to eq(404)
    end

    it 'get user by valid name' do
      get '/api/users/find?name=user2'
      expect(response).to be_success
      json = JSON.parse(response.body)
      expect(json['id']).to eq(2)
    end

    it 'get user by valid name' do
      get '/api/users/find?name=user123'
      expect(response).to be_success
      json = JSON.parse(response.body)
      expect(json).to eq(nil)
    end
  end

  describe 'POST' do
    it 'create user with valid attributes' do
      params = { user: {
        name: 'hello',
      }}
      post '/api/users', params: params.to_json, headers: { 'Content-Type': 'application/json' }
      expect(response).to be_success
    end

    it 'don\'t create user without name' do
      params = { user: {} }
      post '/api/users', params: params.to_json, headers: { 'Content-Type': 'application/json' }
      expect(response).to_not be_success
    end

    it 'don\'t create user with empty name' do
      params = { user: {
        name: '',
      }}
      post '/api/users', params: params.to_json, headers: { 'Content-Type': 'application/json' }
      expect(response).to_not be_success
    end

    it 'don\'t create user with invalid name' do
      params = { user: {
        name: '#hello',
      }}
      post '/api/users', params: params.to_json, headers: { 'Content-Type': 'application/json' }
      expect(response).to_not be_success
    end

    it 'don\'t create user with same name' do
      params = { user: {
        name: 'InUse',
      }}
      post '/api/users', params: params.to_json, headers: { 'Content-Type': 'application/json' }
      expect(response).to_not be_success
    end
  end

  describe 'PUT' do
    before(:all) do
      @user_id = User.last.id
    end

    it 'update user with valid attributes' do
      params = { user: {
        name: 'HelloWorld',
      }}
      put "/api/users/#{@user_id}", params: params.to_json, headers: { 'Content-Type': 'application/json' }
      expect(response).to be_success
    end

    it 'don\'t update user with empty name' do
      params = { user: {
        name: '',
      }}
      put "/api/users/#{@user_id}", params: params.to_json, headers: { 'Content-Type': 'application/json' }
      expect(response).to_not be_success
    end

    it 'don\'t update user with invalid name' do
      params = { user: {
        name: '#hello',
      }}
      put "/api/users/#{@user_id}", params: params.to_json, headers: { 'Content-Type': 'application/json' }
      expect(response).to_not be_success
    end

    it 'don\'t update user with same name' do
      params = { user: {
        name: 'InUse',
      }}
      post '/api/users', params: params.to_json, headers: { 'Content-Type': 'application/json' }
      expect(response).to_not be_success
    end
  end

  describe 'DELETE' do
    it 'delete user with valid id' do
      delete "/api/users/#{User.last.id}"
      expect(response).to be_success
    end

    it 'don\'t delete user with invalid user id' do
      delete '/api/users/0'
      expect(response.status).to eq(404)
    end
  end
end
