// DATABASE CONNECTION WITHOUT "Sequelize ORM" JUST MYSQL ***

/* const connection = require('../utility/database');

module.exports = class Product {
    constructor(id, name, price, image, description, categoryid) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
        this.description = description;
        this.categoryid = categoryid;
    }

    savePrd() {
        return connection.execute('INSERT INTO products (name, price, image, description, categoryid) VALUES (?, ?, ?, ?, ?)',
            [this.name, this.price, this.image, this.description, this.categoryid]);
    }

    static update(product) {
        return connection.execute('UPDATE products SET products.name=?, products.price=?, products.image=?, products.description=?, products.categoryid=? WHERE products.id=?',
            [product.name, product.price, product.image, product.description, product.categoryid, product.id]);
    } 

    static getAll() {
        return connection.execute('SELECT * FROM products');
    }

    static getById(id) {
        return connection.execute('SELECT * FROM products WHERE id=?', [id]);
    }

    static getProductsByCategoryId(categoryid) {
        return connection.execute('SELECT * FROM products WHERE categoryid=?', [categoryid])
    }

    static getByName(name) {
        return connection.execute('SELECT * FROM products WHERE name=?', [name]);
    }

    static DeleteById(id) {
        return connection.execute('DELETE FROM products WHERE id=?', [id]);
    }

} */

// DATABASE CONNECTION WITH "Sequelize ORM" ***

const Sequelize = require('sequelize');
const sequelize = require('../utility/database');

const Product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

module.exports = Product
