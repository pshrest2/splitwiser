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
require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user) { build(:user) }

  it 'is a valid model' do
    expect(user).to be_valid
  end

  it 'has many groups' do
    expect(user).to have_many(:groups).through(:user_groups)
  end

  it 'is not valid without a email' do
    user.email = nil
    expect(user).not_to be_valid
  end

  describe 'friendship' do
    let(:user1) { create(:user) }
    let(:user2) { create(:user) }

    describe 'associations' do
      it { should have_many(:friendships) }
      it { should have_many(:friends).through(:friendships) }
    end

    describe 'management' do
      before do
        user1.friends << user2
      end

      it 'adds friends' do
        expect(user1.friends).to include(user2)
      end

      it 'lists friends' do
        expect(user1.friends).to eq([user2])
      end

      it 'removes friends' do
        user1.friends.delete(user2)
        expect(user1.friends).not_to include(user2)
      end
    end
  end
end
