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
FactoryBot.define do
  factory :expense do
    name { 'MyString' }
    description { 'MyString' }
    amount { '9.99' }
    receipt_url { '' }
    owner { nil }
    group { nil }
  end
end
