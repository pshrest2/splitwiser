class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :auth0_id, null: false
      t.string :name, null: false
      t.string :email, null: false
      t.string :picture, null: true

      t.timestamps
    end
    add_index :users, :auth0_id, unique: true
    add_index :users, :email, unique: true
  end
end
