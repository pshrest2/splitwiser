class Account < ApplicationRecord
  enum status: { active: "active", expired: "expired" }
end
