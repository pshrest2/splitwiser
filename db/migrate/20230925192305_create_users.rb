class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :email, null: false
      t.string :full_name
      t.string :profile_picture

      t.timestamps
    end
  end
end
