require('dotenv').config();
const express = require('express');
const { errors } = require('celebrate');

const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

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

const errorHandler = require('./middlewares/errorHandler');
const NotFoundError = require('./errors/not-found-err');

// Слушаем 3000 порт
const { PORT = 3000, LOCALHOST = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

mongoose.connect(LOCALHOST, {
  useNewUrlParser: true,
});

app.use(cors(
  {
    origin: ['http://localhost:3000',
      'http://localhost:3001',
      'https://localhost:3000',
      'https://localhost:3001',
      'https://sashaproject.nomoredomains.monster',
      'http://sashaproject.nomoredomains.monster',
      'https://api.sashaproject.nomoredomains.monster',
      'http://api.sashaproject.nomoredomains.monster',
      'https://www.api.sashaproject.nomoredomains.monster',
      'http://www.api.sashaproject.nomoredomains.monster'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    preflightContinue: false,
    optionSuccessStatus: 200,
  },
));

app.use(cookieParser());
app.use(express.json());
app.use(requestLogger);

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
