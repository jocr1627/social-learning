# Welcome!
My name is John Cronk. I am a software engineer located in the Pittsburgh, PA area. This repository serves three goals:
* To demonstrate a portion of my skillset as a software engineer.
* To aid in my learning of GraphQL.
* To develop a passion project of mine.

# Live Demo
The app is hosted using Heroku. You can access it [here](https://social-learning.herokuapp.com/).

# Technologies
The app is built using the following stack:
* [PostgreSQL](https://www.postgresql.org/) (Database)
* [GraphQL](http://graphql.org/) (Server-Side State Management)
* [Relay](https://facebook.github.io/relay/) (Client-Side State Management)
* [React](https://reactjs.org/) (User Interface)
* [Material UI](http://www.material-ui.com/) (UI Components)
* [Jest](https://facebook.github.io/jest/) (JavaScript Testing)

# Application
The goal of this app is to bring empathy to the internet. There is so much valuable information out there, but few ways to make sure it gets to the right people at the right time. A search engine delivers people content that matches their search terms and history. Social media delivers people content based on their friends, profile, and what's popular. Once we synthesize these ideas to create social searching, we can change lives by making learning faster and easier than it has ever been before. [Click here](https://trello.com/b/eiDwBoA0/social-learning) to see the user stories that I've created to track the work. Below are some user interactions that may help explain the long-term vision.

## General
* A student is having a hard time grasping a new subject.
* They enter a related search query, e.g. "How do Aerodynamics work?".
* They might also be prompted to enter their familiarity with the subject and they select "Beginner".
* The application returns a list of results. At the top of these results is a resource (e.g. a link or video) that matches their query.
* The student takes a look and finds the resource helpful. They rate it with 5 stars.

## Relating Users
* The student's rating from our general case is related to the query when stored in the database. Combining user ratings, their corresponding queries, and other user data, we inform the results of future queries.
* Let's say our student found the resource unhelpful. Maybe it would be helpful for someone with a better foundation, but not for a beginner. Perhaps there was a language barrier that made it difficult for the student to understand. This time they rate it with 1 star.
* When computing results for another similar user, we use this information demote the original resource, and promote something more relevant.

## Search Refinement
* After giving the content 1 star, our student wants to change their query to get a better result. They open a menu with search refinement options.
* The menu contains widgets which control for statistically identified factors in the content. One control allows the student to request multi-language support. Another asks that content is visual. A third allows them to ask for simpler content.
* Their results are updated to adjust for each factor they specified and their requests inform future queries for users like them.

## Why?
* Empathy and social networks help people learn.
* There's a lot of content to sort through on the internet.
* Much of the content is unorganized (e.g. forums) and impersonal (e.g. search engines).
* We need a way for an individual to easily find content that makes sense to them (consider age, education, language, subject familiarity etc.).
* We need a way to find content based on quality, rather than popularity.

## Existing Solutions
* Search Engines
  * Often promote results by raw textual relevance, rather than quality.
  * Don't consider the individual user enough.
* Forums
  * Takes a long time to get a result, since a user must reply to a query.
  * Require manual intervention to link queries together.
  * Replies are not always sorted by quality, rather by date posted.
