require 'rails_helper'

RSpec.describe User, type: :model do
  before(:each) do
    @user = described_class.new
  end

  it 'is valid with valid attributes' do
    @user.name = 'test'
    expect(@user).to be_valid
  end

  it 'is not valid without name' do
    expect(@user).to_not be_valid
  end

  it 'is not valid with empty name' do
    @user.name = ''
    expect(@user).to_not be_valid
  end

  it 'is not valid with invalid name' do
    @user.name = '#hello'
    expect(@user).to_not be_valid
  end

  it 'is not valid with same name' do
    @user.name = 'InUse'
    expect(@user).to_not be_valid
  end
end
