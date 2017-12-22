class Post < ApplicationRecord
  belongs_to :user
  has_and_belongs_to_many :tags
  has_many :comments
  has_many :likes

  validates :body, presence: true, length: { maximum: 140 }
end
