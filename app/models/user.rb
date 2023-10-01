# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  full_name       :string
#  profile_picture :string
#  username        :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  has_many :user_groups
  has_many :user_expenses
  has_many :user_items
  has_many :friendships

  has_many :groups, through: :user_groups
  has_many :expenses, through: :user_expenses
  has_many :items, through: :user_items
  has_many :friends, through: :friendships

  has_many :accounts
  has_many :paid_expenses, class_name: 'Expense', foreign_key: 'owner_id'

  validates :email, presence: true, uniqueness: true
end
