require 'rails_helper'

RSpec.describe Tag, type: :model do
  before(:each) do
    @tag = described_class.new
  end

  it 'is valid with valid attributes' do
    @tag.name = 'test'
    expect(@tag).to be_valid
  end

  it 'is not valid without name' do
    expect(@tag).to_not be_valid
  end

  it 'is not valid with empty name' do
    @tag.name = ''
    expect(@tag).to_not be_valid
  end

  it 'is not valid with invalid name' do
    @tag.name = '#hello'
    expect(@tag).to_not be_valid
  end

  it 'is not valid with same name' do
    @tag.name = 'test'
    another_tag = described_class.create(name: 'test')
    expect(@tag).to_not be_valid
    another_tag.delete
  end
end
