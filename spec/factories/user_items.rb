# == Schema Information
#
# Table name: user_items
#
#  id          :bigint           not null, primary key
#  amount_owed :decimal(, )
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  item_id     :bigint           not null
#  user_id     :bigint           not null
#
# Indexes
#
#  index_user_items_on_item_id  (item_id)
#  index_user_items_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (item_id => items.id)
#  fk_rails_...  (user_id => users.id)
#
FactoryBot.define do
  factory :user_item do
    user { nil }
    item { nil }
    amount_owed { "9.99" }
  end
end
