const Product = require('../models/product')
const Category = require('../models/category')

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

    Product.findAll(
        { attributes: ['id', 'name', 'price', 'image', 'description'] },
        { where: { id: req.params.productid } }
    )
        .then(products => {
            res.render('shop/prdDetail', {
                title: products[0].name,
                product: products[0],
                path: '/products',
                // category: category.name
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

module.exports.getProductsByCategoryName = (req, res, next) => {

    Product.findAll()
        .then(() => {
            Category.findAll()
                .then((categories) => {
                    const categoryname = req.params.categoryname
                    const category = Category.getByName(categoryname)
                        .then((category) => {
                            res.render('shop/products', {
                                title: "Products",
                                products: Product.getProductsByCategoryId(category[0][0].id),
                                categories: categories[0],
                                path: `/categories/${category[0][0].id}`
                            });
                        })
                        .catch((err) => {
                            console.log(err);
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

module.exports.getCart = (req, res, next) => {
    res.render('shop/cart', { title: "Cart", path: '/cart' });
}

module.exports.getOrders = (req, res, next) => {
    res.render('shop/orders', { title: "Orders", path: '/orders' });
}
