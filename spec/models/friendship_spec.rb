# == Schema Information
#
# Table name: friendships
#
#  id         :bigint           not null, primary key
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
require 'rails_helper'

RSpec.describe Friendship, type: :model do
  let(:user) { create(:user) }
  let(:friend) { create(:user) }
  let!(:friendship) { build(:friendship, user:, friend:) }
  subject { friendship }

  describe 'associations' do
    it { should belong_to(:user) }
    it { should belong_to(:friend).class_name('User') }
  end

  describe 'validations' do
    it { should validate_uniqueness_of(:friend_id).scoped_to(:user_id) }

    it 'prevents befriending oneself' do
      friendship.friend = user
      expect(friendship).not_to be_valid
      expect(friendship.errors[:friend]).to include("You can't befriend yourself")
    end
  end
end
