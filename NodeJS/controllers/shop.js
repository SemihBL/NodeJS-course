const Product = require('../models/product')
const Category = require('../models/category');
const { use } = require('../routes/admin');

module.exports.getIndex = (req, res, next) => {
    Product.findAll(
        { attributes: ['id', 'name', 'price', 'image'] }
    )
        .then(products => {
            Category.findAll()
                .then(categories => {
                    res.render('shop/index', {
                        title: "Shopping",
                        products: products,
                        categories: categories,
                        path: '/'
                    });
                })
                .catch((err) => {
                    console.log(err);
                });

        })
        .catch((err) => {
            console.log(err);
        });

}

module.exports.getProducts = (req, res, next) => {
    Product.findAll(
        { attributes: ['id', 'name', 'price', 'image'] }
    )
        .then(products => {
            Category.findAll()
                .then(categories => {
                    res.render('shop/products', {
                        title: "Products",
                        products: products,
                        categories: categories,
                        path: '/products'
                    })
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => {
            console.log(err);
        });
}

module.exports.getProduct = (req, res, next) => {

    Product.findAll({
        attributes: ['id', 'name', 'price', 'image', 'description', 'categoryId'],
        where: { id: req.params.productid }
    }
    )
        .then(products => {
            Category.findByPk(products[0].categoryId).then(category => {
                res.render('shop/prdDetail', {
                    title: products[0].name,
                    product: products[0],
                    path: '/products',
                    category: category

                })
            });
        })
        .catch((err) => {
            console.log(err);

        });

    // Product.findByPk(req.params.productid)
    //     .then((product) => {
    //         Category.findByPk(product.categoryid)
    //             .then((category) => {
    //                 console.log(category);
    //                 res.render('shop/prdDetail', {
    //                     title: product.name,
    //                     product: product,
    //                     path: '/products',
    //                     // category: category.name
    //                 });
    //             }).catch((err) => {
    //                 console.log(err);

    //             })
    //     })
    //     .catch((err) => {
    //         console.log(err);

    //     });

}

module.exports.getProductsByCategoryId = (req, res, next) => {
    const categoryid = req.params.categoryid
    const model = [];

    Category.findAll()
        .then(categories => {
            model.categories = categories;
            const category = categories.find(i => i.id == categoryid);

            Product.findAll({ where: { categoryId: req.params.categoryid } },
                { attributes: ["id", "name", "price", "image", "description", "categoryId"] })
                .then(products => {
                    console.log(products)
                    res.render('shop/products', {
                        title: 'Products',
                        products: products,
                        categories: model.categories,
                        // selectedCategory: categoryid,
                        path: `/categories/${categoryid}`

                    });
                })
        })
        .catch((err) => {
            console.log(err);
        })

}

module.exports.getCart = (req, res, next) => {
    req.user.getCart()
        .then(cart => {
            return cart.getProducts()
                .then(products => {
                    res.render('shop/cart', {
                        title: "Cart",
                        path: '/cart',
                        products: products
                    });

                })
                .catch(err => {
                    console.log(err);
                });

        }).catch(err => {
            console.log(err)
        });

}

module.exports.postCart = (req, res, next) => {

    const productId = req.body.productId;
    let quantity = Number(req.body.quantity);
    let userCart;

    console.log(quantity);

    req.user.getCart()
        .then(cart => {
            userCart = cart;
            return cart.getProducts({ where: { id: productId } });
        })
        .then(products => {
            let product;
            if (products.length > 0)
                product = products[0];

            if (product) {
                quantity += product.cartItem.quantity;
                return product;
            }
            return Product.findByPk(productId)
        })
        .then(product => {
            userCart.addProduct(product, {
                through: {
                    quantity: quantity
                }
            })
        })
        .then(() => {
            res.redirect('/cart');
        })
        .catch(err => {
            console.log(err)
        });
}

module.exports.getOrders = (req, res, next) => {
    res.render('shop/orders', { title: "Orders", path: '/orders' });
}


// return cart.getProducts()
// .then(products => {
//     res.render('shop/cart', {
//         title: "Cart",
//         path: '/cart',
//         products: products
//     });

// })
// .catch(err => {
//     console.log(err);
// }); 