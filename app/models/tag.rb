# Tag is a word in a post that starts with "#"
class Tag < ApplicationRecord
  has_and_belongs_to_many :posts

  validates :name, presence: true, format: {
    with: /\A[a-zA-Z0-9]*\z/,
    message: 'can\'t have special characters, only letters and numbers'
  }
  validates_uniqueness_of :name
end
