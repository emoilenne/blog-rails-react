Rails.application.routes.draw do
  root 'home#index'

  namespace :api, defaults: { format: :json } do
    resources :posts, only: %i[index create destroy update show] do
      member do
        get 'comments'
        get 'tags'
        get 'likes'
      end
    end
    resources :comments, only: %i[create destroy update show]
    get '/users/find', to: 'users#name'
    resources :users, only: %i[index create destroy update show] do
      member do
        get 'posts'
      end
    end
    resources :likes, only: %i[create destroy show]
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
