const Category = require('../models/category');
const Product = require('../models/product')

module.exports.getPrds = (req, res, next) => {
    Product.findAll()
        .then(products => {
            res.render('admin/products', {
                title: "PrdList",
                products: products,
                path: '/admin/products',
                action: req.query.action,
                name: req.query.name,
                id: req.query.id
            });

        })
        .catch(err => {
            console.log(err)
        });

    // res.sendFile(path.join(__dirname, '../', 'views', 'index.html'))
}

module.exports.GETaddPrd = (req, res, next) => {
    Category.findAll()
        .then((categories) => {
            res.render('admin/addPrd', {
                title: 'Add Product',
                path: '/admin/addPrd',
                categories: categories
            });
        })
        .catch(err => {
            console.log(err);
        });

}

module.exports.POSTaddPrd = (req, res, next) => {
    // const product = new Product()
    const name = req.body.name;
    const price = req.body.price;
    const image = req.body.image;
    const description = req.body.description;
    const categoryid = req.body.categoryid;
    const user = req.user

    /* CREATE METHOD */

    user.createProduct({
        name: name,
        price: price,
        image: image,
        description: description,
        categoryId: categoryid,
        user: user.id
    })
        .then(product => {
            console.log(product);
            res.redirect('/admin/products?action=add&name=' + name);
        })
        .catch(err => {
            console.log(err);
        })

    /* BUILD METHOD
    const prd = Product.build({
        name: name,
        price: price,
        image: image,
        description: description
    })

    prd.save().then(result => {
        console.log(result);
        res.redirect('/admin/products?action=add&name=' + name + '&id=' + result.id);
    }).catch(err => {
        console.log(err);
    })
    */

    // MYSQL CODES WITHOUT SEQUELIZE 

    /*
    product.savePrd()
        .then(() => {
            res.redirect('/admin/products?action=add&name=' + product.name + '&id=' + product.id);
        }).catch((err) => {
            console.log(err);
        }); 
    */
}

module.exports.GETeditPrd = (req, res, next) => {
    Product.findByPk(req.params.productid)
        .then((product) => {
            if (!product) {
                res.redirect('/admin/products?action=cannotfind')
            }
            Category.findAll()
                .then((categories) => {
                    res.render('admin/editPrd', {
                        title: 'Add Product',
                        product: product,
                        categories: categories,
                        path: '/admin/editPrd'
                    });
                })
                .catch((err) => {
                    console.log(err)
                });
        })
        .catch((err) => {
            console.log(err)
        });
}

module.exports.POSTeditPrd = (req, res, next) => {

    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const image = req.body.image;
    const description = req.body.description;
    const categoryId = req.body.categoryid;

    Product.findByPk(id)
        .then(product => {
            product.name = name;
            product.price = price;
            product.image = image;
            product.description = description;
            product.categoryId = categoryId;

            return product.save()
        })
        .then(result => {
            console.log(result);
            res.redirect('/admin/products?action=edit&name=' + name + '&id=' + id);

        })
        .catch((err) => {
            console.log(err)
        });
}

module.exports.GETdeletePrd = (req, res, next) => {

    Product.findByPk(req.params.productid)
        .then((product) => {
            Category.findByPk(product.categoryId)
                .then((category) => {
                    if (!product) {
                        res.redirect('/admin/products?action=cannotfind')
                    }
                    console.log(category)
                    res.render('admin/deletePrd', {
                        title: 'Delete Product',
                        product: product,
                        path: '/admin/deletePrd',
                        category: category.name
                    });
                })
                .catch((err) => {
                    console.log(err);
                })
        }).catch((err) => {
            console.log(err);
        });

}

module.exports.POSTdeletePrd = (req, res, next) => {

    const id = req.body.id

    Product.findByPk(id)
        .then(product => {
            if (!product) {
                res.redirect('/admin/products?action=cannotfind')
            }
            console.log(product)
            return product.destroy();
        })
        .then((result) => {
            console.log(result);
            res.redirect('/admin/products?action=delete&name=' + req.body.name);
        })
        .catch(err => {
            console.log(err);
        });

    // Product.DeleteById(req.body.id)
    //     .then((product) => {
    //         res.redirect('/admin/products?action=delete&name=' + req.body.name);
    //         console.log(req.body.name)
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //     });
}