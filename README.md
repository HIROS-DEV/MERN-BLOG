Sorry, the readme.file is under construction...

# MERN-BLOG

This is my first MERN fullstack blog. 
(Of course, MERN means MongoDB / Express / React / Node.js).

The blog is for desktop / tablet / mobile phone screen (responsive).

## Demo

https://hirosdev-mern-blog.netlify.app/

## ScreenShot of the project

<img src="client/images/desktop.png"/>

## Purpose of the project

Before I started the project, I set some goals.

1. I didn't want to use CSS libraries like Material UI or Tailwind CSS. Insted of using these libraries, I decided to use SASS with gulp. Because, I learned how to use SASS recently and I would like to get used to using it. 

2. I decided to create Authentication and Authorization system with JWT(jsonwebtoken). But, I thought JWT has vulnerability for security. Based on my internet research, I decided to use JWT in Http Only Cookies. And, I decided to use Access Token / Refresh Token system.

3. I wanted to create two routes. One route is for admin user. The other is for normal user.

In normal user route, user can read all blogs and post a comments. Of course, the user delete own comments.But, normal user can not post the blog.

In admin user route, admin user can do everything. Admin user can create new blog post, update past post, delete post, add comments, delete comments(even if the comments wrote the other user!!)

## Feedback of the project

It took about two weeks to complete the project.
But, for complete the project, I had learned many things and it had took to get the knowledge about two or three months in fact.

Most difficult part for me, obviously creating of Authentication and Authorization system with JWT.
Because I couldn't understand an advantage of JWT and why so many people want to use JWT.

It was easy for me to understand JWT's concept.
JWT took information of user from serverend to frontend. 
Therefore, it is easy to reuse user's info for Authentication or Authorization without burdening server, for examle.

It is very simple concept. 
And I loved the concept.

But..., is it really?

The more I studied about JWT, the more unclear.

Because, if I set user's info in JWT on the frontend, I think that JWT have to be checked if the user's info in JWT is authentic, after all.

I thought (in fact I am thinking even now) that JWT has vulnerability for security.


## If you want to challenge yourself...

The Project is curriculum of The Odin Project.
So, please free to check the url🔽

https://www.theodinproject.com/paths/full-stack-javascript/courses/nodejs/lessons/blog-api

Thank you for reading. 

And, happy coding!!!
