# Like is an assosiation between a user and a post
class Like < ApplicationRecord
  belongs_to :user
  belongs_to :post

  validates_uniqueness_of :user_id, where: lambda {
    Like.find_by(post_id: post_id, user_id: user_id).nil?
  }
end
