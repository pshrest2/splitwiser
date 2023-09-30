class CreateExpenses < ActiveRecord::Migration[7.0]
  def change
    create_table :expenses do |t|
      t.string :transaction_id # Expense can belong to a transaction (comes from plaid)
      t.string :name, null: false
      t.string :description
      t.decimal :amount, precision: 10, scale: 2
      t.datetime :paid_at
      t.string :receipt_url, null: true
      t.references :paid_by, null: false, foreign_key: { to_table: :users }
      t.references :group, null: true, foreign_key: true
      t.timestamps
    end
  end
end
