import { beforeAll, expect } from '@jest/globals';
import request from 'supertest';
import { app } from '../../server/app';
import database from '../../server/db'

let token = '';
beforeAll(async (done) => {
  database.connect();
  request(app)
    .post('/auth/login')
    .send({
      username: 'Danial_Barrows',
      password: 'chinchillas4ever'
    })
    .end((err, response) => {
      token = response.body.token;
      done();
    })
})

describe('API docs', () => {
  test('it should get api/docs', async (done) => {
    const response = await request(app)
      .get('/api/docs')
    expect(response.statusCode).toEqual(301);
    done()
  })
})

describe('API categories', () => {
  test('it should get all categories', async (done) => {
    const response = await request(app)
      .get('/api/categories')
    expect(response.statusCode).toEqual(200);
    expect(response.type).toBe('application/json')
    expect(response.json)
    done()
  })
  test('it should get a category', async (done) => {
    const categoryId = 'f8ee895d-ce9b-4c82-a9e4-1b1c173c3a9d'
    const response = await request(app)
      .get(`/api/categories/${categoryId}`)
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.json)
      })
    done()
  })
  test('it should get a category by name', async (done) => {
    const categoryName = 'Python';
    const response = await request(app)
      .get(`/api/categories/name/${categoryName}`)
      .then(response => {
        expect(response.statusCode).toEqual(200);
        expect(response.json)
      })
      done()
  })
  test('it should create a category', async (done) => {
    const category = {
      id: 'some-id',
      name: 'some-name',
      description: 'some-description',
    }
    await request(app)
      .post(`/api/categories`)
      .send({category})
      .then((response) => {
        expect(response.statusCode).toBe(201);
        expect(response.type).toBe('text/html')
      })
    done()
  })
  test('it should edit a category', async (done) => {
    const categoryId = 'some-id';
    await request(app)
      .put(`/api/categories/${categoryId}`)
      .send({name: 'some-other-name'})
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.text).toBeDefined()
      })
      done()
  })
  test('it should delete a category', async (done) => {
    const categoryId = 'some-id';
    await request(app)
      .delete(`/api/categories/${categoryId}`)
      .then(response => {
        expect(response.statusCode).toBe(204);
      })
      done();
  })
})

describe('API courses', () => {
  test('it should get all courses', async (done) => {
    await request(app)
      .get('/api/courses')
      .then(response => {
        expect(response.statusCode).toEqual(200);
        expect(response.type).toBe('application/json')
        expect(response.json)
      })
    done()
  })
  test('it should get a course', async (done) => {
    const courseId = 'ffe56aeb-754e-402d-bb07-879ebfc809bb'
    await request(app)
      .get(`/api/courses/${courseId}`)
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.json)
      })
    done()
  })
  test('it should create a course', async (done) => {
    const course = {
      id: 'some-id',
      name: 'some-name',
			description: 'some-description',
			price: 10,
			tags: 'tag',
			UserId: 'd90e0011-88f2-4049-b6d3-47ae5d7a8102',
			duration: 'some-duration',
			difficulty_level: 'some-difficulty-level',
			certificate: 0,
			language: 'some-language',
    }
    await request(app)
      .post(`/api/courses`)
      .send({course})
      .then((response) => {
        expect(response.statusCode).toBe(201);
        expect(response.type).toBe('text/html')
      })
    done()
  })
  test('it should edit a course', async (done) => {
    const courseId = 'some-id';
    await request(app)
      .put(`/api/courses/${courseId}`)
      .send({name: 'some-other-name'})
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.text).toBeDefined()
      })
      done()
  })
  test('it should delete a course', async (done) => {
    const courseId = 'some-id';
    await request(app)
      .delete(`/api/courses/${courseId}`)
      .then(response => {
        expect(response.statusCode).toBe(204);
      })
      done();
  })
})

describe('API newsletters', () => {
  test('it should get all newsletters', async (done) => {
    await request(app)
      .get('/api/newsletters')
      .then(response => {
        expect(response.statusCode).toEqual(200);
        expect(response.type).toBe('application/json')
        expect(response.json)
      })
    done()
  })
  test('it should get a newsletter', async (done) => {
    const newsletterId = 'ce92c00e-ac20-4c69-bcd9-7c61a4381089'
    await request(app)
      .get(`/api/newsletters/${newsletterId}`)
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.json)
      })
    done()
  })
  test('it should create a newsletter', async (done) => {
    const newsletter = {
      id: 'some-id',
      content: 'some-content',
    }
    await request(app)
      .post(`/api/newsletters`)
      .send({newsletter})
      .then((response) => {
        expect(response.statusCode).toBe(201);
        expect(response.type).toBe('text/html')
      })
    done()
  })
  test('it should edit a newsletter', async (done) => {
    const newsletterId = 'some-id';
    await request(app)
      .put(`/api/newsletters/${newsletterId}`)
      .send({content: 'some-other-content'})
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.text).toBeDefined()
      })
      done()
  })
  test('it should delete a newsletter', async (done) => {
    const newsletterId = 'some-id';
    await request(app)
      .delete(`/api/newsletters/${newsletterId}`)
      .then(response => {
        expect(response.statusCode).toBe(204);
      })
      done();
  })
})

describe('API orders', () => {
  test('it should get all orders', async (done) => {
    await request(app)
      .get('/api/orders')
      .then(response => {
        expect(response.statusCode).toEqual(200);
        expect(response.type).toBe('application/json')
        expect(response.json)
      })
    done()
  })
  test('it should get a order', async (done) => {
    const orderId = 'dee6e794-fda6-48e3-8edf-08f8019ba7e7'
    await request(app)
      .get(`/api/orders/${orderId}`)
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.json)
      })
    done()
  })
  test('it should create a order', async (done) => {
    const order = {
      id: 'some-id',
      order_completed: 0,
      total: 156,
      ProfileId: 'some-profile-id'
    }
    await request(app)
      .post(`/api/orders`)
      .send({order})
      .then((response) => {
        expect(response.statusCode).toBe(201);
        expect(response.type).toBe('text/html')
      })
    done()
  })
  test('it should edit a order', async (done) => {
    const orderId = 'some-id';
    await request(app)
      .put(`/api/orders/${orderId}`)
      .send({total: 157})
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.text).toBeDefined()
      })
      done()
  })
  test('it should delete a order', async (done) => {
    const orderId = 'some-id';
    await request(app)
      .delete(`/api/orders/${orderId}`)
      .then(response => {
        expect(response.statusCode).toBe(204);
      })
      done();
  })
})

describe('API payments', () => {
  test('it should get all payments', async (done) => {
    await request(app)
      .get('/api/payments')
      .then(response => {
        expect(response.statusCode).toEqual(200);
        expect(response.type).toBe('application/json')
        expect(response.json)
      })
    done()
  })
  test('it should get a payment', async (done) => {
    const paymentId = 'b2aa1904-b473-4239-b70a-1bc611438f0b'
    await request(app)
      .get(`/api/payments/${paymentId}`)
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.json)
      })
    done()
  })
  test('it should create a payment', async (done) => {
    const payment = {
      id: 'some-id',
      total: 156,
      OrderId: 'dee6e794-fda6-48e3-8edf-08f8019ba7e7',
      ProfileId: 'd31f7d82-c41e-4a47-ada1-df93b110634d'
    }
    await request(app)
      .post(`/api/payments`)
      .send({payment})
      .then((response) => {
        expect(response.statusCode).toBe(201);
        expect(response.type).toBe('text/html')
      })
    done()
  })
  test('it should edit a payment', async (done) => {
    const paymentId = 'some-id';
    await request(app)
      .put(`/api/payments/${paymentId}`)
      .send({total: 157})
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.text).toBeDefined()
      })
      done()
  })
  test('it should delete a payment', async (done) => {
    const paymentId = 'some-id';
    await request(app)
      .delete(`/api/payments/${paymentId}`)
      .then(response => {
        expect(response.statusCode).toBe(204);
      })
      done();
  })
})

describe('API profiles', () => {
  test('it should get all profiles', async (done) => {
    await request(app)
      .get('/api/profiles')
      .then(response => {
        expect(response.statusCode).toEqual(200);
        expect(response.type).toBe('application/json')
        expect(response.json)
      })
    done()
  })
  test('it should get a profile', async (done) => {
    const profileId = 'd31f7d82-c41e-4a47-ada1-df93b110634d'
    await request(app)
      .get(`/api/profiles/${profileId}`)
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.json)
      })
    done()
  })
  test('it should create a profile', async (done) => {
    const profile = {
      id: 'some-id',
      dob: new Date(),
      img_url: 'some-url',
      subscription: 1,
      recent_activity: null,
      UserId: 'd90e0011-88f2-4049-b6d3-47ae5d7a8102'
    }
    await request(app)
      .post(`/api/profiles`)
      .send({profile})
      .then((response) => {
        expect(response.statusCode).toBe(201);
        expect(response.type).toBe('text/html')
      })
    done()
  })
  test('it should edit a profile', async (done) => {
    const profileId = 'some-id';
    await request(app)
      .put(`/api/profiles/${profileId}`)
      .send({img_url: 'some-other-url'})
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.text).toBeDefined()
      })
      done()
  })
  test('it should delete a profile', async (done) => {
    const profileId = 'some-id';
    await request(app)
      .delete(`/api/profiles/${profileId}`)
      .then(response => {
        expect(response.statusCode).toBe(204);
      })
      done();
  })
})

describe('API promotions', () => {
  test('it should get all promotions', async (done) => {
    await request(app)
      .get('/api/promotions')
      .then(response => {
        expect(response.statusCode).toEqual(200);
        expect(response.type).toBe('application/json')
        expect(response.json)
      })
    done()
  })
  test('it should get a promotion', async (done) => {
    const promotionId = '4b6ff5ca-b3b0-4529-b6c4-1d9a1cefd7db'
    await request(app)
      .get(`/api/promotions/${promotionId}`)
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.json)
      })
    done()
  })
  test('it should create a promotion', async (done) => {
    const promotion = {
      id: 'some-id',
      price_modifier: .9,
      OrderId: 'dee6e794-fda6-48e3-8edf-08f8019ba7e7',
      SubscriptionId: '66974df8-e96e-488f-900c-8236ddca9218'
    }
    await request(app)
      .post(`/api/promotions`)
      .send({promotion})
      .then((response) => {
        expect(response.statusCode).toBe(201);
        expect(response.type).toBe('text/html')
      })
    done()
  })
  test('it should edit a promotion', async (done) => {
    const promotionId = 'some-id';
    await request(app)
      .put(`/api/promotions/${promotionId}`)
      .send({price_modifier: 1.1})
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.text).toBeDefined()
      })
      done()
  })
  test('it should delete a promotion', async (done) => {
    const promotionId = 'some-id';
    await request(app)
      .delete(`/api/promotions/${promotionId}`)
      .then(response => {
        expect(response.statusCode).toBe(204);
      })
      done();
  })
})

describe('API subscriptions', () => {
  test('it should get all subscriptions', async (done) => {
    await request(app)
      .get('/api/subscriptions')
      .then(response => {
        expect(response.statusCode).toEqual(200);
        expect(response.type).toBe('application/json')
        expect(response.json)
      })
    done()
  })
  test('it should get a subscription', async (done) => {
    const subscriptionId = '66974df8-e96e-488f-900c-8236ddca9218'
    await request(app)
      .get(`/api/subscriptions/${subscriptionId}`)
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.json)
      })
    done()
  })
  test('it should create a subscription', async (done) => {
    const subscription = {
      id: 'some-id',
      start_date: new Date(),
      end_date: new Date(),
      price: 1561,
      subscription_type: 2,
      ProfileId: 'd31f7d82-c41e-4a47-ada1-df93b110634d'
    }
    await request(app)
      .post(`/api/subscriptions`)
      .send({subscription})
      .then((response) => {
        expect(response.statusCode).toBe(201);
        expect(response.type).toBe('text/html')
      })
    done()
  })
  test('it should edit a subscription', async (done) => {
    const subscriptionId = 'some-id';
    await request(app)
      .put(`/api/subscriptions/${subscriptionId}`)
      .send({price: 157})
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.text).toBeDefined()
      })
      done()
  })
  test('it should delete a subscription', async (done) => {
    const subscriptionId = 'some-id';
    await request(app)
      .delete(`/api/subscriptions/${subscriptionId}`)
      .then(response => {
        expect(response.statusCode).toBe(204);
      })
      done();
  })
})

describe('API users', () => {
  test('it should get all users', async (done) => {
    await request(app)
      .get('/api/users')
      .then(response => {
        expect(response.statusCode).toEqual(200);
        expect(response.type).toBe('application/json')
        expect(response.json)
      })
    done()
  })
  test('it should get a user', async (done) => {
    const userId = 'd90e0011-88f2-4049-b6d3-47ae5d7a8102'
    await request(app)
      .get(`/api/users/${userId}`)
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.json)
      })
    done()
  })
  test('it should create a user', async (done) => {
    const user = {
      id: 'some-id',
      username: 'some-username',
      email: 'some-email',
      email_verified: 0,
      password: 'some-password',
      role: 'guest',
      last_login: new Date(),
    }
    await request(app)
      .post(`/api/users`)
      .send({user})
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json')
      })
    done()
  })
  test('it should edit a user', async (done) => {
    const userId = 'some-id';
    await request(app)
      .put(`/api/users/${userId}`)
      .send({email: 'some-other-email'})
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.text).toBeDefined()
      })
      done()
  })
  test('it should delete a user', async (done) => {
    const userId = 'some-id';
    await request(app)
      .delete(`/api/users/${userId}`)
      .then(response => {
        expect(response.statusCode).toBe(204);
      })
      done();
  })
})

describe('API videos', () => {
  test('it should get all videos', async (done) => {
    await request(app)
      .get('/api/videos')
      .then(response => {
        expect(response.statusCode).toEqual(200);
        expect(response.type).toBe('application/json')
        expect(response.json)
      })
    done()
  })
  test('it should get a video', async (done) => {
    const videoId = '03dfb315-cbf0-4413-b0bc-13f84428c01c'
    await request(app)
      .get(`/api/videos/${videoId}`)
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.json)
      })
    done()
  })
  test('it should create a video', async (done) => {
    const video = {
      id: 'some-id',
      url: 'some-url',
      name: 'some-name',
      thumbnail_url: 'some-thumbnail',
      duration: 'some duration',
      CourseId: 'ffe56aeb-754e-402d-bb07-879ebfc809bb',
    }
    await request(app)
      .post(`/api/videos`)
      .send({video})
      .then((response) => {
        expect(response.statusCode).toBe(201);
        expect(response.type).toBe('text/html')
      })
    done()
  })
  test('it should edit a video', async (done) => {
    const videoId = 'some-id';
    await request(app)
      .put(`/api/videos/${videoId}`)
      .send({name: 'some-other-name'})
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.text).toBeDefined()
      })
      done()
  })
  test('it should delete a video', async (done) => {
    const videoId = 'some-id';
    await request(app)
      .delete(`/api/videos/${videoId}`)
      .then(response => {
        expect(response.statusCode).toBe(204);
      })
      done();
  })
})

describe('Public controller', () => {
  test('it should resolve index.html', async (done) => {
    await request(app)
      .get('/')
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('text/html')
      })
      done()
  })
  test('it should resolve categories.html', async (done) => {
    await request(app)
      .get('/categories')
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('text/html')
      })
      done()
  })
  test('it should resolve /course.html', async (done) => {
    await request(app)
      .get('/course/ffe56aeb-754e-402d-bb07-879ebfc809bb')
      .set('Authorization', `Bearer ${token}`)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('text/html')
      })
      done()
  })
})
