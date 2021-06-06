const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const path = require('path');
const Errors = require('./controllers/errors');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.set("view engine", "pug");
app.set("views", "views");

// const connection = require('./utility/database');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(Errors.getError);

app.listen(3000, () => {
    console.log('Listening on port 3000');
});