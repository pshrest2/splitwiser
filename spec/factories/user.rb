FactoryBot.define do
  factory :user do
    email { Faker::Internet.email }
    name { Faker::Name.name }
    picture { Faker::Internet.url }
    sub { Faker::IDNumber.valid }
  end
end
