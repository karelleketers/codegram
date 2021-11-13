/**
 * Authentication middleware
 */

// Imports
import passport from 'passport';
import passportJWT from 'passport-jwt';
import dotenv from 'dotenv';
import logger from '../../utils/logger';


// Initialize dotenv
dotenv.config();

// Initialize passport
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

// Define options
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY,
};

// Use passport
passport.use(
  new JwtStrategy(opts, async (jwtData, done) => {
    try {
      logger.log({
        level: 'info',
        message: `${jwtData.username} does an authenticated request.`,
        label: 'auth'
      })
      return done(null, jwtData);
    } catch (e) {
      done(null, e);
    }
  })
);

/**
 * Checks if a user is authenticated
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
export const isUserAuthenticated = (req, res, next) => {
  passport.authenticate('jwt', {
    session: false
  }, (error, user, info) => {
    // If there is an error or no user do not authorize
    if (error || !user) {
      logger.log({       // Winston logger
        level: 'error',
        message: info,
        label: 'auth'
      });
      res.status(401).send(info);
    } else {
      next();
    }
  })(req, res, next);
};