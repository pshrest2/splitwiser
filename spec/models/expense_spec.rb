# == Schema Information
#
# Table name: expenses
#
#  id             :bigint           not null, primary key
#  amount         :decimal(10, 2)
#  description    :string
#  name           :string           not null
#  receipt_url    :string
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  group_id       :bigint
#  owner_id       :bigint           not null
#  transaction_id :string
#
# Indexes
#
#  index_expenses_on_group_id  (group_id)
#  index_expenses_on_owner_id  (owner_id)
#
# Foreign Keys
#
#  fk_rails_...  (group_id => groups.id)
#  fk_rails_...  (owner_id => users.id)
#
require 'rails_helper'

RSpec.describe Expense, type: :model do
  it { should have_many(:user_expenses) }
  it { should have_many(:users).through(:user_expenses) }
  it { should belong_to(:owner) }
  it { should have_many(:items) }
  it { should belong_to(:group).optional }
end
