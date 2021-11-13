/**
 * The main app
 */
const app = {

    /**
     * Initialize the app
     */
    init() {
      this.cacheElements();
      this.registerListeners();
    },
    
    /**
     * Cache the DOM elements
     */
    cacheElements() {
      this.$loginButton = document.querySelector('.navbar__right .login-btn')
      this.$loginForm = document.querySelector('.login-form');
      this.$logoutButton = document.querySelector('.btn-logout');
      this.$dropDownBttn = document.querySelector('.dropbtn');
      this.$dropDownList = document.querySelector('.dropdown-list');
      this.$loginButton = document.querySelector('.login-btn');
    },

    /**
     * Register listeners
     */
    registerListeners() {
      if (!!this.$loginForm) {
        console.log('Login form found');
        this.$loginForm.addEventListener('submit', (e) => {
          const data = new FormData(this.$loginForm);
          let entries = [];
          for (const entry of data) {
            const [key, value] = entry;
            entries.push(value);
          }
          const [username, password] = entries;
          this.tryLogin(username, password);
          e.preventDefault();
        })
      }
      if (!!this.$logoutButton) {
        this.$logoutButton.addEventListener('click', (e) => {
          window.localStorage.removeItem('jwt');
          alert('You were logged out!');
        })
      }
      if (!!this.readFromCache('jwt')) {
        this.$loginButton.outerHTML = `
          <a class="login-btn btn primary-btn btn-logout" href="">Log Out</a>
        `
        const button = document.querySelector('.login-btn.btn.primary-btn.btn-logout');
        button.addEventListener('click', (e) => {
          window.localStorage.removeItem('jwt');
          alert('You were logged out!');
          this.$loginButton.outerHTML = `<a class="login-btn btn primary-btn" href="/login">Log In</a>`
        });
      }
      if (!!this.$dropDownBttn) {
        this.$dropDownBttn.addEventListener('click', (e) => {
          e.preventDefault();
          this.$dropDownList.classList.toggle('visible')
        })
      }
    },

    /**
     * Attempts to login a user with username and password
     * @param {string} username 
     * @param {string} password 
     */
    async tryLogin(username, password) {
      try {
        // Define body
        const body = {
          username,
          password,
        };

        const response = await fetch('http://localhost:8080/auth/login', {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
          redirect: 'follow',
          referrerPolicy: 'no-referrer',
          body: JSON.stringify(body),
        });
        const data = await response.json();

        // Write the jwt to the local storage
        if (!!data) this.writeToCache('jwt', data);

        // Show a success message to the user after login
        alert(`Welcome back ${username}!`)
        window.open('/', '_parent')
        
      } catch (error) {
        console.error(error);
      }
    },

    /**
     * Write token to local storage 
     * @param {string} key 
     * @param {object} data 
     */
    writeToCache(key, data) {
      // Check if jwt key exists in local storage
      const mem = this.readFromCache(key);
      if (!(!!mem)) {
        window.localStorage.setItem(key, JSON.stringify(data));
        console.log('Saved jwt in local storage');
      } else {
        console.log('Jwt found in local storage');
      }
    },

    /**
     * Get token from local storage
     * @param {string} key | 'jwt'
     * @returns {object} token
     */
    readFromCache(key) {
      return JSON.parse(window.localStorage.getItem(key)) || null;
    },
  }

  // Function calls
  app.init();