FactoryBot.define do
  factory :user do
    email { Faker::Internet.email }
    full_name { Faker::Name.name }
    profile_picture { Faker::Internet.url }
    username { Faker::Internet.username }
  end
end
