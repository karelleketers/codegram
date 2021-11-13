/**
 * Fetch and Show the results for a single article
 * Uses window location to get the article ID
 * Fetches the article and  from the database through the API
 * Renders the article 
 * or a message
 */
const article = {

  /**
   * Initialize app
   */
  init() {
    this.newsId = '';
    this.cacheElements();
    this.registerListeners();
    this.getNewsId();
    this.fetchArticle();
  },

  /**
   * Cache DOM elements
   */
  cacheElements() {
    this.$articleContainer = document.querySelector('.article__container');
  },

  /**
   * Register listeners
   */
  registerListeners() {
    // Not sure any listeners will be needed
  },

  /**
   * Get the current article ID from window location
   * and save it in a variable
   */
  getNewsId() {
    const locationStr = (window.location).toString();
    const [, newsId] = locationStr.split('/news/');
    this.newsId = newsId;
  },

  /**
   * Fetch the correct article from the database
   * use the article ID from the window location
   */
  async fetchArticle() {
    try {
      const response = await fetch(`http://localhost:8080/api/news/${this.newsId}`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
      });
      const data = await response.json();
      this.renderArticleHTML(data);
    } catch (error) {
      console.log("caught error", error)
      // console.error(error.message);
    }
  },

  /**
   * Render the view for the article
   * @param {object} article 
   */
  renderArticleHTML(article) {
    const dateData = this.parseDate(article.createdAt);
    const output = `
    <div class="article__card ">
      <div class="article__header">
        <img class="article__thumbnail" src=${article.thumbnail} alt=${article.title}/>
      </div>
      <div class="card--info card--blog__info">
        <div class="card-info">
            <h3 class="article__title">${article.title}</h3>
            <p class="article__content">${article.content}</p></br>
            <div>
              <p>By ${article.author_firstname} ${article.author_lastname}</p>
              <p>${dateData}</p>
            </div>
        </div>
      </div>
    </div>
      `
    this.$articleContainer.innerHTML = output;
  },
  parseDate(d) {
    const timestamp = Date.parse(d);
    const date = new Date(timestamp);
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    return `${day}-${month}-${year}`
  }

}

article.init();