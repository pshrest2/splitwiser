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
require 'rails_helper'

RSpec.describe Group, type: :model do
  subject { build(:group) }

  it { should validate_uniqueness_of(:name).case_insensitive }

  it 'is a valid model' do
    expect(subject).to be_valid
  end

  it 'has many users' do
    expect(subject).to have_many(:users).through(:user_groups)
  end

  it 'is not valid without a name' do
    subject.name = nil
    expect(subject).not_to be_valid
  end
end
