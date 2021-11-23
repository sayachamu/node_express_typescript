// const express = require('express');
import express from 'express';
import routes from './models/routes/index';
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));


// app.set('view engine', 'pug');
// app.use('/', require('./models/routes/index.ts'))
app.use('/', routes)

app.listen(3000);