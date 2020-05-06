const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./users");
db.role = require("./role");
db.bookModel = require("./books");
db.bookRatingModel = require("./bookRatings");
db.authorModel = require("./authors");
db.categoryModel = require("../models/categories");

db.ROLES = ["user", "admin"];

module.exports = db;