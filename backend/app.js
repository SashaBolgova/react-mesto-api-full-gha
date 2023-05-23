require('dotenv').config();
const express = require('express');
const { errors } = require('celebrate');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const { userRouter, cardRouter } = require('./routes/index');
const {
  createUser, login,
} = require('./controllers/users');
const {
  validateSignup, validateSignIn,
} = require('./middlewares/validation');
const { auth } = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const handleCors = require('./middlewares/cors');

const errorHandler = require('./middlewares/errorHandler');
const NotFoundError = require('./errors/not-found-err');

// Слушаем 3000 порт
const { PORT = 3000, LOCALHOST = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

app.use(handleCors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

mongoose.connect(LOCALHOST, {
  useNewUrlParser: true,
});

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Внимание, сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', validateSignup, createUser);
app.post('/signin', validateSignIn, login);

app.use(auth);
app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use(errorLogger);

app.use('*', (req, res, next) => next(new NotFoundError('Страница не найдена')));
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
