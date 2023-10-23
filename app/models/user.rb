# == Schema Information
#
# Table name: users
#
#  id             :bigint           not null, primary key
#  email          :string           not null
#  email_verified :boolean          default(FALSE), not null
#  name           :string
#  picture        :string
#  sub            :string           not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
class User < ApplicationRecord
  has_many :user_groups
  has_many :user_expenses
  has_many :user_items
  has_many :friendships

  has_many :groups, through: :user_groups
  has_many :expenses, through: :user_expenses
  has_many :items, through: :user_items
  has_many :pending_friends, -> { where(friendships: { status: 'pending' }) }, through: :friendships, source: :friend
  has_many :friends, -> { where(friendships: { status: 'accepted' }) }, through: :friendships, source: :friend
  has_many :all_friends, through: :friendships, source: :friend

  has_many :accounts
  has_many :paid_expenses, class_name: 'Expense', foreign_key: 'owner_id'

  validates :email, presence: true, uniqueness: true
  validates :sub, presence: true, uniqueness: true

  def send_friend_request(user)
    friendships.create(friend: user)
  end

  def accept_friend_request(user)
    friendships.find_by(friend: user).update(status: 'accepted')
  end

  def decline_friend_request(user)
    friendships.find_by(friend: user).update(status: 'declined')
  end
end
