/**
 * Fetch and Show the results for a single course
 * Uses window location to get the course ID
 * Uses local storage to get the jwt token if present
 * Fetches the course and course video's from the database through the API
 * Renders the course and course video's
 * or a message
 */
const course = {
  
  /**
   * Initialize app
   */
  init() {
    this.courseId = '';
    this.course = {};
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
    this.$courseContainer = document.querySelector('.course__container');
    this.$courseParams = document.querySelectorAll('input[type="radio"]');
    this.$coursePrice = document.querySelector('input[type="range"]');
    this.$courseTags = document.querySelectorAll('#tagBtn');
  },
  
  /**
   * Register listeners
   */
  registerListeners() {
    // Not sure any listeners will be needed
    this.$courseParams.forEach(cat => cat.addEventListener('change', (ev) => {
      const val = ev.target.value;
      const param = ev.target.name;
      this.alterParams(param, val);
    }));
    this.$coursePrice.addEventListener('change', (ev) => {
      const val = ev.currentTarget.value;
      val <= 500 ? this.alterParams('min', val) : this.alterParams('max', val);
    })
    this.$courseTags.forEach(tag => tag.addEventListener('click', (ev) => {
      ev.preventDefault();
      const val = ev.target.dataset.tag || ev.target.parentNode.dataset.tag || ev.target.parentNode.parentNode.dataset.tag;
      const param = ev.target.name || ev.target.parentNode.name|| ev.target.parentNode.parentNode.name;
      this.alterParams(param, val);
    }));
  },

  /**
   * Get the current course ID from window location
   * and save it in a variable
   */
  getCourseId() {
    const locationStr = (window.location).toString();
    const [ , courseId] = locationStr.split('/course/');
    this.courseId = courseId;
  },

  /**
   * Get the auth token from the Storage API Localstorage
   * @returns {object} token
   */
  getAuthToken() {
    return JSON.parse(window.localStorage.getItem('jwt')) || null;
  },

  /**
   * Fetch the correct course from the database
   * use the course ID from the window location
   * use the auth token and set the header to include the token
   * for authentication
   */
  async fetchCourse() {
    try {
      const response = await fetch(`http://localhost:8080/api/courses/${this.courseId}`, {
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
      console.log(data)
      this.renderCourseHTML(data);
    } catch (error) {
      console.log("caught error", error)
      // console.error(error.message);
      this.renderNotAllowedHTML();
    }
  },
  /**
   * Render the view for the course
   * @param {object} course 
   */
  renderCourseHTML(course) {
    let tags = JSON.parse(course.tags).join(', ');
    const output = `
      <h1 class="course__name">${course.name}</h1>
      <p class="course__desc">${course.description}</p>
      <p>Tags: ${tags}</p>
      ${this.renderVideos(course)}
    `
    console.log(output)
    this.$courseContainer.innerHTML = output;
  },

  /**
   * Render the view for the course video's
   * @param {object} course 
   * @returns {string} video HTML string
   */
  renderVideos(course) {
    let output = '<div class="course_videos">';
    for (let video of course.videos) {
      output += `
      <div class="card card__video">
        <a href="/video/${video.id}" title="Watch ${video.name}">
          <h3 class="video__name">${video.name}</h3>
          <img class="video__thumbnail" src=${video.thumbnail_url} alt=${video.name} />
        </a>
      </div>`
    }
    output += '</div>'
    return output;
  },

  /**
   * Render a message if user is not allowed to visit.
   * @returns {string} message
   */
  renderNotAllowedHTML() {
    return `<p>Uh oh! You do not have access.</p>`
  },

  alterParams(param, val) {
      const search = window.location.search;
      const params = new URLSearchParams(search);
      const keys = params.getAll('tag');
      if (val!== null) {
      param === "tag" && params.has('tag')? keys.indexOf(val) < 0 ? params.append('tag', val): "" : params.set(param, val); window.history.replaceState({}, '', `${location.pathname}?${params}`)}
  }
}

course.init();