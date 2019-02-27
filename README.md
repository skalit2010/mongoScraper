# Mongo-Scrapper
A web-scraping app developed using Mongo

## Walk Through
The application will let the user scrape news articles from Soompi website. When the user clicks on the "Scrape Article" button, a certain amount of articles will get displayed  as a card with the following information:
-Title
-Link to the Article(Click on "Go to the article link")

The user can save the article by clicking on the "Save Article" button. The saved article can be viewed by clicking on "Saved Article" link present in the Navbar. 

A note can be created in the saved article by clicking on "Create Notes" button. Once the button is clicked, a modal will get displayed for the user to create a note. As many number of notes can be created for a particular article, and the note is displayed for all the users who wants to view the note. A note can be deleted by clicking on the delte button on the side of the note.

## Dependencies
MongoDB : https://www.mongodb.com/
Express : https://expressjs.com/
Mongoose : https://www.npmjs.com/package/mongoose
Cheerio : https://www.npmjs.com/package/cheerio
body-parser : https://www.npmjs.com/package/body-parser
morgan : https://www.npmjs.com/package/morgan

## Framework used
Materialize: http://materializecss.com/getting-started.html

## Screenshots
![screenshot of the App](scraped-articles.png)
![screenshot of the App](saved-articles.png)
![screenshot of the App](create-notes.png)
![screenshot of the App](created-note.png)

## Author
Ferrin Simanungkalit