const express = require('express');
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));


// app.set('view engine', 'pug');
app.use('/', require('./models/routes/index.ts'))

app.listen(3000);