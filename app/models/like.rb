# Like is an assosiation between a user and a post
class Like < ApplicationRecord
  belongs_to :user
  belongs_to :post
end
