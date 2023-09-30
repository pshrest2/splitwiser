class CreateItems < ActiveRecord::Migration[7.0]
  def change
    create_table :items do |t|
      t.string :name, null: false
      t.decimal :amount, null: false
      t.string :quantity
      t.references :expense, null: false, foreign_key: true

      t.timestamps
    end
  end
end
