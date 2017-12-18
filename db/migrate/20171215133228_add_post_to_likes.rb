class AddPostToLikes < ActiveRecord::Migration[5.1]
  def change
    add_reference :likes, :post, index: true, foreign_key: { on_delete: :cascade }
  end
end
