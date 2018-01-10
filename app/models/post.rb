# Post is an entry with a text, it belongs to user and can have list of comments
# and tags
class Post < ApplicationRecord
  belongs_to :user
  has_and_belongs_to_many :tags
  has_many :comments
  has_many :likes

  validates :body, presence: true, length: { maximum: 140 }

  scope :username, lambda { |username|
    joins(:user).where(users: { name: username })
  }
  scope :tag, lambda { |tag|
    joins(:tags).where(tags: { name: tag })
  }
  scope :sort_date, lambda { |type|
    order(updated_at: type)
  }
  scope :sort_likes, lambda { |type|
    joins(:likes).order("COUNT(likes.id) #{type}")
  }
  scope :sort_comments, lambda { |type|
    joins(:comments).order("COUNT(comments.id) #{type}")
  }

  def self.find_tags(body)
    body.scan(/#\w+/).uniq.map { |tag| tag[1..-1] }
  end

  def add_tags(tags = Post.find_tags(body))
    tags.each do |tag_name|
      tag = Tag.find_or_create_by(name: tag_name)
      self.tags << tag
    end
  end

  def remove_tags(tags = self.tags)
    tags.map { |tag| tag } .map do |tag|
      if tag.posts.length == 1
        tag.delete
      else
        self.tags.delete(tag)
      end
    end
  end

  def update_tags(old_body, new_body)
    old_tags = Post.find_tags(old_body)
    new_tags = Post.find_tags(new_body)
    same_tags = old_tags & new_tags
    old_tags = (old_tags - same_tags).map do |tag_name|
      Tag.find_by(name: tag_name)
    end
    new_tags -= same_tags
    remove_tags(old_tags)
    add_tags(new_tags)
  end

  def self.get_posts(params)
    posts = Post.all
    posts_with_tag = /^\w+$/.match?(params['tag'])
    posts_from_username = /^\w+$/.match?(params['username'])
    posts = posts.tag(params['tag']) if posts_with_tag
    posts = posts.username(params['username']) if posts_from_username
    posts
  end

  def self.sort_by_param(posts, quality, type)
    allowed_qualities = %w[date]
    allowed_types = %w[asc desc]
    return posts unless allowed_qualities.include?(quality) &&
                        allowed_types.include?(type)
    posts.sort_date(type)
  end

  def self.offset_posts(posts, offset)
    return posts unless /^\d+$/.match?(offset) && offset.to_i > 0
    posts.offset(offset)
  end
end
