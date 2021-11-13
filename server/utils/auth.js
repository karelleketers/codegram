/** 
 * Imports packages
 */
import express from 'express';
import passport from 'passport';
import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

/**
 * Imports local packages
 */
import database from '../db'
import logger from './logger.js'
database.connect();

// Initialize dotenv
dotenv.config();

// Initialize router
const app = express.Router();

// Initialize Passport
const LocalStrategy = passportLocal.Strategy;
passport.use(
  new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password'
    },
    async (username, password, done) => {
      try {
        // Get the user by name
        const user = await database.User.findOne({ raw: true }, { where: {username: username} }); 
        console.log(user)
        // Check if the user exists
        if (!user || user.message) { 
          return done(null, false, {
            message: 'Incorrect username.'
          });
        }

        // Check if the password is correct
        if (!(await isValidPassword(user, password))) {
          return done(null, false, {
            message: 'Incorrect password.'
          });
        }

        return done(null, user);
      } catch (e) {
        return done(e);
      }
    }
  )
);

/**
 * Define endpoint for login
 */
app.post('/login', (req, res) => {
  passport.authenticate('local', (error, user, info) => {
    if (error) {
      res.status(401).send(error);
      logger.error(`Failed to authenticate user. View the log for more details.`)
    } else if (!user) {
      logger.error(`Failed to authenticate user. Invalid username.`)
      res.status(401).send(info);
    } else {
      const token = jwt.sign(user, process.env.JWT_SECRET_KEY, {
        expiresIn: parseInt(process.env.JWT_LIFETIME),
      });
      res.json({
        success: true,
        token: token,
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
        },
      });
      logger.info(`User ${user.username} logged in successfully.`);
    }
  })(req, res);
});

/**
 * Validate password using bcrypt
 * @param {Object} user 
 * @param {String} password 
 * @returns match
 */
const isValidPassword = async (user, password) => {
  const match = await bcrypt.compare(password, user.password);
  return match;
};

/**
 * Define endpoint for logout
 */
app.get('/logout', (req, res) => {
  try {
    writeToCache('token', null);
    logger.info(`Success! Logged out.`);
    res.send(`Success! Logged out.`);
  } catch (error) {
    logger.error(`Failed at logout. Error: ${error.message}.`); 
  }
})

// Exports
export default app;