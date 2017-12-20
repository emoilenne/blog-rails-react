Rails.application.routes.draw do
  root 'home#index'

  namespace :api, defaults: { format: :json } do
    resources :posts, only: [ :index, :create, :destroy, :update, :show ]
    resources :comments, only: [ :index, :create, :destroy, :update, :show ]
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
