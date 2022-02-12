## Title
I'm Beat

## Description
A social media application that allows users to see challenges being posted and to participate in them by saving it to their challenges and creating posts for it. 

## User Stories

AS AN individual who wants to participate in challenges
I WANT a social media application that is challenge and goal based
SO THAT I can see what my friends are participating in and choose which challenges I would like to accomplish

I want to be able to save challenges that I see to my list of challenges.

I want to be able to create a post for each challenge I choose to participate in.

I want to be able to create a challenge for myself and others to participate in.


## Project Management/Planning Details

Using the kanban board in GitHub to list out tasks and assign ourselves to them
Using figma to create the basic layout/design for the application

## Breakdown of Models and Relations

USER
id
username
password

CHALLENGE
id
category_id
title
description
length

POSTS
id
challenge_id
picture
words

CATEGORY(add if there's time)
id
name

USERCHALLENGE
id
user_id
challenge_id

User belongs to many challenges through user_challenge
Challenges belong to many Users through user_challenge

Users have many posts
Posts belong to Users

Category has many challenges
Challenges belong to Category
