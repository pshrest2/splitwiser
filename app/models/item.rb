# == Schema Information
#
# Table name: items
#
#  id         :bigint           not null, primary key
#  amount     :decimal(, )      not null
#  name       :string           not null
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
class Item < ApplicationRecord
  has_many :user_items

  has_many :users, through: :user_items

  belongs_to :expense

  validates :name, presence: true
  validates :amount, presence: true
end
