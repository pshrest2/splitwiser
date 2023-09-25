# == Schema Information
#
# Table name: accounts
#
#  id                   :bigint           not null, primary key
#  access_token         :string
#  expiration_date      :date
#  name                 :string
#  rotated_access_token :string
#  status               :string           not null
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  user_id              :string           not null
#
class Account < ApplicationRecord
  enum status: { active: "active", expired: "expired" }
end
