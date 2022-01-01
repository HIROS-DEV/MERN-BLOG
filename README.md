Sorry, the readme file under construction...

# MERN-BLOG

This is my first MERN stack blog. 
MERN means MongoDB / Express / React / Node.js, of course.

The blog is for desktop / tablet / mobile phone screen.(It is responsive project)

## Demo

https://hirosdev-mern-blog.netlify.app/

## ScreenShot of the project

<img src="client/images/desktop.png"/>

## Purpose of the project

Before I started the project, I set some goals.

1. I didn't want to use CSS libraries like Material UI or Tailwind CSS. Insted of using these libraries, I decided to use SASS with gulp. Because, I learned how to use SASS recently and I would like to get used to using it. 

2. I decided to create Authentication and Authorization system with JWT(jsonwebtoken). But, I thought JWT has vulnerability for security. Based on my internet research, I decided to use JWT in Http Only Cookies. And, I decided to use Access Token / Refresh Token system.

3. I wanted to create two routes. One route is for admin user. The other is for normal user.
In normal user route, user can read all blogs, comments and post a comments. 
Of course, the user delete own comments.But, normal user can not create a blog post.

In admin user route, admin user can do everything. Admin user can create new blog post, update past post, delete post, add comments, delete comments(even if the comments wrote by the other user!!)

## Feedback of the project

It took about two weeks to write code actually.
But, in fact, to complete the project, I had to learn many things.

I had to learn HTML/CSS/JavaScript fundamentals.
I had to learn React.
I had to learn Node.js.
I had to learn Express.
I had to learn Mongoose(MongoDB).

I am a 100% self-taught programmer. And I have been studying programming about one year ago.
So, in fact, it took about one year to complete the project for me.

Most challenging part for me, to create Authentication / Authorization system with JWT.

Because I couldn't understand an advantage of JWT and why so many people want to use JWT.

It was easy for me to understand JWT's concept.
JWT took information about users from backend and store in frontend. 
Therefore, it is easy to use user's info for Authentication or Authorization without burdening server.

It is very simple concept. And I loved it.
But..., is it real?

The more I studied about JWT, the more unclear.
Because, even if user's info store in JWT in the frontend, the data have to be checked whether the data is real or not.
It means JWT have to transmit data to server like a MONGODB, and it means burdening server after all, isn't it?

In addition, I thought (in fact I am thinking even now) that JWT has vulnerability for security.
Because JWT has been user's info in the front end, and anybody can read the information.

## If you want to challenge yourself...

The Project is curriculum of The Odin Project.
So, please free to check the url🔽

https://www.theodinproject.com/paths/full-stack-javascript/courses/nodejs/lessons/blog-api

Thank you for reading. 

And, happy coding!!!
