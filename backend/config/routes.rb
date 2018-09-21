Rails.application.routes.draw do
  post 'user_token' => 'user_token#create'
  resources :users

  resources :books
  
  resources :ratings 

  resources :stars

  resources :loans

  resources :authors

  resources :userloans

  resources :book_loans

  resources :userratings

  resources :my_books
end
