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
  },
  
  /**
   * Register listeners
   */
  registerListeners() {
    // Not sure any listeners will be needed
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
    let tags = (course.tags)
      .replaceAll('"', '')
      .replaceAll('[', '')
      .replaceAll(']', '')
      .split(',')
    
    // console.log(tagsStr)
    const output = `
      <h1 class="course__name titleDarkBg">${course.name}</h1>
      <p class="course__desc subHeading">${course.description}</p>
      <p class="supHeading">Tags: ${tags}</p>
      ${this.renderVideos(course)}
    `
    this.$courseContainer.innerHTML = output;
  },

  /**
   * Render the view for the course video's
   * @param {object} course 
   * @returns {string} video HTML string
   */
  renderVideos(course) {
    let output = '<div class="course_videos"><ul class="card-section">';
    for (let video of course.videos) {
      console.log(video.name)
      const capitalize = ([first,...rest]) => first.toUpperCase() + rest.join('').toLowerCase()
      output += `
        <li>
          <div class="card card--blog card__video">
            <div class="card--header card-blog__header">
              <img class="video__thumbnail" src=${video.thumbnail_url} alt=${video.name} />
            </div>
            <div class="card--info card--blog__info">
              <div class="card-info">
                
                <h3 class="video__name"><a href="/course/${course.id}/${video.id}" title="Watch ${video.name}">${capitalize(video.name)}</a></h3>
              </div>
            </div>
            </a>
          </div>
        </li>
      `
    }
    output += '</ul></div>'
    return output;
  },

  /**
   * Render a message if user is not allowed to visit.
   * @returns {string} message
   */
  renderNotAllowedHTML() {
    this.$courseContainer.innerHTML = `
    <p class="subHeading">Uh oh! You do not have access.</p>
    <a class="btn primary-btn" href="/login">Log in</a>
    `
  },
}

course.init();