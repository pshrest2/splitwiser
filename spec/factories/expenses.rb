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
FactoryBot.define do
  factory :expense do
    name { "MyString" }
    description { "MyString" }
    amount { "9.99" }
    paid_at { "2023-09-27 21:45:25" }
    receipt_url { "" }
    paid_by { nil }
    group { nil }
  end
end
