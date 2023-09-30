Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      get   '/plaid', to: 'plaid#index'
      get   '/plaid/transactions', to: 'plaid#transactions'
      post  '/plaid/set_access_token', to: 'plaid#set_access_token'

      resources :users do
        resources :accounts do
          resources :transactions
        end
      end
    end
  end
end
