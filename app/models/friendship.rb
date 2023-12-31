# == Schema Information
#
# Table name: friendships
#
#  id         :bigint           not null, primary key
#  status     :string           default("pending"), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  friend_id  :bigint           not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_friendships_on_friend_id              (friend_id)
#  index_friendships_on_user_id                (user_id)
#  index_friendships_on_user_id_and_friend_id  (user_id,friend_id) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (friend_id => users.id)
#  fk_rails_...  (user_id => users.id)
#
class Friendship < ApplicationRecord
  belongs_to :user
  belongs_to :friend, class_name: 'User'

  validates :friend_id, uniqueness: { scope: :user_id }
  validates :status, inclusion: { in: ['pending', 'accepted', 'declined'] }
  validate :cannot_befriend_self

  after_initialize :set_pending

  private

  def set_pending
    self.status ||= 'pending'
  end

  def cannot_befriend_self
    errors.add(:friend, "You can't befriend yourself") if user == friend
  end
end
