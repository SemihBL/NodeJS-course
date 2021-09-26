const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const path = require('path');
const Errors = require('./controllers/errors');
const sequelize = require('./utility/database');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const Category = require('./models/category');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cartItem');

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => {
            console.log(err)
        });
});

// routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);

// sequelize.authenticate().then(() => {
//     console.log('success');
// }).catch(err => {
//     console.log('fail: ', err)
// })

app.use(Errors.getError);

// RELATIONS

// Product.hasOne(Category);
Product.belongsTo(Category, {
    foreignKey: {
        allowNull: false
    }
});
Category.hasMany(Product);

Product.belongsTo(User);
User.hasMany(Product);

User.hasOne(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

let _user;
sequelize
    .sync({ force: true })
    // .sync()
    .then(() => {

        User.findByPk(1)
            .then(user => {
                if (!user) {
                    return User.create(
                        { name: 'semih', email: 'isemihbl@gmail.com' });
                }
                return user;
            }).then(user => {
                _user = user;
                return user.getCart();

            }).then(cart => {
                if (!cart) {
                    return _user.createCart();
                }
                return cart;
            }).then(() => {
                Category.count()
                    .then(count => {
                        if (count === 0) {
                            Category.bulkCreate([
                                { name: 'Tech', description: 'Technology products' },
                                { name: 'Home', description: 'Home decoration' },
                                { name: 'Fashion', description: 'Designer clothes' }
                            ]);
                        }

                    }).catch(err => {
                        console.log(err);
                    });

                Product.count()
                    .then(count => {
                        if (count === 0) {
                            Product.bulkCreate([
                                { name: 'iPhone 12', price: "10000", image: "1.jpg", description: 'Nice', categoryId: 1, userId: 1 },
                                { name: 'iPhone 11', price: "7000", image: "2.jpg", description: 'Nice', categoryId: 2, userId: 1 }
                            ]);
                        }

                    }).catch(err => {
                        console.log(err);
                    });
            })
    })
    .catch(error => {
        console.log(error)
    })

app.listen(3000, () => {
    console.log('Listening on port 3000');
});