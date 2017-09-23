import  './index.css';

const rootElement = document.getElementById('root');
let loadingStatus = true;
const NEWS_API_KEY = process.env.REACT_APP_NEWS_API_KEY;
console.log(NEWS_API_KEY);

//@API Service
const NewsAPIService = {
  getArticles(){
    return fetch(`https://newsapi.org/v1/articles?source=techcrunch&apiKey=${NEWS_API_KEY}`)
      .then(response => response.json())
      .catch(error => console.log('parsing failed', error));

  },
}

//@Classes
function Header(tag, text) {
  this.tag = tag;
  this.text = text;
}

Header.prototype.render = function(element) {
  let newElement = document.createElement(this.tag);
  newElement.innerHTML = `<h1>${this.text}</h1>`
  element.appendChild(newElement);
}

function Article(attributes) {
  for(const key in attributes) {
    this[key] = attributes[key];
  }
}

Article.prototype.render = function(element) {
  let newElement = document.createElement('div');
  newElement.className = 'news-card';
  newElement.innerHTML = `
    <h2 class = "header">${this.title}</h2>
    <img class = "image" src = ${this.urlToImage}>
    <p>${this.description}</p>
  `
  element.appendChild(newElement);
}

//functions
function checkIfLoadingAPI(element){
  if(loadingStatus) {
    let p = document.createElement('p');
    p.className = "loading";
    p.innerHTML = 'Loading...';
    element.appendChild(p);
  } else {
    document.querySelector('.loading').remove();  
  }
}

//@Dom Rendering
let header = new Header('div', 'News App');
header.render(rootElement);
checkIfLoadingAPI(rootElement, loadingStatus);

// Fetch articles
NewsAPIService
  .getArticles()
  .then(json => {
    loadingStatus = false;
    checkIfLoadingAPI(rootElement, loadingStatus);

    const articles = json.articles.map(articleAttributes => new Article(articleAttributes));

    articles.forEach(article => article.render(rootElement));
    // const ul = document.createElement('ul');
    // ul.innerHTML = renderArticles.join('');
    // rootElement.appendChild(ul);
  });
// Update loading to false
// Append articles to the element
