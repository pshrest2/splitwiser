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
class Account < ApplicationRecord
  enum status: { active: 'active', expired: 'expired' }

  belongs_to :user
end
