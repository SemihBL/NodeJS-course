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
    res.render('admin/addPrd', {
        title: 'Add Product',
        path: '/admin/addPrd'
        // categories: categories[0],
    });
}

module.exports.POSTaddPrd = (req, res, next) => {
    // const product = new Product()
    const name = req.body.name;
    const price = req.body.price;
    const image = req.body.image;
    const description = req.body.description;
    // product.categoryid = req.body.categoryid;

    /* CREATE METHOD */

    Product.create({
        name: name, 
        price: price,
        image: image,
        description: description
    }).then(result => {
        console.log(result);
        res.redirect('/admin/products?action=add&name=' + name);
    }).catch(err => {
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

    // SQL CODES WITHOUT SEQUELIZE 

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
    const product = new Product();

    product.id = req.body.id;
    product.name = req.body.name;
    product.price = req.body.price;
    product.image = req.body.image;
    product.description = req.body.description;
    product.categoryid = req.body.categoryid;

    Product.update(product)
        .then(() => {
            res.redirect('/admin/products?action=edit&name=' + product.name + '&id=' + product.id);
        })
        .catch((err) => {
            console.log(err);
        });
}

module.exports.GETdeletePrd = (req, res, next) => {

    Product.findByPk(req.params.productname)
        .then((product) => {
            Category.getById(product[0][0].categoryid).then((category) => {
                res.render('admin/deletePrd', {
                    title: 'Delete Product',
                    product: product[0][0],
                    path: '/admin/deletePrd',
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

module.exports.POSTdeletePrd = (req, res, next) => {
    Product.DeleteById(req.body.id)
        .then((product) => {
            res.redirect('/admin/products?action=delete&name=' + req.body.name);
            console.log(req.body.name)
        })
        .catch((err) => {
            console.log(err)
        });
}