/**
 * Import packages
 */

import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Hash password
 * @param {string} password
 * @returns {string} password hash
 */
export const hashPassword = (password) => {
  return bcrypt.hashSync(password, parseInt(process.env.SALT_ROUNDS));
};


// Use local storage as a json data cache
const writeToCache = (key, data) => Window.sessionStorage.setItem(key, JSON.stringify(data));
const readFromCache = (key) => JSON.parse(Window.sessionStorage.getItem(key)) || null;

export { readFromCache, writeToCache };
