# == Schema Information
#
# Table name: expenses
#
#  id             :bigint           not null, primary key
#  amount         :decimal(10, 2)
#  description    :string
#  name           :string           not null
#  paid_at        :datetime
#  receipt_url    :string
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  group_id       :bigint
#  paid_by_id     :bigint           not null
#  transaction_id :string
#
# Indexes
#
#  index_expenses_on_group_id    (group_id)
#  index_expenses_on_paid_by_id  (paid_by_id)
#
# Foreign Keys
#
#  fk_rails_...  (group_id => groups.id)
#  fk_rails_...  (paid_by_id => users.id)
#
class Expense < ApplicationRecord
  has_many :user_expenses
  has_many :users, through: :user_expenses

  has_many :items

  belongs_to :group, optional: true
end
