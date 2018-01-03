Rails.application.routes.draw do
  root 'home#index'

  namespace :api, defaults: { format: :json } do
    resources :posts, only: [ :index, :create, :destroy, :update, :show ] do
      member do
        get 'comments'
        get 'tags'
      end
    end
    resources :comments, only: [ :create, :destroy, :update, :show ]
    resources :users, only: [ :create, :destroy, :update, :show ]
    get 'users/name/:name', to: 'users#name'
    resources :tags, only: [ :create, :destroy, :update, :show, :posts ]
    get 'tags/name/:name', to: 'tags#name'
    get 'tags/name/:name/posts', to: 'tags#name_posts'
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
