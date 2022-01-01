Sorry, readme file is under construction...

# MERN-BLOG

This is  MERN fullstack blog. 
(Of course, MERN means MongoDB / Express / React / Node.js).

## Demo

https://hirosdev-mern-blog.netlify.app/

## ScreenShot of the project

<img src="client/images/desktop.png"/>

## Purpose of the project

Before I started the project, I set some goals.

1. I didn't want to use CSS libraries like Material UI or Tailwind CSS. Insted of using these libraries, I decided to use SASS with gulp. Because, I learned how to use SASS recently and I would like to get used to using it. 

2. I decided to create Authentication and Authorization system with JSON WEB TOKEN. But, I thought JSONWEBTOKEN has vulnerability for security. Based on my internet research, I decided to use JSON WEB TOKEN in Http Only Cookies. And, I decided to use Access Token / Refresh Token system.

3. I wanted to create two routes. One route is for admin user. The other is for normal user.

In normal user route, user can read all blogs and post a comments. Of course, the user delete own comments.But, normal user can not post the blog.

In admin user route, admin user can do everything. Admin user can create new blog post, update past post, delete post, add comments, delete comments(even if the comments wrote the other user!!)

## Feedback of the project

Most difficult part for me, obviously creating of Authentication and Authorization system.
Because I don't know why many people use JSON WEB TOKEN.
I think (I am thinking) that JSON WEB TOKEN has vulnerability for security.


## If you want to challenge yourself...

The Project is curriculum of The Odin Project.
So, please free to check the url🔽

https://www.theodinproject.com/paths/full-stack-javascript/courses/nodejs/lessons/blog-api


Thank you for reading. 

And, happy coding!!!
