# == Schema Information
#
# Table name: user_expenses
#
#  id         :bigint           not null, primary key
#  settled    :boolean          default(FALSE)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  expense_id :bigint           not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_user_expenses_on_expense_id  (expense_id)
#  index_user_expenses_on_user_id     (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (expense_id => expenses.id)
#  fk_rails_...  (user_id => users.id)
#
class UserExpense < ApplicationRecord
  belongs_to :user
  belongs_to :expense
end
