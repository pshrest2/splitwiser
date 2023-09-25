# == Schema Information
#
# Table name: accounts
#
#  id              :bigint           not null, primary key
#  access_token    :string
#  expiration_date :datetime
#  name            :string
#  status          :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  user_id         :bigint           not null
#
# Indexes
#
#  index_accounts_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
FactoryBot.define do
  factory :account do
    access_token { Faker::Code.isbn }
    expiration_date { Faker::Date.birthday }
    name { Faker::Bank.name }
    status { "active" }
    user { User.new(email: Faker::Internet.email) }
  end
end
