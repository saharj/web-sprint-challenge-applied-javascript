const axios = require("axios").default;
// STEP 3: Create article cards.
// -----------------------
// Send an HTTP GET request to the following address: https://lambda-times-api.herokuapp.com/articles
// Study the response data you get back, closely.
// You will be creating a card for each article in the response.
// This won't be as easy as just iterating over an array though.
//
// Write a function that takes a single article object and returns the following markup:
//
// <div class="card">
//   <div class="headline">{Headline of article}</div>
//   <div class="author">
//     <div class="img-container">
//       <img src={url of authors image} />
//     </div>
//     <span>By {author's name}</span>
//   </div>
// </div>
//
// Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
//
// Use your function to create a card for each of the articles, and append each card to the DOM.

const cardContainer = document.querySelector(".cards-container");

axios.get("https://lambda-times-api.herokuapp.com/articles").then((res) => {
  if (res.data && res.data.articles) {
    for (var title in res.data.articles) {
      res.data.articles[title].forEach((article) => {
        cardContainer.appendChild(Card(article));
      });
    }
  }
});

function Card(article) {
  const card = document.createElement("div");
  card.classList.add("card");

  const headline = document.createElement("div");
  headline.classList.add("headline");
  headline.innerHTML = article.headline;

  const author = document.createElement("div");
  author.classList.add("author");

  const container = document.createElement("div");
  container.classList.add("img-container");

  const image = document.createElement("img");
  image.setAttribute("src", article.authorPhoto);

  const name = document.createElement("span");
  name.innerHTML = `By ${article.authorName}`;

  container.appendChild(image);
  author.appendChild(container);
  author.appendChild(name);
  card.appendChild(headline);
  card.appendChild(author);

  card.addEventListener("click", (e) => {
    console.log(article.headline);
  });

  return card;
}
