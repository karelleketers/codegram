/*
Import custom packages
*/
import database from '../db'
import {
  /* HTTPError, */
  handleHTTPError
} from '../utils';
import {
  Op
} from 'sequelize';

database.connect();
/*
Get Home Render
*/
const getHome = async (req, res, next) => {
  try {
    // Get categories from database
    let categories = await database.Category.findAll({
      raw: true
    });
    let courses = await database.Course.findAll({
      raw: true
    });
    let news = await database.News.findAll({
      raw: true
    })
    courses.length = 6;
    news.length = 3;
    // Send response
    res.render('index', {
      categories,
      courses,
      news
    });
  } catch (error) {
    handleHTTPError(error, next);
  }
};

/**
 * Get Login Render
 */
const getLogin = async (req, res, next) => {
  try {
    let categories = await database.Category.findAll({
      raw: true
    });
    res.render('login', { categories });
  } catch (error) {
    handleHTTPError(error, next);
  }
}

/**
 * Get Signup Render
 */
const getSignup = async (req, res, next) => {
  try {
    let categories = await database.Category.findAll({
      raw: true
    });
    res.render('signup', { categories });
  } catch (error) {
    handleHTTPError(error, next);
  }
}


const getCourses = async (req, res, next) => {
  try {
    const categories = await database.Category.findAll({raw: true})
    const { category, min, max, tag, level, sort} = req.query;
    const courses = await database.Course.findAll({
      where: {
        CategoryId: (category === undefined ? {
          [Op.ne]: 'undefined'
        } : category),
        difficulty_level: (level === undefined ? {
          [Op.ne]: 'undefined'
        } : level),
        price: (min === undefined && max === undefined) ? {
          [Op.ne]: 'undefined'
        } : (min === undefined && max !== undefined) ? {
          [Op.lte]: max
        } : (min !== undefined && max === undefined) ? {
          [Op.gte]: min
        } : {
          [Op.between]: [min, max]
        },
        tags: (tag === undefined) ? {
          [Op.ne]: 'undefined'
        } : (typeof tag === 'object') ? {
          [Op.or]: tag.map(t => {
            return {
              [Op.substring]: t
            }
          })
        } : {
          [Op.substring]: tag
        }
      },
      order: [
          ((sort === "prd") ? ['price', 'DESC'] : (sort === "pra") ? ['price', 'ASC'] : (sort === "nd") ? ['createdAt', 'DESC'] : (sort === "na") ? ['createdAt', 'ASC'] : (sort === "dud") ? ['duration', 'DESC'] : (sort === "dua") ? ['duration', 'ASC'] : ['name', 'ASC']),
      ]
    });
    res.render('courses', {
      courses,
      categories
    })
  } catch (error) {
    handleHTTPError(error, next);
  }
}

/**
 * Get a single course
 */
const getCourse = async (req, res, next) => {
  try {
    let categories = await database.Category.findAll({
      raw: true
    });
    const {
      courseId
    } = req.params;
    res.render('course', { categories });
  } catch (error) {
    handleHTTPError(error, next);
  }
}

/**
 * Get a single video
 */
const getVideo = async (req, res, next) => {
  try {
    let categories = await database.Category.findAll({
      raw: true
    });
    res.render('video', { categories });
  } catch (error) {
    handleHTTPError(error, next);
  }
}

/**
 * Get news
 */
const getNews = async (req, res, next) => {
  try {
    const news = await database.News.findAll({raw: true})
    let categories = await database.Category.findAll({
      raw: true
    });
    res.render('news', {
      news,
      categories
    });
  } catch (error) {
    handleHTTPError(error, next);
  }
}

/**
 * Get a news article
 */
 const getNewsArticle = async (req, res, next) => {
  try {
    let categories = await database.Category.findAll({
      raw: true
    });
    const {
      newsId
    } = req.params;
    res.render('article', { categories });
  } catch (error) {
    handleHTTPError(error, next);
  }
}

/**
 * Get user
 */
const getUser = async (req, res, next) => {
  try {
    let categories = await database.Category.findAll({
      raw: true
    });
    res.render('user', { categories });
  } catch (error) {
    handleHTTPError(error, next);
  }
}

/**
 * Get cart
 */
const getCart = async (req, res, next) => {
  try {
    let categories = await database.Category.findAll({
      raw: true
    });
    res.render('cart', { categories });
  } catch (error) {
    handleHTTPError(error, next);
  }
}

/**
 * Get payment
 */
const getPayment = async (req, res, next) => {
  try {
    let categories = await database.Category.findAll({
      raw: true
    });
    res.render('payment', { categories });
  } catch (error) {
    handleHTTPError(error, next);
  }
}

/**
 * Get terms and conditions
 */
const getTermsAndConditions = async (req, res, next) => {
  try {
    let categories = await database.Category.findAll({
      raw: true
    });
    res.render('terms_and_conditions', { categories });
  } catch (error) {
    handleHTTPError(error, next);
  }
}

/**
 * Get privacy policy
 */
const getPrivacyPolicy = async (req, res, next) => {
  try {
    let categories = await database.Category.findAll({
      raw: true
    });
    res.render('privacy_policy', { categories });
  } catch (error) {
    handleHTTPError(error, next);
  }
}

export {
  getHome,
  getLogin,
  getSignup,
  getCourse,
  getCourses,
  getVideo,
  getNews,
  getNewsArticle,
  getUser,
  getCart,
  getPayment,
  getTermsAndConditions,
  getPrivacyPolicy,
};