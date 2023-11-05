Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      get   '/plaid', to: 'plaid#index'
      get   '/plaid/transactions', to: 'plaid#transactions'
      post  '/plaid/set_access_token', to: 'plaid#set_access_token'

      get   '/user', to: 'users#show_by_sub'
      get   '/users/:id', to: 'users#show'
      get   '/users', to: 'users#index'
      patch '/users', to: 'users#update'
      post  '/users', to: 'users#create'

      resources :friendships, path: 'friends'
      resources :expenses
      resources :groups
      resources :accounts do
        resources :transactions
      end
    end
  end
end
