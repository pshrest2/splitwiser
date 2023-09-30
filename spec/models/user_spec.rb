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
end
