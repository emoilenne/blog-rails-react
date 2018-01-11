require 'rails_helper'

RSpec.describe Post, type: :model do
  before(:each) do
    @post = described_class.new
    @user = User.new(name: 'test')
  end

  it 'is valid with valid attributes' do
    @post.user = @user
    @post.body = 'hello world'
    expect(@post).to be_valid
  end

  it 'is not valid without body' do
    @post.user = @user
    expect(@post).to_not be_valid
  end

  it 'is not valid with empty body' do
    @post.user = @user
    @post.body = ''
    expect(@post).to_not be_valid
  end

  it 'is not valid with invalid body' do
    @post.user = @user
    @post.body = 'this is more than 140 characters-------------------------------------------------------------------------------------------------------------'
    expect(@post).to_not be_valid
  end

  it 'is not valid without user' do
    @post.body = 'hello world'
    expect(@post).to_not be_valid
  end
end
