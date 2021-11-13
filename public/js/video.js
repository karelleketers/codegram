/**
 * Fetch and Show the results for a single course
 * Uses window location to get the course ID
 * Uses local storage to get the jwt token if present
 * Fetches the course video
 */
 const video = {
  
  /**
   * Initialize app
   */
  init() {
    this.videoId = '';
    this.video = {};
    this.cacheElements();
    this.registerListeners();
    this.getCourseId();
    this.getAuthToken();
    this.fetchCourse();
  },

  /**
   * Cache DOM elements
   */
  cacheElements() {
    this.$videoContainer = document.querySelector('.video__container');
  },
  
  /**
   * Register listeners
   */
  registerListeners() {
    // Not sure any listeners will be needed
  },

  /**
   * Get the current video ID from window location
   * and save it in a variable
   */
  getCourseId() {
    const locationStr = (window.location).toString();
    const [ , ids] = locationStr.split('/course/');
    const [, videoId] = ids.split('/')
    this.videoId = videoId;
  },

  /**
   * Get the auth token from the Storage API Localstorage
   * @returns {object} token
   */
  getAuthToken() {
    return JSON.parse(window.localStorage.getItem('jwt')) || null;
  },

  /**
   * Fetch the correct video from the database
   * use the video ID from the window location
   * use the auth token and set the header to include the token
   * for authentication
   */
  async fetchCourse() {
    try {
      const response = await fetch(`http://localhost:8080/api/videos/${this.videoId}`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken().token}`
        },
        redirect: 'follow',
      });
      const data = await response.json();
      const [ video ] = data;
      this.renderCourseHTML(video);
    } catch (error) {
      console.log("caught error", error)
      // console.error(error.message);
      this.renderNotAllowedHTML();
    }
  },
  /**
   * Render the view for the video
   * @param {object} video 
   */
  renderCourseHTML(video) {
    const capitalize = ([first,...rest]) => first.toUpperCase() + rest.join('').toLowerCase()
    const output = `
    <section class="hero">
    <div class="jumbotron__top">
      <h1>${capitalize(video.name)}</h1>
    </div>
    <div class="playButton">
      <svg class="svg--logo">${this.getSvg}</svg>
    </div>
    </section>
    `
    this.$videoContainer.innerHTML = output;
    const videoHero = document.querySelector('.video__container .hero');
    videoHero.style.backgroundImage = `url(${video.thumbnail_url})`
    const videoTitle = document.querySelector('.jumbotron__top h1')
    videoTitle.style = `text-shadow: 3px 0px 15px rgba(0,0,0,0.3); padding: 2rem;`
    const playButton = document.querySelector('.playButton');
    playButton.style = `display: flex; justify-content: center; align-items:center; position: relative`
    const playSvg = document.querySelector('.playButton svg');
    playSvg.style = `position: absolute; left: 50%; top: 50%; transform: translateX(-25%); translateY(25%); cursor: pointer`;
    playSvg.addEventListener('click', () => this.showYoutubeVideo())
  },

  /**
   * Render a message if user is not allowed to visit.
   * @returns {string} message
   */
  renderNotAllowedHTML() {
    this.$videoContainer.innerHTML = `<p class="subHeading">Uh oh! You do not have access.</p>`
  },
  showYoutubeVideo() {
    this.$videoContainer.innerHTML = `
      <div class="iframe__container">
        <iframe class="youtube" width="560" height="315" src="https://www.youtube.com/embed/PkZNo7MFNFg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    `
    const iframeContainer = document.querySelector('.iframe__container');
    if (!!iframeContainer) iframeContainer.style = "display: flex; justify-content: center;"
  },
  getSvg() {
    return `<?xml version="1.0" encoding="iso-8859-1"?>
    <!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
       width="140.221px" height="150.221px" viewBox="0 0 410.221 408.221" style="enable-background:new 0 0 408.221 408.221;"
       xml:space="preserve" fill="#db1b74">
    <g>
      <g>
        <path d="M204.11,0C91.388,0,0,91.388,0,204.111c0,112.725,91.388,204.11,204.11,204.11c112.729,0,204.11-91.385,204.11-204.11
          C408.221,91.388,316.839,0,204.11,0z M286.547,229.971l-126.368,72.471c-17.003,9.75-30.781,1.763-30.781-17.834V140.012
          c0-19.602,13.777-27.575,30.781-17.827l126.368,72.466C303.551,204.403,303.551,220.217,286.547,229.971z"/>
      </g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    </svg>`
  }
}

video.init();