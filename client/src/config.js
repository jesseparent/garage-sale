export const API_URL = process.env.NODE_ENV === 'production'
// change the heroku to match ours when created
// if image upload stops working on heroku this might be the cause...
  ? 'https://garage-sale-project.herokuapp.com'
  : 'http://localhost:3001'