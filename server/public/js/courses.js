/**
 * Fetch and Show the results for a single course
 * Uses window location to get the course ID
 * Uses local storage to get the jwt token if present
 * Fetches the course and course video's from the database through the API
 * Renders the course and course video's
 * or a message
 */
 const courses = {
  
    /**
     * Initialize app
     */
    init() {
      this.cacheElements();
      this.registerListeners();
    },
  
    /**
     * Cache DOM elements
     */
    cacheElements() {
      this.$courseParams = document.querySelectorAll('input[type="radio"]');
      this.$coursePrice = document.querySelector('input[type="range"]');
      this.$courseTags = document.querySelectorAll('#tagBtn');
      this.$coursesSort = document.querySelector("#sort-select");
      this.$submitBttn = document.querySelector('#frmButton');
    },
    
    /**
     * Register listeners
     */
    registerListeners() {
      // Not sure any listeners will be needed
      if (!!this.$courseParams) {this.$courseParams.forEach(cat => cat.addEventListener('change', (ev) => {
        const val = ev.target.value;
        const param = ev.target.name;
        this.alterParams(param, val);
      }))};
      if (!!this.$coursePrice) {this.$coursePrice.addEventListener('change', (ev) => {
        const val = ev.currentTarget.value;
        val <= 500 ? this.alterParams('min', val) : this.alterParams('max', val);
      })}
      if (!!this.$courseTags) {this.$courseTags.forEach(tag => tag.addEventListener('click', (ev) => {
        ev.preventDefault();
        const val = ev.target.dataset.tag || ev.target.parentNode.dataset.tag || ev.target.parentNode.parentNode.dataset.tag;
        const param = ev.target.name || ev.target.parentNode.name|| ev.target.parentNode.parentNode.name;
        this.alterParams(param, val);
      }))};
      if (!!this.$coursesSort) {this.$coursesSort.addEventListener('change', (ev) => {
        const val = ev.currentTarget.value;
        const param = ev.target.name;
        this.alterParams(param, val);        
      })}
      if (!!this.$submitBttn) {this.$submitBttn.addEventListener('click', (ev) => {
        ev.preventDefault();
        window.location.reload()
      })};
    },
    alterParams(param, val) {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const keys = params.getAll('tag');
        if (val!== null) {
        param === "tag" && params.has('tag')? keys.indexOf(val) < 0 ? params.append('tag', val): "" : params.set(param, val); window.history.replaceState({}, '', `${location.pathname}?${params}`);
        if (param === "sort") {window.location.reload()}
    }}
  }
  
  courses.init();