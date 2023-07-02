class CreateAccounts < ActiveRecord::Migration[7.0]
  def change
    create_table :accounts do |t|
      t.string :name, null: true
      t.string :access_token, null: false
      t.boolean :access_token_expired, null: false
      t.string :user_id, null: false

      t.timestamps
    end
  end
end
