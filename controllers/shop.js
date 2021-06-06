const Product = require('../models/product')
const Category = require('../models/category')

module.exports.getIndex = (req, res, next) => {
    Product.getAll()
        .then(products => {
            Category.getAll()
                .then(categories => {
                    res.render('shop/index', {
                        title: "Shopping",
                        products: products[0],
                        categories: categories[0],
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
    Product.getAll()
        .then(products => {
            Category.getAll()
                .then(categories => {
                    res.render('shop/products', {
                        title: "Products",
                        products: products[0],
                        categories: categories[0],
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

module.exports.getProductsByCategoryName = (req, res, next) => {

    Product.getAll()
        .then(() => {
            Category.getAll()
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

module.exports.getProduct = (req, res, next) => {

    Product.getById(req.params.productid)
        .then((product) => {
            Category.getById(product[0][0].categoryid)
                .then((category) => {
                    res.render('shop/prdDetail', {
                        title: product[0][0].name,
                        product: product[0][0],
                        path: '/products',
                        category: category[0][0].name
                    });
                }).catch((err) => {
                    console.log(err);

                })
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
