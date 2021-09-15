// DATABASE CONNECTION WITHOUT "Sequelize ORM" JUST MYSQL ***

/* const connection = require('../utility/database');

module.exports = class Category {
    constructor(name, description) {
        // this.id = (Math.floor(Math.random() * 99999) + 1).toString();
        this.id = (categories.length + 1).toString();
        this.name = name;
        this.description = description;
    }

    saveCategory() {
        return connection.execute('INSERT INTO categories (name, description) VALUES (?, ?)'
            , [this.name, this.description])
    }

    static update(category) {
        return connection.execute('UPDATE categories SET categories.name=?, categories.description=? WHERE categories.id=?',
            [category.name, category.description, category.id]);
    }

    static getAll() {
        return connection.execute('SELECT * FROM categories');
    }

    static getById(id) {
        return connection.execute('SELECT * FROM categories WHERE id=?', [id]);
    }

    static getByName(categoryname) {
        return connection.execute('SELECT * FROM categories WHERE name=?', [categoryname]);
    }

    static deleteById(id) {
        return connection.execute('DELETE FROM categories WHERE id=?', [id])
    }
} */

// DATABASE CONNECTION WITH "Sequelize ORM" ***

const Sequelize = require('sequelize');
const sequelize = require('../utility/database');

const Category = sequelize.define('category', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    description: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

module.exports = Category

