# == Schema Information
#
# Table name: items
#
#  id         :bigint           not null, primary key
#  amount     :decimal(, )      not null
#  name       :string           not null
#  quantity   :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  expense_id :bigint           not null
#
# Indexes
#
#  index_items_on_expense_id  (expense_id)
#
# Foreign Keys
#
#  fk_rails_...  (expense_id => expenses.id)
#
require 'rails_helper'

RSpec.describe Item, type: :model do
  let(:item) { build(:item) }

  describe 'validations' do
    it 'validates presence of name' do
      item.name = nil
      expect(item).not_to be_valid
      expect(item.errors[:name]).to include("can't be blank")
    end

    it 'validates presence of amount' do
      item.amount = nil
      expect(item).not_to be_valid
      expect(item.errors[:amount]).to include("can't be blank")
    end
  end

  describe 'associations' do
    it { should belong_to(:expense) }
    it { should have_many(:user_items) }
    it { should have_many(:users).through(:user_items) }
  end
end
