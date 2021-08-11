const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const path = require('path');
const Errors = require('./controllers/errors');
const sequelize = require('./utility/database');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);

// sequelize.authenticate().then(() => {
//     console.log('success');
// }).catch(err => {
//     console.log('fail: ', err)
// })

app.use(Errors.getError);

sequelize.sync()
    .then(result => {
        console.log(result, 'success')
    })
    .catch(error => {
        console.log(error)
    })

app.listen(3000, () => {
    console.log('Listening on port 3000');
});