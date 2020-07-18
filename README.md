# Article-Scraper
---

## Discription
With this web app we had to make use of axios and cheerio to scrape a website. In this case I used [Sciworthy.com](www.sciworthy.com) (All article rights belong to [Sciworthy.com](www.sciworthy.com)). In the app it self there will be a scrape button.\
Hit the scrape button to store atricles to the mongoose database then hit the Home button after to render all the articles that you just stored.
You can save the Articles to read later and comment on them as well(having an issue rendering the comments to the article page at the moment).
You can also check out your saved Articles by clicking on saved Articles and from there you can delete them from your saved list if you'd like to.


Have Fun and Enjoy!  

---

## Install
Clone the git repo to your computer.

Then you will run the following command in terminal

> > `npm install`
>
> This command will download all the dependencies for you.

---

## Technologies
- HTML5
- CSS
- Mongoose
- Cheerio
- Axios
- jQuery
- Express
- Handlebars
- - express-handlebars

---

## Code Snippets

The Schema below is the setup for the articles to be stored in the database 
![article-scraper-mongoose-aticle-schema](https://user-images.githubusercontent.com/57015344/87861341-32ed1980-c8fa-11ea-9c73-3020115276c2.png)

Using axios to get a response from sciworthy.com then using cheerio to load the response and from there we can grab all the needed information(texts, image and link)
and then we can save them as a new acticle into the mongoose database
![article-scraper-get-scrape](https://user-images.githubusercontent.com/57015344/87861343-3d0f1800-c8fa-11ea-8a23-c129128117fe.png)

This route allows you to see all of the atricles where the saved boolean is marked falsed. in other words this will find all articles for the user that havent been saved to the database.
![article-scraper-find-allscrape](https://user-images.githubusercontent.com/57015344/87861346-426c6280-c8fa-11ea-9b7a-331c2ccd875a.png)

Here I am using jQuery to grab the data-id information from the front end to make a request to the back-end. 
![article-scraper-ajax-savearticle](https://user-images.githubusercontent.com/57015344/87861357-4ac49d80-c8fa-11ea-92e1-a8a12f40b290.png)

This will set the atricle with the matching id to update its saved boolean from false to true.
![article-scraper-update-savearticle](https://user-images.githubusercontent.com/57015344/87861373-5c0daa00-c8fa-11ea-8361-e1faa29270d1.png)

This code allows us to find all articles that have a boolean of true for saved.boolean. In other words this will find all articles that the user has saved to the database.
![actcle--scraper-find-saved](https://user-images.githubusercontent.com/57015344/87861376-692a9900-c8fa-11ea-9d74-2bf595d84b2e.png)


---

## License
MT

---

