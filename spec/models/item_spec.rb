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
require 'rails_helper'

RSpec.describe Item, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
