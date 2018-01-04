class User < ApplicationRecord
  has_many :posts
  has_many :likes
  has_many :comments

  validates :name, presence: true, format: { with: /\A[a-zA-Z0-9]*\z/, message: 'can\'t have special characters, only letters and numbers' }
  validates_uniqueness_of :name
end
