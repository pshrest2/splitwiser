class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email, null: false
      t.boolean :email_verified, null: false, default: false
      t.string :sub, null: false
      t.string :picture

      t.timestamps
    end
  end
end
