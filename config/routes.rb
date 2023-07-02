Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      post '/plaid/create_link_token', to: 'plaid#create_link_token'
      post '/plaid/set_access_token', to: 'plaid#set_access_token'

      get '/plaid', to: 'plaid#index'
      get '/plaid/transactions', to: 'plaid#transactions'

      get '/users/:auth0_id', to: 'users#show'
      post '/users', to: 'users#create'
      patch '/users/:auth0_id', to: 'users#update'

      post '/auth', to: 'auth#callback'
    end
  end
end
