/**
 * App for user signup
 */

const signup = {

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
    this.$signupForm = document.querySelector('.signup-form');
  },

  /**
   * Register listeners
   */
  registerListeners() {
    if (!!this.$signupForm) {
      this.$signupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // get Form Data
        const data = new FormData(this.$signupForm);
        let entries = [];
        for (const entry of data) {
          const [, value] = entry;
          entries.push(value);
        }
        this.tryCreateUser(entries);
      })
    }
  },

  /**
   * Attempt to create a new user
   * @param {array} entries 
   */
  async tryCreateUser(entries) {
    try {
      const [email, , username, password, ] = entries;

      // Define the body
      const body = {
        user: {
          username,
          email,
          email_verified: true,
          password,
          role: 'guest',
          last_login: null
        }
      };

      // Set http request options and make the fetch request
      const response = await fetch('http://localhost:8080/api/users', {
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

      let message = '';
      if (response.status === 500) {
        message = response.statusText;
      } else {
        message = 'Created user';
      }

      // Placeholder: annoy people by making a popup
      alert(message);
    } catch (error) {
      console.error(error)
    }
  }
}

// Function calls
signup.init();