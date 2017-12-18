class AddPostToComments < ActiveRecord::Migration[5.1]
  def change
    add_reference :comments, :post, index: true, foreign_key: { on_delete: :cascade }
  end
end
