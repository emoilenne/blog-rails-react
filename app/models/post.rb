class Post < ApplicationRecord
  belongs_to :user
  has_and_belongs_to_many :tags
  has_many :comments
  has_many :likes

  validates :body, presence: true, length: { maximum: 140 }

  def self.find_tags body
    return body.scan(/#\w+/).uniq.map { |tag| tag[1..-1]}
  end

  def add_tags tags = Post.find_tags(self.body)
    tags.each do |tag_name|
      tag = Tag.find_or_create_by(name: tag_name)
      self.tags << tag
    end
  end

  def remove_tags tags = self.tags
    tags.map { |tag| tag } .map do |tag|
      if tag.posts.length == 1
        tag.delete
      else
        self.tags.delete(tag)
      end
    end
  end

  def update_tags old_body, new_body
    old_tags = Post.find_tags(old_body)
    new_tags = Post.find_tags(new_body)
    same_tags = old_tags & new_tags
    old_tags = (old_tags - same_tags).map { |tag_name| Tag.find_by(name: tag_name )}
    new_tags = new_tags - same_tags
    self.remove_tags(old_tags)
    self.add_tags(new_tags)
  end
end
