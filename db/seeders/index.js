/*
Import packages
*/
import faker, { fake } from 'faker';
import {
  v4 as uuidv4
} from 'uuid';
import Sequelize from 'sequelize'

/*
Import custom packages
*/
import database from '../index.js';
import {
  hashPassword
} from '../../utils/helper';


// Initialize database connection
database.connect();

// Declare array variables
let generatedUsers = [];
let generatedProfiles = [];
let generatedCategories = [];
let generatedCourses = [];
let existingCategories = [];
let userIds = [];
let profileIds = [];
let completedOrders = [];
let generatedNews = [];

/* const getCategories = async () => {
  try {
    const cats = await database.Category.findAll({raw: true});
    existingCategories = cats;
    getUserIds();
  } catch (err) {
    console.error(err);
  }
};
const getUserIds = async () => {
  try {
    const users = await database.User.findAll();
    userIds = users.map(user => user.id);
    generateCourses();
  } catch(err) {
    console.error(err);
  }
};
const getProfileIds = async () => {
  try {
    const profiles = await database.Profile.findAll();
    profileIds = profiles.map(profile => profile.id);
    seedOrders();
  } catch(err) {
    console.error(err)
  }
} */
/* const getCompletedOrders = async () => {
  try {
    const orders = await database.Order.findAll({
      where: {
        order_completed: 1
      }
    });
    completedOrders = orders;
    seedPayments();
  } catch (err) {
    console.error(err)
  }
} */

/**
 * generate news
 * @param {number} amount 
 * @returns {arra} news
 */

const generateNews = (amount = 50) => {
  let newsList = [];
  for (let i = 0; i < amount; i++) {
    const news = {
      id: uuidv4(),
      author_firstname: faker.name.firstName(),
      author_lastname: faker.name.lastName(),
      title: faker.lorem.sentence(),
      subtitle: faker.lorem.sentence(),
      summary: faker.lorem.paragraph(),
      content: faker.lorem.text(),
      thumbnail: faker.image.city(),
      tags: JSON.stringify([faker.lorem.word(), faker.lorem.word(), faker.lorem.word()]),
    }
    newsList.push(news);
  }
  return newsList;
};

const seedNews = async () => {
  try {
    generatedNews = generateNews();
    generatedNews.forEach(async (news) => {
      await database.News.create(news);
    });
    console.table(generatedNews);
  } catch (err) {
    console.error(err);
  }
} 

/**
 * Generate users
 * @param {number} amount 
 * @returns {array} users
 */
/* const generateUsers = (amount = 50) => {
  let users = [];
  for (let i = 0; i < amount; i++) {
    let random = Math.floor(Math.random() * 2);
    const user = {
      id: uuidv4(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      email_verified: !!random,
      password: hashPassword('chinchillas4ever'),
      role: 'guest',
      last_login: faker.date.recent(),
    }
    users.push(user);
  }
  return users;
};
 */
/**
 * Generate profiles
 * @returns {array} profiles
 */
/* const generateProfiles = () => {
  let profiles = [];
  for (let i = 0; i < generatedUsers.length; i++) {
    const profile = {
      id: uuidv4(),
      UserId: generatedUsers[i].id,
      dob: faker.date.past(),
      img_url: faker.image.avatar(),
      subscription: null,
      recent_activity: null,
    };
    profiles.push(profile);
  };
  return profiles;
} */

/**
 * Generate categories
 */
/* const generateCategories = () => {
  const companyName = 'Codegram';
  const categories = [{
      id: uuidv4(),
      name: "Python",
      description: `Python instructors on ${companyName} specialize in everything from software development to data analysis, and are known for their effective, friendly instruction for students of all levels.`,
    },
    {
      id: uuidv4(),
      name: "JavaScript",
      description: `${companyName} instructors specialize in teaching the whole scope of JavaScript—beginner to advanced. Whether you’re interested in back-end development, or app and website building, ${companyName} has a JavaScript course for you.`
    },
    {
      id: uuidv4(),
      name: "React",
      description: `Whether you’re interested in adding React to your existing dev skillset, or you want to develop full-stack web apps by using tools like NodeJS, Redux, and MongoDB in conjunction with React, ${companyName} has a comprehensive selection of courses to choose from.`,
    },
    {
      id: uuidv4(),
      name: "C#",
      description: `Whether you’re using C# in conjunction with Xamarin Forms to build cross-platform apps, or designing a new video game in Unity with C#, ${companyName} has a course for you. ${companyName} hosts top-rated courses on everything from the fundamentals of C# programming to more advanced topics like databases and asynchronous programming.`
    },
    {
      id: uuidv4(),
      name: "CSS",
      description: `Learning how to code HTML without also learning CSS is like learning how to read but not write. All of your hard web development work is lost if you don’t optimize it for different screen sizes. ${companyName} has top-rated courses to show you how CSS helps you do just that.`,
    },
    {
      id: uuidv4(),
      name: "Unity",
      description: `Coding video games for modern consoles requires a lot of specialized skills. Unity allows users to program life-like physics, control game audio, and texture and layer game levels, all in one program. ${companyName} has the courses to show you how they all work together.`
    },
    {
      id: uuidv4(),
      name: "Google Flutter",
      description: `${companyName}'s Flutter courses will enable you to design cross-platform applications that allow you to reuse code across operating systems such as iOS and Android. If you want to design beautiful, natively compiled applications for mobile, web and desktop from a single codebase, ${companyName} has you covered.`,
    },
    {
      id: uuidv4(),
      name: "Java",
      description: `${companyName}’s top-rated Java instructors specialize in a wide array of Java programming practices. Whether you need a basic introduction to Java and website building using Selenium WebDriver, or are continuing your Android app developer education, ${companyName} has you covered.`
    },
    {
      id: uuidv4(),
      name: "SQL",
      description: `SQL isn’t just for software engineers and system administrators. SQL also helps business analysts gain important insights into new marketplaces and make more informed strategic decisions. SQL instructors on ${companyName} have experience with all levels and applications of SQL programming.`,
    },
    {
      id: uuidv4(),
      name: "Angular",
      description: `As Angular grows in popularity, new versions of the front-end framework are constantly being released. That’s why ${companyName} offers a wide range of courses covering every version of Angular available today.`
    },
  ];
  return categories;
} */

/**
 * Generate courses
 */
/* const generateCourses = (amount = 100) => {
  const getRandomIndex = (length) => Math.floor(Math.random() * length);
  const levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert', 'Professional'];
  const currentYear = new Date().getFullYear();
  if (userIds.length > 0 && existingCategories.length > 0) {
    let courses = [];
    for (let category of existingCategories) {
      for (let i = 0; i < levels.length; i++) {
        const course = {
          id: uuidv4(),
          unlocked: true,
          name: `${levels[i]} ${category.name} ${currentYear-1}`,
          description: `${levels[i]} ${category.name} ${currentYear-1} ${faker.lorem.sentence()}`,
          price: faker.finance.amount(),
          tags: JSON.stringify([`${category.name}`, `${levels[i]}`, currentYear-1, faker.lorem.word()]),
          UserId: userIds[getRandomIndex(userIds.length)],
          difficulty_level: levels[i],
          certificate: !!getRandomIndex(2),
          CategoryId: category.id,
        }
        courses.push(course);
      }
    }
    seedCourses(courses);
  }
} */

/**
 * Seed the users into the database
 * Uses: {array} generatedUsers
 * Calls seedProfiles after seeding
 */
/* const seedUsers = async () => {
  try {
    generatedUsers = generateUsers();
    generatedUsers.forEach(async (user) => {
      await database.User.create(user);
    });
    console.table(generatedUsers);
    seedProfiles();
  } catch (err) {
    console.error(err);
  }
} */


/**
 * Seed the profiles into the database
 * Uses: {array} generatedProfiles
 */
/* const seedProfiles = async () => {
  try {
    generatedProfiles = generateProfiles();
    generatedProfiles.forEach(async (profile) => {
      await database.Profile.create(profile);
    });
    console.table(generatedProfiles);
  } catch (err) {
    console.error(err);
  }
} */

/**
 * Seed the categories into the database
 * Uses: {array} generatedCategories
 */
/* const seedCategories = async () => {
  try {
    generatedCategories = generateCategories();
    generatedCategories.forEach(async (category) => {
      await database.Category.create(category);
    });
    console.table(generatedCategories);
  } catch (err) {
    console.error(err);
  }
} */

/**
 * Seed the courses into the database
 * Uses: {function} getCategories()
 *       {function} getUserIds()
 */
/* const seedCourses = async (courses) => {
  try {
    for (let course of courses) {
      generatedCourses = await database.Course.create(course);
    }
    console.table(courses);
  } catch (err) {
    console.error(err);
  }
} */

/**
 * Seed newsletters into database
 */
/* const seedNewsletters = async (amount = 20) => {
  try {
    let newsletters = [];
    for (let i = 0; i < amount; i++) {
      const newsletter = {
        id: uuidv4(),
        UserId: userIds[20],
        content: faker.lorem.paragraphs()
      }
      await database.Newsletter.create(newsletter);
      newsletters.push(newsletter);
    }
    console.table(newsletters);
  } catch (err) {
    console.error(err)
  }
} */

/**
 * Seed orders into database
 */
/* const seedOrders = async (amount = 88) => {
  try {
    const getRandomIndex = (length) => Math.floor(Math.random() * length);
    let orders = [];
    for (let i = 0; i < amount; i++) {
      const order = {
        id: uuidv4(),
        order_completed: !!getRandomIndex(2),
        ProfileId: profileIds[getRandomIndex(profileIds.length)],
        total: faker.finance.amount(20, 2000)
      }
      await database.Order.create(order);
      orders.push(order);
    }
    console.table(orders);
  } catch (err) {
    console.error(err);
  }
} */

/**
 * Call seeder methods
 */
/* seedUsers();
seedCategories();
getCategories(); */
/* seedNewsletters();
getProfileIds();
getCompletedOrders();  */
seedNews();

/* Seed User_Course */
/* (async () => {
  const getRandomIndex = (length) => Math.floor(Math.random() * length);
  const users = await database.User.findAll({raw:true}, {where: {
    email_verified: true}});
    console.log(users)
  const courses = await database.Course.findAll({raw:true});
  for (let i = 0; i < getRandomIndex(users.length); i++) {
    const userId = users[i].id;
    const user = await database.User.findByPk(userId);
    for (let j = 0; j < getRandomIndex(15); j++) {
      const course = await database.Course.findByPk(courses[j].id);
      user.addCourse(course, { through: { selfGranted : false } });
    }
  }
})();  */

/** Seed Subscriptions */
/* (async () => {
  const getRandomIndex = (length) => Math.floor(Math.random() * length);
  const profiles = await database.Profile.findAll({raw:true});
  const profileIds = profiles.map(profile => profile.id);
  let subscriptions = [];
  for (let i = 0; i < 25; i++) {
    const id = profileIds[getRandomIndex(profileIds.length)];
    const subscription = {
      id: uuidv4(),
      start_date: faker.date.recent(),
      end_date: faker.date.future(),
      price: faker.commerce.price(49, 999),
      subscription_type: getRandomIndex(3),
      ProfileId: id,
    }
    const profile = await database.Profile.findByPk(id);
    const newSubscription = await database.Subscription.create(subscription);
    newSubscription.addProfile(profile, { through: { selfGranted: false}})
    subscriptions.push(subscription);
  }
  console.table(subscriptions);
})(); */

/** Seed Order_Courses */
/* (async () => {
  const orders = await database.Order.findAll({raw: true});
  const courses = await database.Course.findAll({raw: true});
  const getRandomIndex = (max) => Math.floor(Math.random() * max);
  for (let i = 0; i < orders.length; i++) {
    const orderId = orders[i].id;
    const order = await database.Order.findByPk(orderId);
    let courseIds = [];
    for (let j = 0; j < getRandomIndex(5); j++) {
      courseIds.push(courses[getRandomIndex(courses.length)].id);
    }
    console.table(courseIds)
    for (let courseId of courseIds) {
      const course = await database.Course.findByPk(courseId);
      order.addCourse(course, { through: { selfGranted: false } })
      console.table(course);
    }
  }
})() */
const getRandomIndex = (max) => Math.floor(Math.random() * max);


// TODO: Refactor / DRY up code

/**
 * Seed videos
 */
/* const seedVideos = async (amount = 400) => {
  const thumbnails = [
    'https://freellustrustrations.s3.us-east-2.amazonaws.com/free-images/freeimg_47841037freejpg850.jpg',
    'https://freellustrustrations.s3.us-east-2.amazonaws.com/free-images/freeimg_58746987freejpg850.jpg',
    'https://freellustrustrations.s3.us-east-2.amazonaws.com/free-images/freeimg_12673169048freejpg850.jpg',
    'https://freellustrustrations.s3.us-east-2.amazonaws.com/free-images/freeimg_97433508047freejpg850.jpg',
    'https://freellustrustrations.s3.us-east-2.amazonaws.com/free-images/freeimg_92769330046freejpg850.jpg',
    'https://freellustrustrations.s3.us-east-2.amazonaws.com/free-images/freeimg_4355885045freejpg850.jpg',
    'https://freellustrustrations.s3.us-east-2.amazonaws.com/free-images/freeimg_44788363044freejpg850.jpg',
    'https://freellustrustrations.s3.us-east-2.amazonaws.com/free-images/freeimg_45074996043freejpg850.jpg',
    'https://freellustrustrations.s3.us-east-2.amazonaws.com/free-images/freeimg_5545946042freejpg850.jpg',
    'https://freellustrustrations.s3.us-east-2.amazonaws.com/free-images/freeimg_77003976freejpg850.jpg',
    'https://freellustrustrations.s3.us-east-2.amazonaws.com/free-images/freeimg_33784289freejpg850.jpg',
    'https://freellustrustrations.s3.us-east-2.amazonaws.com/free-images/freeimg_51228672freejpg850.jpg',
    'https://freellustrustrations.s3.us-east-2.amazonaws.com/free-images/freeimg_580291freejpg850.jpg',
    'https://freellustrustrations.s3.us-east-2.amazonaws.com/free-images/freeimg_71978372freejpg850.jpg',
    'https://freellustrustrations.s3.us-east-2.amazonaws.com/free-images/freeimg_91119713freejpg850.jpg',
    'https://freellustrustrations.s3.us-east-2.amazonaws.com/free-images/freeimg_99828278freejpg850.jpg',
    'https://freellustrustrations.s3.us-east-2.amazonaws.com/free-images/freeimg_26972375freejpg850.jpg',
    'https://freellustrustrations.s3.us-east-2.amazonaws.com/free-images/freeimg_78551377freejpg850.jpg',
    'https://freellustrustrations.s3.us-east-2.amazonaws.com/free-images/freeimg_43659769freejpg850.jpg',
    'https://freellustrustrations.s3.us-east-2.amazonaws.com/free-images/freeimg_94050260freejpg850.jpg',
    'https://freellustrustrations.s3.us-east-2.amazonaws.com/free-images/freeimg_98381253freejpg850.jpg',
    'https://freellustrustrations.s3.us-east-2.amazonaws.com/free-images/freeimg_63252370freejpg850.jpg',
    'https://freellustrustrations.s3.us-east-2.amazonaws.com/free-images/freeimg_77633546freejpg850.jpg'
  ]
  let videos = [];
  const courses = await database.Course.findAll({raw: true});
  for (let i = 0; i < amount; i++) {
    const video = {
      id: uuidv4(),
      url: faker.internet.url(),
      name: faker.lorem.words(4),
      thumbnail_url: thumbnails[getRandomIndex(thumbnails.length)],
      duration: `0${getRandomIndex(5)}:${getRandomIndex(6)}${getRandomIndex(9)}:${getRandomIndex(6)}${getRandomIndex(9)}`,
    }
    const createdVideo = await database.Video.create(video);
    const courseId = courses[getRandomIndex(courses.length)].id;
    const course = await database.Course.findByPk(courseId);
    course.addVideo(createdVideo, { through: { selfGranted: false } });
    videos.push(video);
  }
  console.table(videos);
}
seedVideos(); */

/* const seedPayments = async () => {
  const orders = await database.Order.findAll({raw: true}, {where: {order_completed: 1}});
  let payments = [];
  for (let order of orders) {
    const payment = {
      id: uuidv4(),
      total: order.total,
      OrderId: order.id,
      ProfileId: order.ProfileId
    }
    await database.Payment.create(payment);
    payments.push(payment);
  }
  console.table(payments);
};
seedPayments(); */

/* const seedProductReviews = async () => {
  const courses = await database.Course.findAll({raw: true}, {where: {description: 'dolor'} });
  const profiles = await database.Profile.findAll({raw: true});
  let reviews = [];
  for (let course of courses) {
    const review = {
      id: uuidv4(),
      stars: 3,
      review: '',
      ProfileId: profiles[getRandomIndex(profiles.length)].id,
      CourseId: course.id,
    }
    await database.ProductReviews.create(review);
    reviews.push(review);
  }
  console.table(reviews);
}
seedProductReviews(); */

// TODO: Promotions --> Promotion.addOrder Promotion.addSubscription

// WARNING: Here be dragons! This code has no right to work. But it kind of does. No idea why.
// TODO: Slay the dragons

/* const seedPromotions = async () => {
  const Op = Sequelize.Op;
  const orders = await database.Order.findAll({raw:true}, {where: {total: { [Op.lte]: 1500}}})
  let promotions = [];
  for (let i = 0; i < orders.length; i++) {
    const orderPromotion = {
      id: uuidv4(),
      price_modifier: .9,
      OrderId: orders[i].id,
      SubscriptionId: null,
    }
    promotions.push(orderPromotion);
    const newPromotion = await database.Promotion.create(orderPromotion);
    const orderToAdd = await database.Order.findByPk(orders[i].id);
    newPromotion.addOrder(orderToAdd, {through: {selfGranted: false}});
  }
/*   const subscriptions = await database.Subscription.findAll({raw: true});
  let subOrders = [];
  for (let subscription of subscriptions) {
    const order = await database.Order.findOne({where: {ProfileId: subscription.ProfileId}});
    subOrders.push(order.id);
  }
  for (let j = 0; j < subOrders.length; j++) {
    const orderSubscription = {
      id: uuidv4(),
      price_modifier: .8,
      OrderId: subOrders[j],
      SubscriptionId: subscriptions[j].id
    }
    promotions.push(orderSubscription);
    const newPromotion = await database.Promotion.create(orderSubscription);
    const orderToAdd = await database.Order.findByPk(subOrders[j].id);
    const subscriptionToAdd = await database.Subscription.findByPk(subscriptions[j].id);
    newPromotion.addSubscription(subscriptionToAdd, {through: {selfGranted: false}})
    newPromotion.addOrder(orderToAdd, {through: {selfGranted: false}})
  } */
  /*console.table(promotions);
}
seedPromotions(); */