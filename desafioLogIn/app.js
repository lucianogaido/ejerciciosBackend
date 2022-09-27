const express = require("express");
const cookieParser = require("cookie-parser");
const session = require('express-session')
const logger = require("morgan");
const MongStore = require('connect-mongo');


const indexRouter = require('./src/routes/index')
require("dotenv").config();


const app = express();

app.use(logger('dev'));


const mongoConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}


app.use(session({
    secret: process.env.SESSION_SECRET || '123456',
    resave: true,
    saveUninitialized: true,
    store: MongStore.create({mongoUrl: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/?retryWrites=true&w=majority`, mongoOptions: mongoConfig })
}))

app.use(cookieParser(process.env.COOKIES_SECRET || '123456'));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(indexRouter)

module.exports = app;
