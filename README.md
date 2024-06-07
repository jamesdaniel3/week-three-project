# week-three-project

## Set Up Instructions


Put `cd client` and `npm install` into your terminal to get all the dependencies loaded into your local repo.
Put `cd server` and `npm install` into your terminal get all the dependencies loaded into your local repo.


## Features Explanation

Home Page:
Welcome message and navigation to different features of the app.
Recipe Page:
Display both official recipes (Edamam API) and user-generated recipes (Firestore). Ideally we would have a toggle between which we are showing.
Search/filtering feature
This might require making a more specific query to the Edamam API, rather than just displaying random recipes
Ability to save a recipe (if it is an official recipe from Edamam, you will probably need to store its recipe ID in firebase somehow)
Recipe Detail Page:
Display detailed information about a selected recipe.
Include a section at the bottom for users to leave comments and ratings, with the ability to reply to comments. And ability to upvote replies on comments and have them sorted. You do not need to be able to reply to replies.
Chatbot to get help with an individual recipe (help with instructions, general questions, etc.)
Ability to save a recipe
My Recipes Page:
Toggle between recipes you have created and recipes you have saved
Ability to navigate to recipe detail page for each recipe on this page
Ability to remove recipes from saved
Ability to delete/edit recipes you have created
Button to navigate to “Create Recipe” page
Create Recipe Page:
Allow users to create new recipes.
Admin Page: (only show when signed in to admin account)
Display all user-submitted recipes for review.
Allow admin to verify and publish recipes.
