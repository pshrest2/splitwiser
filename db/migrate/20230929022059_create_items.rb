class CreateItems < ActiveRecord::Migration[7.0]
  def change
    create_table :items do |t|
      t.string :name
      t.decimal :amount
      t.string :quantity
      t.references :expense, null: false, foreign_key: true

      t.timestamps
    end
  end
end
