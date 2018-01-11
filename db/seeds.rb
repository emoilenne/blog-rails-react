# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user1 = User.create(name: 'user1')
user2 = User.create(name: 'user2')
user3 = User.create(name: 'user3')
user4 = User.create(name: 'InUse')

post1 = Post.create(user: user1, body: 'post1 #wow #this #is #hello #tag')
post2 = Post.create(user: user2, body: 'post2 #hello')
post3 = Post.create(user: user3, body: 'post3')
post4 = Post.create(user: user1, body: 'post4 #hello')
post5 = Post.create(user: user2, body: 'post5')
post6 = Post.create(user: user1, body: 'post6')
post7 = Post.create(user: user1, body: 'post7')
post8 = Post.create(user: user1, body: 'post8')

like1 = Like.create(user: user1, post: post1)
like2 = Like.create(user: user2, post: post1)
like3 = Like.create(user: user3, post: post1)
like4 = Like.create(user: user3, post: post3)
like5 = Like.create(user: user2, post: post3)

comment1 = Comment.create(post: post1, user: user2, body: ':)')
comment2 = Comment.create(post: post1, user: user3, body: ':)')
comment3 = Comment.create(post: post1, user: user1, body: ':)')
comment4 = Comment.create(post: post4, user: user1, body: ':)')
comment5 = Comment.create(post: post4, user: user2, body: ':)')
