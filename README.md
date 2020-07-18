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

Article Schema
![article-scraper-mongoose-aticle-schema](https://user-images.githubusercontent.com/57015344/87861341-32ed1980-c8fa-11ea-9c73-3020115276c2.png)

Atricle Scraper from sciworth.com
![article-scraper-get-scrape](https://user-images.githubusercontent.com/57015344/87861343-3d0f1800-c8fa-11ea-8a23-c129128117fe.png)

find all scrape route
![article-scraper-find-allscrape](https://user-images.githubusercontent.com/57015344/87861346-426c6280-c8fa-11ea-9b7a-331c2ccd875a.png)

jQuery ajax call to save article to database
![article-scraper-ajax-savearticle](https://user-images.githubusercontent.com/57015344/87861357-4ac49d80-c8fa-11ea-92e1-a8a12f40b290.png)

Back end updated aticles save to be true instead of false
![article-scraper-update-savearticle](https://user-images.githubusercontent.com/57015344/87861373-5c0daa00-c8fa-11ea-8361-e1faa29270d1.png)

Find all Atricles where saved is true
![actcle--scraper-find-saved](https://user-images.githubusercontent.com/57015344/87861376-692a9900-c8fa-11ea-9d74-2bf595d84b2e.png)


---

## License
MT

---

