var path = require('path');
const methodOverride = require('method-override');
// import express from 'express';
// import { handlebars } from 'express-handlebars';
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express();
const port = 3000;
// rute tuyến đường

const SortMiddleware = require('./app/middleware/SortMiddleware');


const route = require('./routes');
const db = require('./config/db');

db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());

app.use(methodOverride('_method'));

//customer middleware create
app.use(SortMiddleware);
//HTTP logger 
app.use(morgan('combined'));

//template engine
const hbs = handlebars.create({
    defaultLayout: 'main',
    helpers: {
        sum: (a, b) => a + b,
        sortable: (field, sort) => {
            const sortType = field === sort.column ? sort.type : 'default';
            const icons = {
                default: 'fa-solid fa-sort',
                asc: 'fa-solid fa-arrow-up-wide-short',
                desc: 'fa-solid fa-arrow-up-short-wide'
            }

            const types = {
                default: 'desc',
                asc: 'desc',
                desc: 'asc',
            }
            // const icon = icons[sort.type]
            // const type = types[sort.type]
            const icon = icons[sortType]
            const type = types[sortType]

            return ` <a href="?_sort&column=${field}&type=${type}"> <i class="${icon}"></i></a>`;
        }
    }
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');



// app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));
// console.log('Path' ,path.join(__dirname, 'resources\\views'))

// route Init
route(app);



app.listen(port, () => console.log(`app listening at http://localhost:${port}`))