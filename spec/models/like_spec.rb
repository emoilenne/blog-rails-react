require 'rails_helper'

RSpec.describe Like, type: :model do
  before(:each) do
    @like = described_class.new
    @user = User.new(name: 'test')
    @post = Post.new(user: @user, body: 'hello world')
  end

  it 'is valid with valid attributes' do
    @like.post = @post
    @like.user = @user
    expect(@like).to be_valid
  end

  it 'is not valid without user' do
    @like.post = @post
    expect(@like).to_not be_valid
  end

  it 'is not valid without post' do
    @like.user = @user
    expect(@like).to_not be_valid
  end
end
