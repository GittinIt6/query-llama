const db = require('../config/connection');
const { User, Survey } = require('../models');
const userSeeds = require('./userSeeds.json');
const surveySeeds = require('./surveySeeds.json');

db.once('open', async () => {
  try {
    await User.deleteMany({});
    await Survey.deleteMany({});

    await User.create(userSeeds);
    await Survey.create(surveySeeds);

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
