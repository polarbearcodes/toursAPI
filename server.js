const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then((con) => {});

app.listen(port, () => {
  console.log(`app listing on port ${port}`);
});
