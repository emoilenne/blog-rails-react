class AddUserToLikes < ActiveRecord::Migration[5.1]
  def change
    add_reference :likes, :user, index: true, foreign_key: { on_delete: :cascade }
  end
end
