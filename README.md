# Noteful-API!

Node.js server for the Noteful REACT application

## Endpoints

listed below are the enpoints available in the database:

1. GET folders 
    returns a list of all of the folders in the database.
2. GET notes
    returns a list of all of the notes in the database
3. GET folders/:folder_id 
    returns the corresponding folder.
4. GET notes/:note_id 
    returns the corresponding note.
5. POST folders/notes
    adds a new folder/note to the database.
6. DELETE folders/:folder_id
    deletes the corresponding folder from the database
7. DELETE notes/:note_id
    deletes the corresponding note from the database

## To Do

Still need to flesh out the tests section.

## Will be Deploying

When ready for deployment, I will add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and then I will `npm run deploy` which will push to this remote's master branch.