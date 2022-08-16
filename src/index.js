var path = require('path');
// import express from 'express';
// import { handlebars } from 'express-handlebars';
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express();
const port = 3000;
// rute tuyến đường

const route= require('./routes');


app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({
    extended:true
}))
app.use(express.json());

//HTTP logger 
app.use(morgan('combined'));

//template engine
const hbs = handlebars.create({ defaultLayout:'main' });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');



// app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));
// console.log('Path' ,path.join(__dirname, 'resources\\views'))

// route Init
route(app);






app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

