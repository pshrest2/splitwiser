# == Schema Information
#
# Table name: groups
#
#  id          :bigint           not null, primary key
#  description :string
#  name        :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Group < ApplicationRecord
  has_many :user_groups
  has_many :users, through: :user_groups

  validates :name, presence: true, uniqueness: { case_sensitive: false }
end
