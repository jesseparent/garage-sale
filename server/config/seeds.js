const db = require('./connection');
const { Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Electronics' },
    { name: 'Clothing' },
    { name: 'Furniture' },
    { name: 'Sports Equipment' },
    { name: 'Media' },
    { name: 'Tools' },
    { name: 'Recreation' },
    { name: 'Toys' },
    { name: 'Spare Parts' }
  ]);

  console.log('categories seeded');

  process.exit();
});
