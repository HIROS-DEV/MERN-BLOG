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

1. I didn't want to use CSS libraries like Material UI or Tailwind CSS. Insted of using these libraries, I decided to use SASS with gulp. Because, I learned how to use SASS(.scss type) recently and I would like to get used to using it. 

2. I decided to create Authentication and Authorization system with JWT(jsonwebtoken). But, I thought JWT has vulnerability for security, based on my internet research. So, I decided to use JWT in Http Only Cookies, and, I decided to use Access Token / Refresh Token system.

3. I wanted to create two routes. One route is for admin user. The other is for normal user.
In normal user route, user can read all blogs, comments and post comments. 
Of course, the user delete own comments.
But, normal user can not create a blog post.

In admin user route, admin user can do everything. Admin user can create new blog post, update past post, delete post, add comments, delete comments even if the comments wrote by the other user!!

## Notice

1. If you want to test my MERN blog site, please signin and login. If so, you can create comment as a normal user.
2. If you want to login as admin user, please use this user name and password.

<h4>email: admin@gmail.com</h4>
<h4>password: admin123</h4>

3.I know I don't need to upload gulpfile and scss files on github when used SASS. But, I would like to show my skills.
So, I deliberately upload these files.

4. The server side has been deploy in Heroku. So, it will take some time when if you connect the my MERN blog.

## If you want to challenge yourself...

The Project is curriculum of The Odin Project.
So, please free to check the url🔽

https://www.theodinproject.com/paths/full-stack-javascript/courses/nodejs/lessons/blog-api

Thank you for reading. 

And, happy coding!!!
