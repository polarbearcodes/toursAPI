const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
// Middlewares
if (process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'));
}
if (process.env.NODE_ENV == 'production') {
  console.log('production is working');
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
//Route handlers

//CRUD
// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
//start server
module.exports = app;
