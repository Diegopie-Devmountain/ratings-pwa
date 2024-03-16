# Ratings Refactor

Goal: As a developer, I want to have an organized server folder; so that I can add, update, change code without having one large file to scroll through

## Create A Server Folder

Will hold all our sever files

## Create a Config Folder

Will hold all configurations our app may need, such as our database

### Estimate

12 days --- 6 days  15 minutes

## Update Models

Have a model folder where each model can be it's own file, and a single index.js exports all our models

- Set movies in it's own file
- Set ratings in it's own file
- Set users in it's own file
- have index.js export all models

### Estimate

20 minutes; 18 minutes; 7 minutes; 23 minutes

## Update Routes

Have a routes folder where each route can be it's own file, and a single index.js exports all our routes

- Set movies routes in it's own file
- Set ratings routes in it's own file
- Set auth routes in it's own file
- have index.js export all routes

### Create middleware folder

Move custom middleware to it's own file

## Update Seeds

Move seeds into sever folder as a seeds folder
