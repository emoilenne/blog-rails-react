require 'rails_helper'

RSpec.describe Comment, type: :model do
  before(:each) do
    @comment = described_class.new
    @user = User.new(name: 'test')
    @post = Post.new(user: @user, body: 'hello world')
  end

  it 'is valid with valid attributes' do
    @comment.post = @post
    @comment.user = @user
    @comment.body = ':)'
    expect(@comment).to be_valid
  end

  it 'is not valid without body' do
    @comment.post = @post
    @comment.user = @user
    expect(@comment).to_not be_valid
  end

  it 'is not valid with empty body' do
    @comment.post = @post
    @comment.user = @user
    @comment.body = ''
    expect(@comment).to_not be_valid
  end

  it 'is not valid without user' do
    @comment.post = @post
    @comment.body = ':('
    expect(@comment).to_not be_valid
  end

  it 'is not valid without post' do
    @comment.user = @user
    @comment.body = 'hello world'
    expect(@comment).to_not be_valid
  end
end
