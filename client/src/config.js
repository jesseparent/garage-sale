export const API_URL = process.env.NODE_ENV === 'production'
// change the heroku to match ours when created
// if image upload stops working on heroku this might be the cause...
  ? 'put heroku url here'
  : 'http://localhost:3001'