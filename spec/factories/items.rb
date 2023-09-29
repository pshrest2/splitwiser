# == Schema Information
#
# Table name: items
#
#  id         :bigint           not null, primary key
#  amount     :decimal(, )
#  name       :string
#  quantity   :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  expense_id :bigint           not null
#
# Indexes
#
#  index_items_on_expense_id  (expense_id)
#
# Foreign Keys
#
#  fk_rails_...  (expense_id => expenses.id)
#
FactoryBot.define do
  factory :item do
    name { "MyString" }
    amount { "9.99" }
    quantity { "MyString" }
    expense { nil }
  end
end
