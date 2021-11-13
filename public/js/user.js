const user = {
  init() {
    this.username = '';
    this.cacheElements();
    this.registerListeners();
    this.getUserId();
    this.fetchUserProfile();
  },
  cacheElements() {

  },
  registerListeners() {

  },
  getUserId() {
    const locationStr = (window.location).toString();
    const [, username] = locationStr.split('/users/');
    this.username = username;
  },
  async fetchUserProfile() {
    const loggedInUser = this.readFromCache('jwt').user;
    console.log(loggedInUser);
    try {
      const response = await fetch(`http://localhost:8080/api/users/name/${this.username}`);
      const data = await response.json();
      console.log(data)

      // If the logged in user matched the path user id
      // Show more stuff
      if (this.username === loggedInUser.username) {
        
      }
    } catch (error) {
      console.error(error);
    }
  },
  async fetchUserOrders() {

  },
  async fetchUserPayments() {

  },
  async fetchUserCourses() {

  },
  readFromCache(key) {
    return JSON.parse(window.localStorage.getItem(key)) || null;
  },
}

user.init();