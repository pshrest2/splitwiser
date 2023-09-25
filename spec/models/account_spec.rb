# == Schema Information
#
# Table name: accounts
#
#  id              :bigint           not null, primary key
#  access_token    :string
#  expiration_date :datetime
#  name            :string
#  status          :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  user_id         :bigint           not null
#
# Indexes
#
#  index_accounts_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
require "rails_helper"

RSpec.describe Account, type: :model do
  subject { build(:account) }

  it { is_expected.to be_valid }
  it { should belong_to(:user) }

  it "allows status to be set to active" do
    account = Account.new(status: "active")
    expect(account).to be_valid
  end

  it "allows status to be set to expired" do
    account = Account.new(status: "expired")
    expect(account).to be_valid
  end

  it "raises an error if status is set to an invalid value" do
    expect { Account.new(status: "invalid_status") }.to raise_error(ArgumentError, "'invalid_status' is not a valid status")
  end
end
