module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
__webpack_require__(21).config();

const WHITELIST = {
  posts: {
    create: ['title', 'text'],
    update: ['title', 'text']
  },
  users: {
    create: ['email', 'username', 'password', 'name']
  },
  products: {
    create: ['title', 'description', 'imageUrl', 'price', 'currency', 'category', 'subCategory'],
    delete: ['_id'],
    update: ['title', 'description', 'imageUrl', 'price', 'currency', 'category', 'subCategory']
  },
  orders: {
    create: ['transaction_id', 'cart', 'shipping_address', 'billing_address', 'stripeToken', 'currency']
  }
};

const devConfig = {
  JWT_SECRET: process.env.JWT_SECRET_DEV,
  MONGO_URL: process.env.MONGO_URL_DEV,
  POSTGRES_URL: process.env.POSTGRES_URL_DEV,
  STRIPE_SECRET: process.env.STRIPE_TEST_SECRET
};

const testConfig = {
  JWT_SECRET: process.env.JWT_SECRET_TEST,
  // MONGO_URL: process.env.MONGO_URL_TEST,
  MONGO_URL: 'mongodb://localhost/node-ecommerce-test',
  STRIPE_SECRET: process.env.STRIPE_TEST_SECRET,
  POSTGRES_URL: process.env.POSTGRES_URL_TEST
};

const prodConfig = {
  JWT_SECRET: process.env.JWT_SECRET_PROD,
  MONGO_URL: process.env.MONGO_URL_PROD,
  POSTGRES_URL: process.env.POSTGRES_URL_PROD,
  STRIPE_SECRET: process.env.STRIPE_LIVE_SECRET
};

const defaultConfig = {
  PORT: process.env.PORT || 4000,
  RAVEN_ID: process.env.RAVEN_ID,
  WHITELIST
};

function envConfig(env) {
  switch (env) {
    case 'development':
      return devConfig;
    case 'test':
      return testConfig;
    default:
      return prodConfig;
  }
}

exports.default = Object.assign({}, defaultConfig, envConfig(process.env.NODE_ENV));

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("http-status");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcryptNodejs = __webpack_require__(36);

var _jsonwebtoken = __webpack_require__(37);

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _sqlTemplateStrings = __webpack_require__(10);

var _sqlTemplateStrings2 = _interopRequireDefault(_sqlTemplateStrings);

var _v = __webpack_require__(11);

var _v2 = _interopRequireDefault(_v);

var _constants = __webpack_require__(0);

var _constants2 = _interopRequireDefault(_constants);

var _database = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /* eslint-disable import/no-mutable-exports */

exports.default = {
  /**
   * Authenticate the user
   *
   * @public
   * @param {String} password - provided by the user
   * @returns {Boolean} isMatch - password match
   */
  authenticateUser(password, hashedPassword) {
    return (0, _bcryptNodejs.compareSync)(password, hashedPassword);
  },

  /**
   * find a user
   * @param  {String}  field the SQL column which to look up
   * @param  {String}  data  the data to find
   * @return {Object|Promise} the user found
   */
  findOne(field, data) {
    return _asyncToGenerator(function* () {
      try {
        const user = yield _database.db.one(`
        SELECT * FROM users
        WHERE $1~=$2
      `, [field, data]);
        return user;
      } catch (err) {
        throw err;
      }
    })();
  },

  /**
   * Parse the user object in data we wanted to send when authenticated
   *
   * @public
   * @returns {Object} User - ready for auth
   */
  toAuthJSON(user) {
    return {
      useruuid: user.useruuid,
      accessToken: user.accesstoken,
      name: user.name,
      username: user.username,
      email: user.email
    };
  },

  createUser(data) {
    return _asyncToGenerator(function* () {
      try {
        /*
          *if (!data.name || !data.email || !data.username || !data.password) {
          *  throw new Error("Fields are missing");
          *}
          */
        yield validateUserData(data);
        const uuid = (0, _v2.default)();
        // TODO: Refactor these queries to an SQL transaction
        const userCreateTransaction = yield _database.db.tx((() => {
          var _ref = _asyncToGenerator(function* (t) {
            const q1 = yield _database.db.none(_sqlTemplateStrings2.default`
        INSERT
         INTO users
         (useruuid, name, accessToken, email, username, password)
         VALUES (${uuid}, ${data.name}, ${_createToken(uuid)}, ${data.email}, ${data.username}, ${_hashPassword(data.password)})
      `);
            const q2 = yield _database.db.one(_sqlTemplateStrings2.default`
        SELECT *
        FROM users
        WHERE "useruuid"=${uuid}
      `);
            return t.batch([q1, q2]);
          });

          return function (_x) {
            return _ref.apply(this, arguments);
          };
        })());
        return userCreateTransaction[1];
      } catch (err) {
        throw err;
      }
    })();
  },

  createCustomer(uuid, customerId) {
    return _asyncToGenerator(function* () {
      try {
        return _database.db.none(_sqlTemplateStrings2.default`
        UPDATE users
        SET stripe_customer_id = ${customerId}
        WHERE useruuid = ${uuid}
      `);
      } catch (err) {
        throw err;
      }
    })();
  },

  deleteUser(uuid) {
    return _asyncToGenerator(function* () {
      try {
        yield _database.db.none(_sqlTemplateStrings2.default`
        DELETE FROM users
        WHERE useruuid=${uuid}
      `);
        return true;
      } catch (err) {
        throw err;
      }
    })();
  },

  updatePassword(data) {
    return _asyncToGenerator(function* () {
      try {
        if (!data.useruuid || !data.password) {
          throw new Error('useruuid and/or password missing.');
        }
        yield validatePassword(data.password, 6);
        const hashedPassword = _hashPassword(data.password);
        return _database.db.one(_sqlTemplateStrings2.default`
        UPDATE users
        SET password = ${hashedPassword},
        updatedAt = now()
        WHERE useruuid = ${data.useruuid}
        returning useruuid
      `);
      } catch (err) {
        throw err;
      }
    })();
  },

  updateEmail(data) {
    return _asyncToGenerator(function* () {
      try {
        if (!data.email || !data.useruuid) {
          throw new Error('useruuid and/or email is missing');
        }
        return _database.db.one(_sqlTemplateStrings2.default`
        UPDATE users
        SET email = ${data.email},
        updatedat = NOW()
        WHERE useruuid = ${data.useruuid}
        returning email
      `);
      } catch (err) {
        throw err;
      }
    })();
  }
};


const validatePassword = (password, minLength) => new Promise((resolve, reject) => {
  if (typeof password !== 'string') {
    reject('Password must be a string');
  } else if (password.length < minLength && !password.match(/\d+/g)) {
    reject(`Password must be at least ${minLength} characters long and contain at least one digit`);
  } else {
    resolve();
  }
});

const validateEmail = email => new Promise((resolve, reject) => {
  if (typeof email !== 'string') {
    reject('Email must be a string');
  } else {
    const emailRegex = /^[-a-z0-9%S_+]+(\.[-a-z0-9%S_+]+)*@(?:[a-z0-9-]{1,63}\.){1,125}[a-z]{2,63}$/i;
    const isValid = emailRegex.test(email);
    if (isValid) {
      resolve();
    } else {
      reject('Email is not in the correct format');
    }
  }
});

const validateUserData = data => new Promise((() => {
  var _ref2 = _asyncToGenerator(function* (resolve, reject) {
    const requiredFields = ['username', 'email', 'password', 'name'];
    const errors = {};
    requiredFields.forEach(function (field) {
      if (!data[field]) {
        errors[field] = 'Field is required';
      }
    });
    if (Object.keys(errors).length !== 0 && errors.constructor === Object) {
      reject(errors);
    } else {
      validatePassword(data.password, 6).then(function () {
        return validateEmail(data.email);
      }).then(function () {
        return resolve();
      }).catch(function (err) {
        return reject(err);
      });
    }
  });

  return function (_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
})());

/**
 * Hash the user password
 *
 * @private
 * @param {String} password - user password choose
 * @returns {String} password - hash password
 */
const _hashPassword = password => (0, _bcryptNodejs.hashSync)(password);

/**
 * Generate a jwt token for authentication
 *
 * @private
 * @param {String} useruuid
 * @returns {String} token - JWT token
 */
const _createToken = uuid => _jsonwebtoken2.default.sign({
  uuid
}, _constants2.default.JWT_SECRET);

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("joi");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.db = undefined;

var _mongoose = __webpack_require__(6);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _pgPromise = __webpack_require__(20);

var _pgPromise2 = _interopRequireDefault(_pgPromise);

var _constants = __webpack_require__(0);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Initialize pg-promise
const pgp = (0, _pgPromise2.default)(); /* eslint-disable no-console */

/**
 * Configuration for the database
 */

const db = pgp(_constants2.default.POSTGRES_URL);

// Remove the warning with Promise
_mongoose2.default.Promise = global.Promise;

// If debug run the mongoose debug options
_mongoose2.default.set('debug', process.env.MONGOOSE_DEBUG);

// Connect the db with the url provide
try {
  _mongoose2.default.connect(_constants2.default.MONGO_URL, {
    useMongoClient: true
  });
} catch (err) {
  _mongoose2.default.createConnection(_constants2.default.MONGO_URL, {
    useMongoClient: true
  });
}

_mongoose2.default.connection.once('open', () => console.log('MongoDB Running')).on('error', e => {
  throw e;
});

exports.db = db;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("express-validation");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filteredBody = filteredBody;
/**
 * Filtered the request body for be sure
 * nothing wrong can be pass.
 *
 * @export
 * @param {Object} body - Request body
 * @param {Array[String]} whitelist - Element who want to whitelist
 * @returns {Object} body - Request body filtered
 */
function filteredBody(body, whitelist) {
  const items = {};

  Object.keys(body).forEach(key => {
    if (whitelist.indexOf(key) >= 0) {
      items[key] = body[key];
    }
  });

  return items;
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authJwt = exports.authLocal = undefined;

var _passport = __webpack_require__(13);

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = __webpack_require__(43);

var _passportLocal2 = _interopRequireDefault(_passportLocal);

var _passportJwt = __webpack_require__(44);

var _user = __webpack_require__(2);

var _user2 = _interopRequireDefault(_user);

var _constants = __webpack_require__(0);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * Local Strategy Auth
 */
const localOpts = { usernameField: 'email' };

const localLogin = new _passportLocal2.default(localOpts, (() => {
  var _ref = _asyncToGenerator(function* (email, password, done) {
    try {
      const user = yield _user2.default.findOne('email', email);
      if (!user) {
        return done(null, false);
      } else if (!_user2.default.authenticateUser(password, user.password)) {
        return done(null, false);
      }

      return done(null, user);
    } catch (e) {
      return done(e, false);
    }
  });

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})());

/**
 * JWT Strategy Auth
 */
const jwtOpts = {
  // Telling Passport to check authorization headers for JWT
  jwtFromRequest: _passportJwt.ExtractJwt.fromAuthHeaderWithScheme('JWT'),
  // Telling Passport where to find the secret
  secretOrKey: _constants2.default.JWT_SECRET
};

const jwtLogin = new _passportJwt.Strategy(jwtOpts, (() => {
  var _ref2 = _asyncToGenerator(function* (payload, done) {
    try {
      const user = yield _user2.default.findOne('useruuid', payload.uuid);
      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    } catch (e) {
      return done(e, false);
    }
  });

  return function (_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
})());

_passport2.default.use(localLogin);
_passport2.default.use(jwtLogin);

const authLocal = exports.authLocal = _passport2.default.authenticate('local', { session: false });
const authJwt = exports.authJwt = _passport2.default.authenticate('jwt', { session: false });

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("sql-template-strings");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("uuid/v4");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(6);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseUniqueValidator = __webpack_require__(14);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _slugify = __webpack_require__(38);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ProductSchema = new _mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: [3, 'Product title must be at least 3 characters long.'],
    trim: true
  },
  description: {
    type: String,
    required: true,
    minLength: [3, 'Product description must be at least 3 characters long.']
  },
  imageUrl: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  subCategory: {
    type: String,
    required: false
  },
  createdBy: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  stock: {
    type: Number,
    required: false,
    default: 1
  }
}, { timestamps: true });

ProductSchema.plugin(_mongooseUniqueValidator2.default, {
  message: '{VALUE} already exists!'
});

ProductSchema.pre('validate', function (next) {
  this.makeSlug();

  next();
});

ProductSchema.statics = {
  createProduct(args, useruuid) {
    return this.create(Object.assign({}, args, {
      createdBy: useruuid
    }));
  },

  getProductsByCategory(category) {
    return this.find({ category });
  }
};

ProductSchema.methods = {
  makeSlug() {
    this.slug = (0, _slugify.slugify)(this.title);
  }
};

ProductSchema.index({ title: 'text', description: 'text' });
const Product = _mongoose2.default.model('Product', ProductSchema);

exports.default = Product;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("mongoose-unique-validator");

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(6);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseUniqueValidator = __webpack_require__(14);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/no-mutable-exports */

const PostSchema = new _mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Title is required!'],
    minlength: [3, 'Title must be longer!'],
    unique: true
  },
  text: {
    type: String,
    required: [true, 'Some text are required!']
  },
  author: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Author is required!']
  },
  favoriteCount: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

PostSchema.plugin(_mongooseUniqueValidator2.default, {
  message: '{VALUE} already taken!'
});

/**
 * Slugify the text on validation hook
 */
// PostSchema.pre("validate", function(next) {});

PostSchema.statics = {
  /**
   * Create a post
   *
   * @public
   * @param {Object} args - Object contains title and text
   * @param {String} authorId - the author id
   * @returns {Post} Post Object - new post create
   */
  createPost(args, authorId) {
    return this.create(Object.assign({}, args, {
      author: authorId
    }));
  },

  /**
   * If you call list() with zero arguments, the destructuring fails,
   * because you can’t match an object pattern against undefined.
   * That can be fixed via a default value. In the following code,
   * the object pattern is matched against {} if there isn’t at least one argument.
   */
  list({ skip = 0, limit = 10 } = {}) {
    return this.find().sort({ createdAt: -1 }).skip(skip).limit(limit).populate('author');
  },

  incFavoriteCount(postId) {
    return this.findByIdAndUpdate(postId, { $inc: { favoriteCount: 1 } });
  },

  decFavoriteCount(postId) {
    return this.findByIdAndUpdate(postId, { $inc: { favoriteCount: -1 } });
  }
};

PostSchema.methods = {
  /**
   * Slug the title and add this to the slug prop
   */
  /**
   * Parse the post in format we want to send.
   *
   * @public
   * @returns {Post} Post Object
   */
  toJSON() {
    return {
      _id: this._id,
      title: this.title,
      text: this.text,
      author: this.author,
      createdAt: this.createdAt,
      favoriteCount: this.favoriteCount
    };
  }
};

let Post;

try {
  Post = _mongoose2.default.model('Post');
} catch (e) {
  Post = _mongoose2.default.model('Post', PostSchema);
}

exports.default = Post;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RequiredError = undefined;

var _httpStatus = __webpack_require__(1);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @extends Error
 */
class ExtendableError extends Error {
  constructor(message, status, isPublic) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
    this.isPublic = isPublic;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor.name);
  }
}

/**
 * Class representing an API error.
 *
 * @extends ExtendableError
 */
class APIError extends ExtendableError {
  /**
   * Creates an API error.
   *
   * @param {String} message - Error message.
   * @param {Number} status - HTTP status code of error.
   * @param {Boolean} isPublic - Whether the message should be visible to user or not.
   */
  constructor(message, status = _httpStatus2.default.INTERNAL_SERVER_ERROR, isPublic = false) {
    super(message, status, isPublic);
  }
}

/**
 * Class for required error
 *
 * @class RequiredError
 */
class RequiredError {
  /**
   * Make error pretty
   *
   * @static
   * @param {Array} errors - Array of error Object
   * @returns {Object} - errors - Pretty Object transform
   */
  static makePretty(errors) {
    return errors.reduce((obj, error) => {
      const nObj = obj;
      nObj[error.field] = error.messages[0].replace(/"/g, '');
      return nObj;
    }, {});
  }
}

exports.RequiredError = RequiredError;
exports.default = APIError;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(3);

var _express2 = _interopRequireDefault(_express);

var _chalk = __webpack_require__(19);

var _chalk2 = _interopRequireDefault(_chalk);

__webpack_require__(5);

var _middlewares = __webpack_require__(22);

var _middlewares2 = _interopRequireDefault(_middlewares);

var _constants = __webpack_require__(0);

var _constants2 = _interopRequireDefault(_constants);

var _routes = __webpack_require__(39);

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { db } from "./config/database";
/* eslint-disable no-console */
/**
 * Server setup
 */

const app = (0, _express2.default)();

// Wrap all the middlewares with the server
(0, _middlewares2.default)(app);

// app.use((req, res, next) => {
//   /* eslint-disable no-param-reassign */
//   req.db = db;
//   next();
// });

// Add the apiRoutes stack to the server
app.use('/api', _routes2.default);

// We need this to make sure we don't run a second instance
if (!module.parent) {
  app.listen(_constants2.default.PORT, err => {
    if (err) {
      console.log(_chalk2.default.red('Cannot run!'));
    } else {
      console.log(_chalk2.default.green.bold(`
        Yep this is working 🍺
        App listen on port: ${_constants2.default.PORT} 🍕
        Env: ${process.env.NODE_ENV} 🦄
      `));
    }
  });
}

exports.default = app;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(18)(module)))

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("chalk");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("pg-promise");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bodyParser = __webpack_require__(23);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = __webpack_require__(24);

var _morgan2 = _interopRequireDefault(_morgan);

var _compression = __webpack_require__(25);

var _compression2 = _interopRequireDefault(_compression);

var _passport = __webpack_require__(13);

var _passport2 = _interopRequireDefault(_passport);

var _expressWinston = __webpack_require__(26);

var _expressWinston2 = _interopRequireDefault(_expressWinston);

var _methodOverride = __webpack_require__(27);

var _methodOverride2 = _interopRequireDefault(_methodOverride);

var _helmet = __webpack_require__(28);

var _helmet2 = _interopRequireDefault(_helmet);

var _cors = __webpack_require__(29);

var _cors2 = _interopRequireDefault(_cors);

var _graphqlServerExpress = __webpack_require__(30);

var _winston = __webpack_require__(31);

var _winston2 = _interopRequireDefault(_winston);

var _schema = __webpack_require__(33);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isTest = process.env.NODE_ENV === 'test';
// import expressStatusMonitor from 'express-status-monitor';
/**
 * Configuration of the server middlewares.
 */

const isDev = process.env.NODE_ENV === 'development';

exports.default = app => {
  app.use((0, _compression2.default)());
  app.use(_bodyParser2.default.json());
  app.use(_bodyParser2.default.urlencoded({ extended: true }));
  app.use(_passport2.default.initialize());
  app.use((0, _helmet2.default)());
  app.use((0, _cors2.default)());
  // app.use(expressStatusMonitor());
  app.use((0, _methodOverride2.default)());
  app.use('/graphql', (0, _graphqlServerExpress.graphqlExpress)({
    schema: _schema.schema
  }));
  app.use('/graphiql', (0, _graphqlServerExpress.graphiqlExpress)({
    endpointURL: '/graphql'
  }));
  if (isDev && !isTest) {
    app.use((0, _morgan2.default)('dev'));
    _expressWinston2.default.requestWhitelist.push('body');
    _expressWinston2.default.responseWhitelist.push('body');
    app.use(_expressWinston2.default.logger({
      winstonInstance: _winston2.default,
      meta: true,
      msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
      colorStatus: true
    }));
  }
};

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("express-winston");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("method-override");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("graphql-server-express");

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _winston = __webpack_require__(32);

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const logger = new _winston2.default.Logger({
  transports: [new _winston2.default.transports.Console({
    json: true,
    colorize: true
  })]
}); /**
     * Create the winston logger instance
     */

exports.default = logger;

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("winston");

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schema = undefined;

var _graphqlTools = __webpack_require__(34);

var _resolvers = __webpack_require__(35);

// Will be implemented at a later stage.

const typeDefs = `
    scalar Date

    type User {
      useruuid: ID!
      username: String
      email: String!
      name: String
      accesstoken: String
      createdat: Date!
      updatedat: Date!
    }

    type Product {
      _id: ID!
      title: String
      price: Float
      currency: String
      category: String
      subCategory: String
      description: String
      createdBy: String
      imageUrl: String
      createdAt: Date!
      updatedAt: Date!
    }

    # This type specifies the entry points into our API.
    type Query {
      products: [Product]
      getUser(useruuid: ID!): User
    }

    # The mutation root type, used to define all mutations.
    #type Mutation {
    #  # A mutation to add a new channel to the list of channels
    #  addChannel(name: String!): Channel
    #}
    `;

const schema = (0, _graphqlTools.makeExecutableSchema)({ typeDefs, resolvers: _resolvers.resolvers });
exports.schema = schema;

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = require("graphql-tools");

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = undefined;

var _user = __webpack_require__(2);

var _user2 = _interopRequireDefault(_user);

var _product = __webpack_require__(12);

var _product2 = _interopRequireDefault(_product);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const resolvers = exports.resolvers = {
  Query: {
    products: () => _product2.default.find({}),
    getUser: (_, { useruuid }) => _user2.default.findOne('useruuid', useruuid)
  }
};

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("bcrypt-nodejs");

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint-disable no-useless-escape */
const slugify = exports.slugify = text => text.toString().toLowerCase().replace(/\s+/g, '-') // Replace spaces with -
.replace(/[^\w\-]+/g, '') // Remove all non-word chars
.replace(/\-\-+/g, '-') // Replace multiple - with single -
.replace(/^-+/, '') // Trim - from start of text
.replace(/-+$/, ''); // Trim - from end of text

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(3);

var _httpStatus = __webpack_require__(1);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _user = __webpack_require__(40);

var _user2 = _interopRequireDefault(_user);

var _product = __webpack_require__(45);

var _product2 = _interopRequireDefault(_product);

var _order = __webpack_require__(48);

var _order2 = _interopRequireDefault(_order);

var _post = __webpack_require__(54);

var _post2 = _interopRequireDefault(_post);

var _seed = __webpack_require__(56);

var _seed2 = _interopRequireDefault(_seed);

var _error = __webpack_require__(16);

var _error2 = _interopRequireDefault(_error);

var _log = __webpack_require__(60);

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = new _express.Router();

// Middlewares
/**
 * API Routes
 */

const isDev = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV === 'test';

routes.use('/users', _user2.default);
routes.use('/posts', _post2.default);
routes.use('/products', _product2.default);
routes.use('/orders', _order2.default);

if (isDev || isTest) {
  routes.use('/seeds', _seed2.default);
}

routes.all('*', (req, res, next) => next(new _error2.default('Not Found!', _httpStatus2.default.NOT_FOUND, true)));
routes.use(_log2.default);

exports.default = routes;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(3);

var _expressValidation = __webpack_require__(7);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _user = __webpack_require__(41);

var UserController = _interopRequireWildcard(_user);

var _authentication = __webpack_require__(42);

var AuthenticationController = _interopRequireWildcard(_authentication);

var _auth = __webpack_require__(9);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = new _express.Router(); /**
                                       * User Routes
                                       */

routes.post('/signup', (0, _expressValidation2.default)(UserController.validation.create), UserController.create);
routes.post('/login', (0, _expressValidation2.default)(AuthenticationController.validation.login), _auth.authLocal, AuthenticationController.login);

exports.default = routes;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = exports.validation = undefined;

/**
 * @api {post} /users/signup Create a user
 * @apiDescription Create a user
 * @apiName createUser
 * @apiGroup User
 *
 * @apiParam (Body) {String} email User email.
 * @apiParam (Body) {String} password User password.
 * @apiParam (Body) {String} username User username.
 * @apiParam (Body) {String} name User name.
 *
 * @apiSuccess {Number} status Status of the Request.
 * @apiSuccess {String} _id User _id.
 * @apiSuccess {String} token Authentication token.
 *
 * @apiSuccessExample Success-Response:
 *
 * HTTP/1.1 200 OK
 *
 * {
 *  _id: '123',
 *  token: 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTBhMWI3ODAzMDI3N2NiNjQxM2JhZGUiLCJpYXQiOjE0OTM4MzQ2MTZ9.RSlMF6RRwAALZQRdfKrOZWnuHBk-mQNnRcCLJsc8zio',
 * }
 *
 * @apiErrorExample {json} Error
 *  HTTP/1.1 400 Bad Request
 *
 *  {
 *    email: 'email is required'
 *  }
 */
let create = exports.create = (() => {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    const body = (0, _filteredBody.filteredBody)(req.body, _constants2.default.WHITELIST.users.create);
    try {
      const newUser = yield _user2.default.createUser(body);
      return res.status(_httpStatus2.default.CREATED).json(_user2.default.toAuthJSON(newUser));
    } catch (e) {
      e.status = _httpStatus2.default.BAD_REQUEST;
      return next(e);
    }
  });

  return function create(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

var _joi = __webpack_require__(4);

var _joi2 = _interopRequireDefault(_joi);

var _httpStatus = __webpack_require__(1);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _filteredBody = __webpack_require__(8);

var _constants = __webpack_require__(0);

var _constants2 = _interopRequireDefault(_constants);

var _user = __webpack_require__(2);

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * User controller
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */

const validation = exports.validation = {
  create: {
    body: {
      email: _joi2.default.string().email().required(),
      password: _joi2.default.string().min(6).regex(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/).required(),
      username: _joi2.default.string().min(3).max(20).required(),
      name: _joi2.default.string().min(2).regex(/[a-zA-Z]+/).required()
    }
  }
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = exports.validation = undefined;

/**
 * @api {post} /users/login Login a user
 * @apiDescription Login a user
 * @apiName loginUser
 * @apiGroup User
 *
 * @apiParam (Body) {String} email User email.
 * @apiParam (Body) {String} password User password.
 *
 * @apiSuccess {Number} status Status of the Request.
 * @apiSuccess {String} _id User _id.
 * @apiSuccess {String} token Authentication token.
 *
 * @apiSuccessExample Success-Response:
 *
 * HTTP/1.1 200 OK
 *
 * {
 *  _id: '123',
 *  token: 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTBhMWI3ODAzMDI3N2NiNjQxM2JhZGUiLCJpYXQiOjE0OTM4MzQ2MTZ9.RSlMF6RRwAALZQRdfKrOZWnuHBk-mQNnRcCLJsc8zio',
 * }
 *
 * @apiErrorExample {json} Error
 *  HTTP/1.1 400 Bad Request
 *
 *  {
 *    email: 'email is required'
 *  }
 */
let login = exports.login = (() => {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    // const data = await db.one("SELECT * FROM users");
    // console.log(data);
    res.status(_httpStatus2.default.OK).json(_user2.default.toAuthJSON(req.user));

    return next();
  });

  return function login(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

var _httpStatus = __webpack_require__(1);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _joi = __webpack_require__(4);

var _joi2 = _interopRequireDefault(_joi);

var _user = __webpack_require__(2);

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Authentication controller
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */

const validation = exports.validation = {
  login: {
    body: {
      email: _joi2.default.string().email().required(),
      password: _joi2.default.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
    }
  }
};

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = require("passport-jwt");

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(3);

var _expressValidation = __webpack_require__(7);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _product = __webpack_require__(46);

var ProductController = _interopRequireWildcard(_product);

var _auth = __webpack_require__(9);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Product Routes
 */

const routes = new _express.Router();

routes.route('/').post(_auth.authJwt, (0, _expressValidation2.default)(ProductController.validation.create), ProductController.createProduct).get(ProductController.getAllProducts);

// routes.route("/search").get(ProductController.searchProducts);

routes.route('/:id').delete(_auth.authJwt, ProductController.deleteProduct).patch(_auth.authJwt, (0, _expressValidation2.default)(ProductController.validation.update), ProductController.updateProduct).get(ProductController.getSingleProduct);

exports.default = routes;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSingleProduct = exports.updateProduct = exports.getAllProducts = exports.deleteProduct = exports.createProduct = exports.validation = undefined;

var _joi = __webpack_require__(4);

var _joi2 = _interopRequireDefault(_joi);

var _httpStatus = __webpack_require__(1);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _mongodb = __webpack_require__(47);

var _constants = __webpack_require__(0);

var _constants2 = _interopRequireDefault(_constants);

var _filteredBody = __webpack_require__(8);

var _product = __webpack_require__(12);

var _product2 = _interopRequireDefault(_product);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const validation = exports.validation = {
  create: {
    body: {
      title: _joi2.default.string().min(3).required(),
      description: _joi2.default.string().min(3).required(),
      imageUrl: _joi2.default.string().min(3).required(),
      price: _joi2.default.number().required(),
      currency: _joi2.default.string().required(),
      category: _joi2.default.string().min(2).required(),
      subCategory: _joi2.default.string()
    }
  },
  update: {
    body: {
      title: _joi2.default.string().min(3),
      description: _joi2.default.string().min(3),
      imageUrl: _joi2.default.string().min(3),
      price: _joi2.default.number(),
      currency: _joi2.default.string(),
      category: _joi2.default.string().min(2),
      subCategory: _joi2.default.string()
    }
  },
  delete: {
    body: {
      _id: _joi2.default.string().min(24).required()
    }
  }
};

/**
 * @api {post} /products Create a product
 * @apiDescription Create a product
 * @apiName createProduct
 * @apiGroup Product
 *
 * @apiParam (body) {String} title
 * @apiParam (body) {String} description
 * @apiParam (body) {String} imageUrl
 * @apiParam (body) {Number} price
 * @apiParam (body) {String} currency
 * @apiParam (body) {String} category
 * @apiParam (body) {[String]} subCategory
 *
 * @apiHeader {Authorization} Authorization JWT Token
 *
 * @apiSuccess {Number} status Status of the Request
 * @apiSuccess {String} message Description of what has been done.
 *
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Authorization": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTBhMWI3ODAzMDI3N2NiNjQxM2JhZGUiLCJpYXQiOjE0OTM4MzQ2MTZ9.RSlMF6RRwAALZQRdfKrOZWnuHBk-mQNnRcCLJsc8zio"
 * }
 *
 * @apiSuccessExample Success-Response:
 *
 * HTTP/1.1 201 CREATED
 *
 * {
 *  message: 'New product created.'
 * }
 *
 * @apiErrorExample {json} Unauthorized
 *    HTTP/1.1 401 Unauthorized
 */
const createProduct = exports.createProduct = (() => {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    const body = (0, _filteredBody.filteredBody)(req.body, _constants2.default.WHITELIST.products.create);
    try {
      const newProduct = yield _product2.default.createProduct(body, req.user.useruuid);
      res.status(_httpStatus2.default.CREATED).json({ product: newProduct, message: 'New product created. ' });
    } catch (err) {
      return next(err);
    }
  });

  return function createProduct(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

/**
 * @api {delete} /products/:id Delete a product
 * @apiDescription Delete a product
 * @apiName deleteProduct
 * @apiGroup Product
 *
 * @apiParam (param) {String} id MongoDB ObjectID of the Product
 *
 * @apiHeader {Authorization} Authorization JWT Token
 *
 * @apiSuccess {Number} status Status of the Request
 * @apiSuccess {String} message Description of what has been done.
 * @apiSuccess {Object} deleted The object of the product that has been deleted
 *
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Authorization": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTBhMWI3ODAzMDI3N2NiNjQxM2JhZGUiLCJpYXQiOjE0OTM4MzQ2MTZ9.RSlMF6RRwAALZQRdfKrOZWnuHBk-mQNnRcCLJsc8zio"
 *
 * }
 *
 * @apiSuccessExample Success-Response:
 *
 * HTTP/1.1 201 CREATED
 *
 * {
 *  message: 'New product created.'
 * }
 *
 * @apiErrorExample {json} Unauthorized
 *    HTTP/1.1 401 Unauthorized
 */
const deleteProduct = exports.deleteProduct = (() => {
  var _ref2 = _asyncToGenerator(function* (req, res, next) {
    // const body = filteredBody(req.body, constants.WHITELIST.products.delete);
    try {
      if (!_mongodb.ObjectID.isValid(req.params.id)) {
        return res.status(_httpStatus2.default.BAD_REQUEST).json({ message: 'Invalid MongoDB ObjectID.' });
      }
      const product = yield _product2.default.findById(req.params.id);
      // if (!deletedProduct) {
      //   /* eslint-disable no-throw-literal */
      //   throw {
      //     name: "Product error",
      //     message: "No product found with that _id",
      //     status: 400
      //   };
      // }
      const removedProduct = yield product.remove();
      return res.status(_httpStatus2.default.OK).json({
        deleted: removedProduct.toObject(),
        message: 'Product has been deleted.'
      });
    } catch (err) {
      return next(err);
    }
  });

  return function deleteProduct(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
})();

/**
 * @api {get} /products Get products
 * @apiDescription Get all products or products of a specific category
 * @apiName getAllProducts
 * @apiGroup Product
 *
 * @apiHeader {Authorization} Authorization JWT Token
 *
 * @apiParam (query) {[String]} category The product category to find products of.
 *
 * @apiSuccess {Number} status Status of the Request.
 * @apiSuccess {Array[]} product List of products.
 * @apiSuccess {String} product._id Product _id.
 * @apiSuccess {String} product.title Product title.
 * @apiSuccess {Number} product.price Product price.
 * @apiSuccess {String} product.currency Product currency.
 * @apiSuccess {String} product.slug Product slug.
 * @apiSuccess {String} product.imageUrl Product imageUrl.
 * @apiSuccess {String} product.category Product category.
 * @apiSuccess {String} product.createdBy Product creator useruuid.
 * @apiSuccess {String} product.createdAt Product created date.
 * @apiSuccess {String} product.updatedAt Product updated date.
 *
 *
 * @apiParam (Login) {String} pass Only logged in users can do this.
 *
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "AUTHORIZATION": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTBhMWI3ODAzMDI3N2NiNjQxM2JhZGUiLCJpYXQiOjE0OTM4MzQ2MTZ9.RSlMF6RRwAALZQRdfKrOZWnuHBk-mQNnRcCLJsc8zio"
 * }
 *
 * @apiSuccessExample Success-Response:
 *
 * HTTP/1.1 200 OK
 *
 * [
 * 	{
 *		"_id": "59dcf71bb5e1ad3b38395432",
 *		"updatedAt": "2017-10-10T16:36:43.433Z",
 *		"createdAt": "2017-10-10T16:36:43.433Z",
 *		"slug": "sysadmin-101",
 *		"title": "Sysadmin 101",
 *		"description": "The one and only sysadmin book you need!",
 *		"price": 400,
 *		"currency": "SEK",
 *		"imageUrl": "https://images-na.ssl-images-amazon.com/images/I/61iWkQ87uTL._SX381_BO1,204,203,200_.jpg",
 *		"category": "Books",
 *		"createdBy": "e499f2f4-6d9c-449d-9753-82827c9e5e50",
 *		"__v": 0
 *	}
 * ]
 *
 * @apiErrorExample {json}
 *    HTTP/1.1 400 Bad Request
 * @apiErrorExample {json} Unauthorized
 *    HTTP/1.1 401 Unauthorized
 */
const getAllProducts = exports.getAllProducts = (() => {
  var _ref3 = _asyncToGenerator(function* (req, res, next) {
    try {
      if (req.query.category) {
        const products = yield _product2.default.getProductsByCategory(req.query.category);
        return res.status(_httpStatus2.default.OK).json(products);
      }
      return res.status(_httpStatus2.default.OK).json((yield _product2.default.find()));
    } catch (err) {
      err.status = _httpStatus2.default.BAD_REQUEST;
      next(err);
    }
  });

  return function getAllProducts(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
})();

// export const searchProducts = async (req, res, next) => {
//   try {
//     const searchTerms = req.query.q;
//     return Product.search(
//       { query_string: { query: `*${searchTerms}*` } },
//       { hydrate: true },
//       (err, results) => {
//         if (err) {
//           throw err;
//         }
//         return res.status(HTTPStatus.OK).json(results.hits);
//       }
//     );
//   } catch (err) {
//     err.status = HTTPStatus.BAD_REQUEST;
//     next(err);
//   }
// };

// TODO: Write apidoc spec
const updateProduct = exports.updateProduct = (() => {
  var _ref4 = _asyncToGenerator(function* (req, res, next) {
    const body = (0, _filteredBody.filteredBody)(req.body, _constants2.default.WHITELIST.products.update);
    const productId = req.params.id;
    try {
      if (!_mongodb.ObjectID.isValid(productId)) {
        return res.status(_httpStatus2.default.BAD_REQUEST).json({ message: 'Invalid MongoDB ObjectID.' });
      }
      const currentProduct = yield _product2.default.findById(productId);
      // Set the updated data
      // TODO: Perhaps change the way that it is updated with ex. findByIdAndUpdate
      yield currentProduct.set(Object.assign({}, body));
      // Save the updated product and send it back.
      return res.status(_httpStatus2.default.OK).json((yield currentProduct.save()));
    } catch (err) {
      err.status = _httpStatus2.default.BAD_REQUEST;
      next(err);
    }
  });

  return function updateProduct(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
})();
// TODO: Write apidoc spec
const getSingleProduct = exports.getSingleProduct = (() => {
  var _ref5 = _asyncToGenerator(function* (req, res, next) {
    if (req.params.id) {
      const productId = req.params.id;
      try {
        if (!_mongodb.ObjectID.isValid(productId)) {
          return res.status(_httpStatus2.default.BAD_REQUEST).json({ message: 'Invalid MongoDB ObjectID.' });
        }
        const product = yield _product2.default.findById(productId);
        if (!product) {
          return res.status(_httpStatus2.default.BAD_REQUEST).json({ message: 'A product with that id could not be found.' });
        }
        return res.status(_httpStatus2.default.OK).json(product);
      } catch (err) {
        err.status = _httpStatus2.default.BAD_REQUEST;
        next(err);
      }
    } else if (req.query.slug) {
      const productSlug = req.query.slug;
      try {
        const product = yield _product2.default.find({ slug: productSlug });
        if (!product) {
          return res.status(_httpStatus2.default.BAD_REQUEST).json({ message: 'A product with that id could not be found.' });
        }
        return res.status(_httpStatus2.default.OK).json(product);
      } catch (err) {
        err.status = _httpStatus2.default.BAD_REQUEST;
        next(err);
      }
    } else {
      return res.status(_httpStatus2.default.BAD_REQUEST).json({ message: 'Please specify id as a param or slug as a query' });
    }
  });

  return function getSingleProduct(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
})();

/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = require("mongodb");

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(3);

var _expressValidation = __webpack_require__(7);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _order = __webpack_require__(49);

var OrderController = _interopRequireWildcard(_order);

var _auth = __webpack_require__(9);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Order Routes
 */

const routes = new _express.Router();

routes.route('/').post(_auth.authJwt, (0, _expressValidation2.default)(OrderController.validation), OrderController.createOrder);

exports.default = routes;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createOrder = exports.validation = undefined;

var _joi = __webpack_require__(4);

var _joi2 = _interopRequireDefault(_joi);

var _httpStatus = __webpack_require__(1);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _orderModel = __webpack_require__(50);

var _orderModel2 = _interopRequireDefault(_orderModel);

var _filteredBody = __webpack_require__(8);

var _constants = __webpack_require__(0);

var _constants2 = _interopRequireDefault(_constants);

var _payment = __webpack_require__(51);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const validation = exports.validation = {
  create: {
    body: {
      cart: _joi2.default.object().required(),
      transaction_id: _joi2.default.string().guid({ version: 'uuidv4' }),
      shipping_address: _joi2.default.object().required(),
      billing_address: _joi2.default.object().required(),
      stripeToken: _joi2.default.string().required(),
      currency: _joi2.default.string().required()
    }
  }
};

const createOrder = exports.createOrder = (() => {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    const body = (0, _filteredBody.filteredBody)(req.body, _constants2.default.WHITELIST.orders.create);
    try {
      const order = yield _orderModel2.default.createOrder(Object.assign({}, body, {
        created_by: req.user.useruuid
      }));
      let customerId = req.user.stripe_customer_id;
      if (!customerId) {
        customerId = yield (0, _payment.createCustomer)(req.user.useruuid, {
          email: req.user.email,
          source: body.stripeToken
        });
      }
      yield (0, _payment.createCharge)(req.user.useruuid, {
        currency: body.currency,
        amount: parseFloat(order.total_price),
        customer: customerId,
        order_id: order.order_id,
        billing_address: body.billing_address
      });
      return res.status(_httpStatus2.default.CREATED).json({ message: 'Order created', order });
    } catch (err) {
      err.status = _httpStatus2.default.BAD_REQUEST;
      next(err);
    }
  });

  return function createOrder(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sqlTemplateStrings = __webpack_require__(10);

var _sqlTemplateStrings2 = _interopRequireDefault(_sqlTemplateStrings);

var _v = __webpack_require__(11);

var _v2 = _interopRequireDefault(_v);

var _mongoose = __webpack_require__(6);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _database = __webpack_require__(5);

var _product = __webpack_require__(12);

var _product2 = _interopRequireDefault(_product);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
  createOrder(data) {
    return _asyncToGenerator(function* () {
      try {
        yield validateOrderData(data);
        const orderId = (0, _v2.default)();
        const cart = data.cart;
        let totalPrice = 0;
        const productIds = [];
        Object.keys(cart).forEach(function (productId) {
          productIds.push(productId);
        });
        const products = yield _product2.default.find({
          _id: { $in: productIds.map(function (id) {
              return _mongoose2.default.Types.ObjectId(id);
            }) }
        });
        products.map(function (product) {
          return totalPrice += cart[product._id].qty * product.price;
        });
        // db.tx(t => {
        //   const q1 = t.one(SQL`
        //     INSERT INTO orders
        //     (order_id, created_by, cart, total_price, transaction_id, shipping_address)
        //     VALUES (
        //       ${orderId},
        //       ${data.created_by},
        //       ${data.cart},
        //       ${totalPrice},
        //       ${data.transaction_id},
        //       ${data.shipping_address}
        //     )
        //     returning order_id
        //   `);
        //   const q2 = t.none;
        // });
        return yield _database.db.one(_sqlTemplateStrings2.default`
        INSERT INTO orders
        (order_id, created_by, cart, total_price, shipping_address)
        VALUES (
          ${orderId},
          ${data.created_by},
          ${data.cart},
          ${totalPrice},
          ${data.shipping_address}
        )
        returning order_id, total_price
      `);
      } catch (err) {
        throw err;
      }
    })();
  },

  getAllOrders() {
    return _asyncToGenerator(function* () {
      try {
        return yield _database.db.any(_sqlTemplateStrings2.default`
        SELECT * FROM orders
      `);
      } catch (err) {
        throw err;
      }
    })();
  },

  getOrder(orderId) {
    return _asyncToGenerator(function* () {
      try {
        return yield _database.db.one(_sqlTemplateStrings2.default`
        SELECT * FROM orders
        WHERE order_id = ${orderId}
      `);
      } catch (err) {
        throw err;
      }
    })();
  }
};

// TODO: Write a utility for this function because it is repeating in every model.

function validateOrderData(data) {
  return new Promise((resolve, reject) => {
    const requiredFields = ['cart', 'created_by', 'shipping_address'];
    const errors = {};
    requiredFields.forEach(field => {
      if (!data[field]) {
        errors[field] = 'Field is required';
      }
    });
    if (Object.keys(errors).length !== 0 && errors.constructor === Object) {
      reject(errors);
    } else {
      resolve();
    }
  });
}

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCustomer = exports.createCharge = undefined;

let createCharge = exports.createCharge = (() => {
  var _ref = _asyncToGenerator(function* (useruuid, chargeDetails) {
    try {
      const charge = yield stripe.charges.create({
        amount: chargeDetails.amount * 100,
        customer: chargeDetails.customer,
        currency: chargeDetails.currency
      });
      return yield _transaction2.default.createTransaction({
        created_by: useruuid,
        amount: chargeDetails.amount,
        currency: chargeDetails.currency,
        stripe_customer_id: chargeDetails.customer,
        billing_address: chargeDetails.billing_address,
        stripe_charge_id: charge.id,
        order_id: chargeDetails.order_id
      });
    } catch (err) {
      throw err;
    }
  });

  return function createCharge(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

let createCustomer = exports.createCustomer = (() => {
  var _ref2 = _asyncToGenerator(function* (useruuid, customerDetails) {
    try {
      const customer = yield stripe.customers.create(Object.assign({}, customerDetails));
      yield _user2.default.createCustomer(useruuid, customer.id);
      return customer.id;
    } catch (err) {
      throw err;
    }
  });

  return function createCustomer(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})();

var _stripe = __webpack_require__(52);

var _stripe2 = _interopRequireDefault(_stripe);

var _user = __webpack_require__(2);

var _user2 = _interopRequireDefault(_user);

var _transaction = __webpack_require__(53);

var _transaction2 = _interopRequireDefault(_transaction);

var _constants = __webpack_require__(0);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const stripe = (0, _stripe2.default)(_constants2.default.STRIPE_SECRET);

/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = require("stripe");

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sqlTemplateStrings = __webpack_require__(10);

var _sqlTemplateStrings2 = _interopRequireDefault(_sqlTemplateStrings);

var _v = __webpack_require__(11);

var _v2 = _interopRequireDefault(_v);

var _database = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
  createTransaction(data) {
    return _asyncToGenerator(function* () {
      try {
        yield validadateTransactionData(data);
        const transactionId = (0, _v2.default)();
        const transaction = yield _database.db.tx((() => {
          var _ref = _asyncToGenerator(function* (t) {
            const q1 = yield t.one(_sqlTemplateStrings2.default`
          SELECT order_id, total_price FROM orders
          WHERE order_id = ${data.order_id}
        `);
            const q2 = yield t.one(_sqlTemplateStrings2.default`
          INSERT INTO transactions
          (transaction_id, created_by, amount, currency, stripe_customer_id, stripe_charge_id, order_id, billing_address)
          VALUES (
            ${transactionId},
            ${data.created_by},
            ${parseFloat(q1.total_price)},
            ${data.currency},
            ${data.stripe_customer_id},
            ${data.stripe_charge_id},
            ${q1.order_id},
            ${data.billing_address}
          )
          returning transaction_id
        `);
            const q3 = t.none(_sqlTemplateStrings2.default`
          UPDATE orders
          SET transaction_id = ${q2.transaction_id}
          WHERE order_id = ${q1.order_id}
        `);
            return t.batch([q1, q2, q3]);
          });

          return function (_x) {
            return _ref.apply(this, arguments);
          };
        })());
        return transaction;
      } catch (err) {
        throw err;
      }
    })();
  }
};


function validadateTransactionData(data) {
  return new Promise((() => {
    var _ref2 = _asyncToGenerator(function* (resolve, reject) {
      const requiredFields = ['created_by', 'amount', 'currency', 'stripe_customer_id', 'stripe_charge_id', 'order_id', 'billing_address'];
      const errors = {};
      requiredFields.forEach(function (field) {
        if (!data[field]) {
          errors[field] = 'Field is required';
        }
      });
      if (Object.keys(errors).length !== 0 && errors.constructor === Object) {
        reject(errors);
      } else {
        resolve();
      }
    });

    return function (_x2, _x3) {
      return _ref2.apply(this, arguments);
    };
  })());
}

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(3);

var _expressValidation = __webpack_require__(7);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _post = __webpack_require__(55);

var PostController = _interopRequireWildcard(_post);

var _auth = __webpack_require__(9);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Post Routes
 */

const routes = new _express.Router();

/**
 * CRUD
 */
routes.get('/', _auth.authJwt, PostController.getList);
routes.get('/:id', _auth.authJwt, PostController.getById);
routes.post('/', _auth.authJwt, (0, _expressValidation2.default)(PostController.validation.create), PostController.create);
routes.patch('/:id', _auth.authJwt, (0, _expressValidation2.default)(PostController.validation.update), PostController.updatePost);
routes.delete('/:id', _auth.authJwt, PostController.deletePost);

/**
 * Favorites
 */
routes.post('/:id/favorite', _auth.authJwt, PostController.favoritePost);

exports.default = routes;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.favoritePost = exports.updatePost = exports.deletePost = exports.create = exports.getById = exports.getList = exports.validation = undefined;

/**
 * @api {get} /posts Get posts
 * @apiDescription Get a list of posts
 * @apiName getListOfPost
 * @apiGroup Post
 *
 * @apiHeader {Authorization} Authorization JWT Token
 *
 * @apiParam (query) {Int} skip Number of skip posts
 * @apiParam (query) {Int} limit Maximum number of posts
 *
 * @apiSuccess {Number} status Status of the Request.
 * @apiSuccess {Object[]} post Post list.
 * @apiSuccess {String} post._id Post _id.
 * @apiSuccess {String} post.title Post title.
 * @apiSuccess {String} post.text Post text.
 * @apiSuccess {Object} post.author Post author.
 * @apiSuccess {String} post.author._id Post author _id.
 * @apiSuccess {String} post.author.username Post author username.
 * @apiSuccess {String} post.createdAt Post created date.
 *
 *
 * @apiParam (Login) {String} pass Only logged in users can do this.
 *
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "AUTHORIZATION": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTBhMWI3ODAzMDI3N2NiNjQxM2JhZGUiLCJpYXQiOjE0OTM4MzQ2MTZ9.RSlMF6RRwAALZQRdfKrOZWnuHBk-mQNnRcCLJsc8zio"
 * }
 *
 * @apiSuccessExample Success-Response:
 *
 * HTTP/1.1 200 OK
 *
 * [
 *  {
 *    _id: '123',
 *    title: 'New title 1',
 *    text: 'New text 1',
 *    createdAt: '2017-05-03',
 *    author: {
 *      _id: '123312',
 *      username: 'Jon'
 *    }
 *  },
 *  {
 *    _id: '12234',
 *    title: 'New title 2',
 *    text: 'New text 2',
 *    createdAt: '2017-05-03',
 *    author: {
 *      _id: '123312234',
 *      username: 'Jon'
 *    }
 *  }
 * ]
 *
 * @apiErrorExample {json} Post not found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Unauthorized
 *    HTTP/1.1 401 Unauthorized
 */
let getList = exports.getList = (() => {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    try {
      const promise = yield Promise.all([_user2.default.findById(req.user._id), _post2.default.list({ skip: req.query.skip, limit: req.query.limit })]);

      const postsWithFavorite = promise[1].reduce(function (arr, post) {
        const favorite = promise[0]._favorites.isPostIsFavorite(post._id);
        arr.push(Object.assign({}, post.toJSON(), {
          favorite
        }));

        return arr;
      }, []);

      return res.status(_httpStatus2.default.OK).json(postsWithFavorite);
    } catch (err) {
      err.status = _httpStatus2.default.BAD_REQUEST;
      return next(err);
    }
  });

  return function getList(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

/**
 * @api {get} /posts/:id Get a single post
 * @apiDescription Get a single post
 * @apiName getPost
 * @apiGroup Post
 *
 * @apiHeader {Authorization} Authorization JWT Token
 *
 * @apiSuccess {Number} status Status of the Request.
 * @apiSuccess {Object} post Post created.
 * @apiSuccess {String} post._id Post _id.
 * @apiSuccess {String} post.title Post title.
 * @apiSuccess {String} post.text Post text.
 * @apiSuccess {Object} post.author Post author.
 * @apiSuccess {String} post.author._id Author id.
 * @apiSuccess {String} post.author.username Author username.
 * @apiSuccess {String} post.createdAt Post created date.
 * @apiSuccess {Boolean} favorite User have favorite post
 *
 * @apiParam (Login) {String} pass Only logged in users can do this.
 *
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "AUTHORIZATION": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTBhMWI3ODAzMDI3N2NiNjQxM2JhZGUiLCJpYXQiOjE0OTM4MzQ2MTZ9.RSlMF6RRwAALZQRdfKrOZWnuHBk-mQNnRcCLJsc8zio"
 * }
 *
 * @apiSuccessExample Success-Response:
 *
 * HTTP/1.1 200 OK
 *
 * {
 *  _id: '123',
 *  title: 'a title',
 *  text: 'a text',
 *  createdAt: '2017-05-03',
 *  author: {
 *    _id: '123312',
 *    username: 'Jon'
 *  },
 *  favorite: true
 * }
 *
 * @apiErrorExample {json} Post not found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Unauthorized
 *    HTTP/1.1 401 Unauthorized
 */


let getById = exports.getById = (() => {
  var _ref2 = _asyncToGenerator(function* (req, res, next) {
    try {
      const promise = yield Promise.all([_user2.default.findById(req.user._id), _post2.default.findById(req.params.id).populate('author')]);
      const favorite = promise[0]._favorites.isPostIsFavorite(req.params.id);
      return res.status(_httpStatus2.default.OK).json(Object.assign({}, promise[1].toJSON(), {
        favorite
      }));
    } catch (err) {
      err.status = _httpStatus2.default.BAD_REQUEST;
      return next(err);
    }
  });

  return function getById(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
})();

/**
 * @api {post} /posts Create a post
 * @apiDescription Create a post
 * @apiName createPost
 * @apiGroup Post
 *
 * @apiParam (Body) {String} title Post title.
 * @apiParam (Body) {String} text Post text.
 *
 * @apiHeader {Authorization} Authorization JWT Token
 *
 * @apiSuccess {Number} status Status of the Request.
 * @apiSuccess {Object} post Post created.
 * @apiSuccess {String} post._id Post _id.
 * @apiSuccess {String} post.title Post title.
 * @apiSuccess {String} post.text Post text.
 * @apiSuccess {String} post.author Post author id.
 * @apiSuccess {String} post.createdAt Post created date.
 *
 * @apiParam (Login) {String} pass Only logged in users can do this.
 *
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "AUTHORIZATION": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTBhMWI3ODAzMDI3N2NiNjQxM2JhZGUiLCJpYXQiOjE0OTM4MzQ2MTZ9.RSlMF6RRwAALZQRdfKrOZWnuHBk-mQNnRcCLJsc8zio"
 * }
 *
 * @apiSuccessExample Success-Response:
 *
 * HTTP/1.1 200 OK
 *
 * {
 *  _id: '123',
 *  title: 'a title',
 *  text: 'a text',
 *  createdAt: '2017-05-03',
 *  author: '123312'
 * }
 *
 * @apiErrorExample {json} Unauthorized
 *    HTTP/1.1 401 Unauthorized
 */


let create = exports.create = (() => {
  var _ref3 = _asyncToGenerator(function* (req, res, next) {
    const body = (0, _filteredBody.filteredBody)(req.body, _constants2.default.WHITELIST.posts.create);
    try {
      return res.status(_httpStatus2.default.CREATED).json((yield _post2.default.createPost(body, req.user._id)));
    } catch (err) {
      err.status = _httpStatus2.default.BAD_REQUEST;
      return next(err);
    }
  });

  return function create(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
})();

/**
 * @api {delete} /posts/:id Delete a post
 * @apiDescription Delete a post if the author it's the right one
 * @apiName deletePost
 * @apiGroup Post
 *
 * @apiHeader {Authorization} Authorization JWT Token
 *
 * @apiParam {String} id Post unique ID.
 *
 * @apiParam (Login) {String} pass Only logged in users can do this.
 *
 * @apiSuccess {Number} status Status of the Request.
 *
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "AUTHORIZATION": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTBhMWI3ODAzMDI3N2NiNjQxM2JhZGUiLCJpYXQiOjE0OTM4MzQ2MTZ9.RSlMF6RRwAALZQRdfKrOZWnuHBk-mQNnRcCLJsc8zio"
 * }
 *
 * @apiSuccessExample Success-Response:
 *
 * HTTP/1.1 200 OK
 *
 * 200
 *
 * @apiErrorExample {json} Post not found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Unauthorized
 *    HTTP/1.1 401 Unauthorized
 *
 */


let deletePost = exports.deletePost = (() => {
  var _ref4 = _asyncToGenerator(function* (req, res, next) {
    try {
      const post = yield _post2.default.findById(req.params.id);

      if (post.author.toString() !== req.user._id.toString()) {
        return res.sendStatus(_httpStatus2.default.UNAUTHORIZED);
      }
      yield post.remove();
      return res.sendStatus(_httpStatus2.default.OK);
    } catch (err) {
      err.status = _httpStatus2.default.BAD_REQUEST;
      return next(err);
    }
  });

  return function deletePost(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
})();

/**
 * @api {patch} /posts/:id Update a post
 * @apiDescription Update a post if the author it's the right one
 * @apiName updatePost
 * @apiGroup Post
 *
 * @apiHeader {Authorization} Authorization JWT Token
 *
 * @apiParam {String} id Post unique ID.
 *
 * @apiParam (Body) {String} [title] Post title.
 * @apiParam (Body) {String} [text] Post text.
 *
 * @apiSuccess {Number} status Status of the Request.
 * @apiSuccess {Object} post Post updated.
 * @apiSuccess {String} post._id Post _id.
 * @apiSuccess {String} post.title Post title.
 * @apiSuccess {String} post.text Post text.
 * @apiSuccess {String} post.author Post author id.
 * @apiSuccess {String} post.createdAt Post created date.
 *
 * @apiParam (Login) {String} pass Only logged in users can do this.
 *
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "AUTHORIZATION": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTBhMWI3ODAzMDI3N2NiNjQxM2JhZGUiLCJpYXQiOjE0OTM4MzQ2MTZ9.RSlMF6RRwAALZQRdfKrOZWnuHBk-mQNnRcCLJsc8zio"
 * }
 *
 * @apiSuccessExample Success-Response:
 *
 * HTTP/1.1 200 OK
 *
 * {
 *  _id: '123',
 *  title: 'New title',
 *  text: 'New text',
 *  createdAt: '2017-05-03',
 *  author: '123312'
 * }
 *
 * @apiErrorExample {json} Post not found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Unauthorized
 *    HTTP/1.1 401 Unauthorized
 */


let updatePost = exports.updatePost = (() => {
  var _ref5 = _asyncToGenerator(function* (req, res, next) {
    const body = (0, _filteredBody.filteredBody)(req.body, _constants2.default.WHITELIST.posts.update);
    try {
      const post = yield _post2.default.findById(req.params.id);

      if (post.author.toString() !== req.user._id.toString()) {
        return res.sendStatus(_httpStatus2.default.UNAUTHORIZED);
      }

      Object.keys(body).forEach(function (key) {
        post[key] = body[key];
      });

      return res.status(_httpStatus2.default.OK).json((yield post.save()));
    } catch (err) {
      err.status = _httpStatus2.default.BAD_REQUEST;
      return next(err);
    }
  });

  return function updatePost(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
})();

/**
 * @api {post} /posts/:id/favorite Favorite a post
 * @apiDescription Favorite a post or unfavorite if already.
 * @apiName favoritePost
 * @apiGroup Post
 *
 * @apiHeader {Authorization} Authorization JWT Token
 *
 * @apiParam {String} id Post unique ID.
 *
 * @apiSuccess {Number} status Status of the Request.
 *
 * @apiParam (Login) {String} pass Only logged in users can do this.
 *
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "AUTHORIZATION": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTBhMWI3ODAzMDI3N2NiNjQxM2JhZGUiLCJpYXQiOjE0OTM4MzQ2MTZ9.RSlMF6RRwAALZQRdfKrOZWnuHBk-mQNnRcCLJsc8zio"
 * }
 *
 * @apiSuccessExample Success-Response:
 *
 * HTTP/1.1 200 OK
 *
 * @apiErrorExample {json} Post not found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Unauthorized
 *    HTTP/1.1 401 Unauthorized
 */


let favoritePost = exports.favoritePost = (() => {
  var _ref6 = _asyncToGenerator(function* (req, res, next) {
    try {
      const user = yield _user2.default.findById(req.user._id);
      yield user._favorites.posts(req.params.id);
      return res.sendStatus(_httpStatus2.default.OK);
    } catch (err) {
      err.status = _httpStatus2.default.BAD_REQUEST;
      return next(err);
    }
  });

  return function favoritePost(_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
})();

var _joi = __webpack_require__(4);

var _joi2 = _interopRequireDefault(_joi);

var _httpStatus = __webpack_require__(1);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _constants = __webpack_require__(0);

var _constants2 = _interopRequireDefault(_constants);

var _filteredBody = __webpack_require__(8);

var _post = __webpack_require__(15);

var _post2 = _interopRequireDefault(_post);

var _user = __webpack_require__(2);

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Post Controller
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */

const validation = exports.validation = {
  create: {
    body: {
      title: _joi2.default.string().min(3).required(),
      text: _joi2.default.string().required()
    }
  },
  update: {
    body: {
      title: _joi2.default.string().min(3),
      text: _joi2.default.string()
    }
  }
};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(3);

var _seed = __webpack_require__(57);

var SeedController = _interopRequireWildcard(_seed);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const routes = new _express.Router();

routes.get('/clear', SeedController.clearAll);
routes.get('/users/clear', SeedController.clearSeedUsers);
routes.get('/users/:count?', SeedController.seedUsers);

exports.default = routes;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearAll = exports.clearSeedUsers = exports.seedUsers = undefined;

let seedUsers = exports.seedUsers = (() => {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    try {
      yield (0, _user3.userSeed)(req.params.count);

      return res.status(_httpStatus2.default.OK).send(`User seed success! Created ${req.params.count || 10} users!`);
    } catch (e) {
      e.status = _httpStatus2.default.BAD_REQUEST;
      return next(e);
    }
  });

  return function seedUsers(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

let clearSeedUsers = exports.clearSeedUsers = (() => {
  var _ref2 = _asyncToGenerator(function* (req, res, next) {
    try {
      yield (0, _user3.deleteUserSeed)();

      return res.status(_httpStatus2.default.OK).send('User collection empty');
    } catch (e) {
      e.status = _httpStatus2.default.BAD_REQUEST;
      return next(e);
    }
  });

  return function clearSeedUsers(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
})();

/**
 * Take all your model and clear it
 *
 * @param {any} req
 * @param {any} res
 * @param {any} next
 * @returns {String} All collections clear
 */


let clearAll = exports.clearAll = (() => {
  var _ref3 = _asyncToGenerator(function* (req, res, next) {
    try {
      yield Promise.all([_user2.default.remove(), _post2.default.remove()]);

      return res.status(_httpStatus2.default.OK).send('All collections clear');
    } catch (e) {
      e.status = _httpStatus2.default.BAD_REQUEST;
      return next(e);
    }
  });

  return function clearAll(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
})();

var _httpStatus = __webpack_require__(1);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _user = __webpack_require__(2);

var _user2 = _interopRequireDefault(_user);

var _post = __webpack_require__(15);

var _post2 = _interopRequireDefault(_post);

var _user3 = __webpack_require__(58);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Seed controller for fill your db of fake data
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteUserSeed = exports.userSeed = undefined;

let userSeed = exports.userSeed = (() => {
  var _ref = _asyncToGenerator(function* (count) {
    const users = [];

    Array.from({ length: count || 10 }).map(function () {
      const fakeUser = {
        name: `${_faker2.default.name.firstName()} ${_faker2.default.name.lastName()}`,
        username: _faker2.default.internet.userName(),
        email: _faker2.default.internet.email(),
        password: 'password1'
      };
      return users.push(fakeUser);
    });

    return yield _user2.default.insertMany(users);
  });

  return function userSeed(_x) {
    return _ref.apply(this, arguments);
  };
})();

let deleteUserSeed = exports.deleteUserSeed = (() => {
  var _ref2 = _asyncToGenerator(function* () {
    try {
      return yield _user2.default.remove();
    } catch (e) {
      return e;
    }
  });

  return function deleteUserSeed() {
    return _ref2.apply(this, arguments);
  };
})();

var _faker = __webpack_require__(59);

var _faker2 = _interopRequireDefault(_faker);

var _user = __webpack_require__(2);

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/***/ }),
/* 59 */
/***/ (function(module, exports) {

module.exports = require("faker");

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = logErrorService;

var _raven = __webpack_require__(61);

var _raven2 = _interopRequireDefault(_raven);

var _prettyError = __webpack_require__(62);

var _prettyError2 = _interopRequireDefault(_prettyError);

var _httpStatus = __webpack_require__(1);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _constants = __webpack_require__(0);

var _constants2 = _interopRequireDefault(_constants);

var _error = __webpack_require__(16);

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isProd = process.env.NODE_ENV === 'production'; /**
                                                       * Error handler for api routes
                                                       */

const isDev = process.env.NODE_ENV === 'development';

// eslint-disable-next-line no-unused-vars
function logErrorService(err, req, res, next) {
  if (!err) {
    return new _error2.default('Error with the server!', _httpStatus2.default.INTERNAL_SERVER_ERROR, true);
  }

  if (isProd) {
    const raven = new _raven2.default.Client(_constants2.default.RAVEN_ID);
    raven.captureException(err);
  }

  if (isDev) {
    const pe = new _prettyError2.default();
    pe.skipNodeFiles();
    pe.skipPackage('express');

    // eslint-disable-next-line no-console
    console.log(pe.render(err));
  }

  const error = {
    message: err || 'Internal Server Error.'
  };

  if (err.errors) {
    error.errors = {};
    const { errors } = err;
    if (Array.isArray(errors)) {
      error.errors = _error.RequiredError.makePretty(errors);
    } else {
      Object.keys(errors).forEach(key => {
        error.errors[key] = errors[key].message;
      });
    }
  }

  res.status(err.status || _httpStatus2.default.INTERNAL_SERVER_ERROR).json(error);

  return next();
}

/***/ }),
/* 61 */
/***/ (function(module, exports) {

module.exports = require("raven");

/***/ }),
/* 62 */
/***/ (function(module, exports) {

module.exports = require("pretty-error");

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgM2Y0NDRmOWZkZWZlYmZkZjRlYjgiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbmZpZy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaHR0cC1zdGF0dXNcIiIsIndlYnBhY2s6Ly8vLi9zcmMvbW9kZWxzL3VzZXIubW9kZWwuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImpvaVwiIiwid2VicGFjazovLy8uL3NyYy9jb25maWcvZGF0YWJhc2UuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibW9uZ29vc2VcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJleHByZXNzLXZhbGlkYXRpb25cIiIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvZmlsdGVyZWRCb2R5LmpzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9hdXRoLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInNxbC10ZW1wbGF0ZS1zdHJpbmdzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidXVpZC92NFwiIiwid2VicGFjazovLy8uL3NyYy9tb2RlbHMvcHJvZHVjdC5tb2RlbC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXNzcG9ydFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1vbmdvb3NlLXVuaXF1ZS12YWxpZGF0b3JcIiIsIndlYnBhY2s6Ly8vLi9zcmMvbW9kZWxzL3Bvc3QubW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2Vycm9yLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImNoYWxrXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGctcHJvbWlzZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImRvdGVudlwiIiwid2VicGFjazovLy8uL3NyYy9jb25maWcvbWlkZGxld2FyZXMuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYm9keS1wYXJzZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb3JnYW5cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjb21wcmVzc2lvblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3Mtd2luc3RvblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1ldGhvZC1vdmVycmlkZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImhlbG1ldFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImNvcnNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJncmFwaHFsLXNlcnZlci1leHByZXNzXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbmZpZy93aW5zdG9uLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcIndpbnN0b25cIiIsIndlYnBhY2s6Ly8vLi9zcmMvZ3JhcGhxbC9zY2hlbWEuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZ3JhcGhxbC10b29sc1wiIiwid2VicGFjazovLy8uL3NyYy9ncmFwaHFsL3Jlc29sdmVycy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiY3J5cHQtbm9kZWpzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwianNvbndlYnRva2VuXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL3NsdWdpZnkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JvdXRlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcm91dGVzL3VzZXIucm91dGVzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb250cm9sbGVycy91c2VyLmNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRyb2xsZXJzL2F1dGhlbnRpY2F0aW9uLmNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGFzc3BvcnQtbG9jYWxcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXNzcG9ydC1qd3RcIiIsIndlYnBhY2s6Ly8vLi9zcmMvcm91dGVzL3Byb2R1Y3Qucm91dGVzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb250cm9sbGVycy9wcm9kdWN0LmNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibW9uZ29kYlwiIiwid2VicGFjazovLy8uL3NyYy9yb3V0ZXMvb3JkZXIucm91dGVzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb250cm9sbGVycy9vcmRlci5jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9tb2RlbHMvb3JkZXIubW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL3BheW1lbnQuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwic3RyaXBlXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZGVscy90cmFuc2FjdGlvbi5tb2RlbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcm91dGVzL3Bvc3Qucm91dGVzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb250cm9sbGVycy9wb3N0LmNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JvdXRlcy9zZWVkLnJvdXRlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29udHJvbGxlcnMvc2VlZC5jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9zZWVkcy91c2VyLnNlZWQuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZmFrZXJcIiIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvbG9nLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInJhdmVuXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicHJldHR5LWVycm9yXCIiXSwibmFtZXMiOlsicmVxdWlyZSIsImNvbmZpZyIsIldISVRFTElTVCIsInBvc3RzIiwiY3JlYXRlIiwidXBkYXRlIiwidXNlcnMiLCJwcm9kdWN0cyIsImRlbGV0ZSIsIm9yZGVycyIsImRldkNvbmZpZyIsIkpXVF9TRUNSRVQiLCJwcm9jZXNzIiwiZW52IiwiSldUX1NFQ1JFVF9ERVYiLCJNT05HT19VUkwiLCJNT05HT19VUkxfREVWIiwiUE9TVEdSRVNfVVJMIiwiUE9TVEdSRVNfVVJMX0RFViIsIlNUUklQRV9TRUNSRVQiLCJTVFJJUEVfVEVTVF9TRUNSRVQiLCJ0ZXN0Q29uZmlnIiwiSldUX1NFQ1JFVF9URVNUIiwiUE9TVEdSRVNfVVJMX1RFU1QiLCJwcm9kQ29uZmlnIiwiSldUX1NFQ1JFVF9QUk9EIiwiTU9OR09fVVJMX1BST0QiLCJQT1NUR1JFU19VUkxfUFJPRCIsIlNUUklQRV9MSVZFX1NFQ1JFVCIsImRlZmF1bHRDb25maWciLCJQT1JUIiwiUkFWRU5fSUQiLCJlbnZDb25maWciLCJOT0RFX0VOViIsImF1dGhlbnRpY2F0ZVVzZXIiLCJwYXNzd29yZCIsImhhc2hlZFBhc3N3b3JkIiwiZmluZE9uZSIsImZpZWxkIiwiZGF0YSIsInVzZXIiLCJvbmUiLCJlcnIiLCJ0b0F1dGhKU09OIiwidXNlcnV1aWQiLCJhY2Nlc3NUb2tlbiIsImFjY2Vzc3Rva2VuIiwibmFtZSIsInVzZXJuYW1lIiwiZW1haWwiLCJjcmVhdGVVc2VyIiwidmFsaWRhdGVVc2VyRGF0YSIsInV1aWQiLCJ1c2VyQ3JlYXRlVHJhbnNhY3Rpb24iLCJ0eCIsInQiLCJxMSIsIm5vbmUiLCJfY3JlYXRlVG9rZW4iLCJfaGFzaFBhc3N3b3JkIiwicTIiLCJiYXRjaCIsImNyZWF0ZUN1c3RvbWVyIiwiY3VzdG9tZXJJZCIsImRlbGV0ZVVzZXIiLCJ1cGRhdGVQYXNzd29yZCIsIkVycm9yIiwidmFsaWRhdGVQYXNzd29yZCIsInVwZGF0ZUVtYWlsIiwibWluTGVuZ3RoIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJsZW5ndGgiLCJtYXRjaCIsInZhbGlkYXRlRW1haWwiLCJlbWFpbFJlZ2V4IiwiaXNWYWxpZCIsInRlc3QiLCJyZXF1aXJlZEZpZWxkcyIsImVycm9ycyIsImZvckVhY2giLCJPYmplY3QiLCJrZXlzIiwiY29uc3RydWN0b3IiLCJ0aGVuIiwiY2F0Y2giLCJzaWduIiwicGdwIiwiZGIiLCJnbG9iYWwiLCJzZXQiLCJNT05HT09TRV9ERUJVRyIsImNvbm5lY3QiLCJ1c2VNb25nb0NsaWVudCIsImNyZWF0ZUNvbm5lY3Rpb24iLCJjb25uZWN0aW9uIiwib25jZSIsImNvbnNvbGUiLCJsb2ciLCJvbiIsImUiLCJmaWx0ZXJlZEJvZHkiLCJib2R5Iiwid2hpdGVsaXN0IiwiaXRlbXMiLCJrZXkiLCJpbmRleE9mIiwibG9jYWxPcHRzIiwidXNlcm5hbWVGaWVsZCIsImxvY2FsTG9naW4iLCJkb25lIiwiand0T3B0cyIsImp3dEZyb21SZXF1ZXN0IiwiZnJvbUF1dGhIZWFkZXJXaXRoU2NoZW1lIiwic2VjcmV0T3JLZXkiLCJqd3RMb2dpbiIsInBheWxvYWQiLCJ1c2UiLCJhdXRoTG9jYWwiLCJhdXRoZW50aWNhdGUiLCJzZXNzaW9uIiwiYXV0aEp3dCIsIlByb2R1Y3RTY2hlbWEiLCJ0aXRsZSIsInR5cGUiLCJTdHJpbmciLCJyZXF1aXJlZCIsInRyaW0iLCJkZXNjcmlwdGlvbiIsImltYWdlVXJsIiwicHJpY2UiLCJOdW1iZXIiLCJjdXJyZW5jeSIsImNhdGVnb3J5Iiwic3ViQ2F0ZWdvcnkiLCJjcmVhdGVkQnkiLCJzbHVnIiwidW5pcXVlIiwic3RvY2siLCJkZWZhdWx0IiwidGltZXN0YW1wcyIsInBsdWdpbiIsIm1lc3NhZ2UiLCJwcmUiLCJuZXh0IiwibWFrZVNsdWciLCJzdGF0aWNzIiwiY3JlYXRlUHJvZHVjdCIsImFyZ3MiLCJnZXRQcm9kdWN0c0J5Q2F0ZWdvcnkiLCJmaW5kIiwibWV0aG9kcyIsImluZGV4IiwiUHJvZHVjdCIsIm1vZGVsIiwiUG9zdFNjaGVtYSIsIm1pbmxlbmd0aCIsInRleHQiLCJhdXRob3IiLCJUeXBlcyIsIk9iamVjdElkIiwicmVmIiwiZmF2b3JpdGVDb3VudCIsImNyZWF0ZVBvc3QiLCJhdXRob3JJZCIsImxpc3QiLCJza2lwIiwibGltaXQiLCJzb3J0IiwiY3JlYXRlZEF0IiwicG9wdWxhdGUiLCJpbmNGYXZvcml0ZUNvdW50IiwicG9zdElkIiwiZmluZEJ5SWRBbmRVcGRhdGUiLCIkaW5jIiwiZGVjRmF2b3JpdGVDb3VudCIsInRvSlNPTiIsIl9pZCIsIlBvc3QiLCJFeHRlbmRhYmxlRXJyb3IiLCJzdGF0dXMiLCJpc1B1YmxpYyIsImlzT3BlcmF0aW9uYWwiLCJjYXB0dXJlU3RhY2tUcmFjZSIsIkFQSUVycm9yIiwiSU5URVJOQUxfU0VSVkVSX0VSUk9SIiwiUmVxdWlyZWRFcnJvciIsIm1ha2VQcmV0dHkiLCJyZWR1Y2UiLCJvYmoiLCJlcnJvciIsIm5PYmoiLCJtZXNzYWdlcyIsInJlcGxhY2UiLCJhcHAiLCJtb2R1bGUiLCJwYXJlbnQiLCJsaXN0ZW4iLCJyZWQiLCJncmVlbiIsImJvbGQiLCJpc1Rlc3QiLCJpc0RldiIsImpzb24iLCJ1cmxlbmNvZGVkIiwiZXh0ZW5kZWQiLCJpbml0aWFsaXplIiwic2NoZW1hIiwiZW5kcG9pbnRVUkwiLCJyZXF1ZXN0V2hpdGVsaXN0IiwicHVzaCIsInJlc3BvbnNlV2hpdGVsaXN0IiwibG9nZ2VyIiwid2luc3Rvbkluc3RhbmNlIiwibWV0YSIsIm1zZyIsImNvbG9yU3RhdHVzIiwiTG9nZ2VyIiwidHJhbnNwb3J0cyIsIkNvbnNvbGUiLCJjb2xvcml6ZSIsInR5cGVEZWZzIiwicmVzb2x2ZXJzIiwiUXVlcnkiLCJnZXRVc2VyIiwiXyIsInNsdWdpZnkiLCJ0b1N0cmluZyIsInRvTG93ZXJDYXNlIiwicm91dGVzIiwiYWxsIiwicmVxIiwicmVzIiwiTk9UX0ZPVU5EIiwiVXNlckNvbnRyb2xsZXIiLCJBdXRoZW50aWNhdGlvbkNvbnRyb2xsZXIiLCJwb3N0IiwidmFsaWRhdGlvbiIsImxvZ2luIiwibmV3VXNlciIsIkNSRUFURUQiLCJCQURfUkVRVUVTVCIsInN0cmluZyIsIm1pbiIsInJlZ2V4IiwibWF4IiwiT0siLCJQcm9kdWN0Q29udHJvbGxlciIsInJvdXRlIiwiZ2V0IiwiZ2V0QWxsUHJvZHVjdHMiLCJkZWxldGVQcm9kdWN0IiwicGF0Y2giLCJ1cGRhdGVQcm9kdWN0IiwiZ2V0U2luZ2xlUHJvZHVjdCIsIm51bWJlciIsIm5ld1Byb2R1Y3QiLCJwcm9kdWN0IiwicGFyYW1zIiwiaWQiLCJmaW5kQnlJZCIsInJlbW92ZWRQcm9kdWN0IiwicmVtb3ZlIiwiZGVsZXRlZCIsInRvT2JqZWN0IiwicXVlcnkiLCJwcm9kdWN0SWQiLCJjdXJyZW50UHJvZHVjdCIsInNhdmUiLCJwcm9kdWN0U2x1ZyIsIk9yZGVyQ29udHJvbGxlciIsImNyZWF0ZU9yZGVyIiwiY2FydCIsIm9iamVjdCIsInRyYW5zYWN0aW9uX2lkIiwiZ3VpZCIsInZlcnNpb24iLCJzaGlwcGluZ19hZGRyZXNzIiwiYmlsbGluZ19hZGRyZXNzIiwic3RyaXBlVG9rZW4iLCJvcmRlciIsImNyZWF0ZWRfYnkiLCJzdHJpcGVfY3VzdG9tZXJfaWQiLCJzb3VyY2UiLCJhbW91bnQiLCJwYXJzZUZsb2F0IiwidG90YWxfcHJpY2UiLCJjdXN0b21lciIsIm9yZGVyX2lkIiwidmFsaWRhdGVPcmRlckRhdGEiLCJvcmRlcklkIiwidG90YWxQcmljZSIsInByb2R1Y3RJZHMiLCIkaW4iLCJtYXAiLCJxdHkiLCJnZXRBbGxPcmRlcnMiLCJhbnkiLCJnZXRPcmRlciIsImNoYXJnZURldGFpbHMiLCJjaGFyZ2UiLCJzdHJpcGUiLCJjaGFyZ2VzIiwiY3JlYXRlVHJhbnNhY3Rpb24iLCJzdHJpcGVfY2hhcmdlX2lkIiwiY3JlYXRlQ2hhcmdlIiwiY3VzdG9tZXJEZXRhaWxzIiwiY3VzdG9tZXJzIiwidmFsaWRhZGF0ZVRyYW5zYWN0aW9uRGF0YSIsInRyYW5zYWN0aW9uSWQiLCJ0cmFuc2FjdGlvbiIsInEzIiwiUG9zdENvbnRyb2xsZXIiLCJnZXRMaXN0IiwiZ2V0QnlJZCIsInVwZGF0ZVBvc3QiLCJkZWxldGVQb3N0IiwiZmF2b3JpdGVQb3N0IiwicHJvbWlzZSIsInBvc3RzV2l0aEZhdm9yaXRlIiwiYXJyIiwiZmF2b3JpdGUiLCJfZmF2b3JpdGVzIiwiaXNQb3N0SXNGYXZvcml0ZSIsInNlbmRTdGF0dXMiLCJVTkFVVEhPUklaRUQiLCJTZWVkQ29udHJvbGxlciIsImNsZWFyQWxsIiwiY2xlYXJTZWVkVXNlcnMiLCJzZWVkVXNlcnMiLCJjb3VudCIsInNlbmQiLCJBcnJheSIsImZyb20iLCJmYWtlVXNlciIsImZpcnN0TmFtZSIsImxhc3ROYW1lIiwiaW50ZXJuZXQiLCJ1c2VyTmFtZSIsImluc2VydE1hbnkiLCJ1c2VyU2VlZCIsImRlbGV0ZVVzZXJTZWVkIiwibG9nRXJyb3JTZXJ2aWNlIiwiaXNQcm9kIiwicmF2ZW4iLCJDbGllbnQiLCJjYXB0dXJlRXhjZXB0aW9uIiwicGUiLCJza2lwTm9kZUZpbGVzIiwic2tpcFBhY2thZ2UiLCJyZW5kZXIiLCJpc0FycmF5Il0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDN0RBLG1CQUFBQSxDQUFRLEVBQVIsRUFBa0JDLE1BQWxCOztBQUVBLE1BQU1DLFlBQVk7QUFDaEJDLFNBQU87QUFDTEMsWUFBUSxDQUFDLE9BQUQsRUFBVSxNQUFWLENBREg7QUFFTEMsWUFBUSxDQUFDLE9BQUQsRUFBVSxNQUFWO0FBRkgsR0FEUztBQUtoQkMsU0FBTztBQUNMRixZQUFRLENBQUMsT0FBRCxFQUFVLFVBQVYsRUFBc0IsVUFBdEIsRUFBa0MsTUFBbEM7QUFESCxHQUxTO0FBUWhCRyxZQUFVO0FBQ1JILFlB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QXVCalQsR0FBdkI7QUFDRDs7QUFFRCxNQUFJaUssS0FBSixFQUFXO0FBQ1QsVUFBTWlKLEtBQUssMkJBQVg7QUFDQUEsT0FBR0MsYUFBSDtBQUNBRCxPQUFHRSxXQUFILENBQWUsU0FBZjs7QUFFQTtBQUNBNVAsWUFBUUMsR0FBUixDQUFZeVAsR0FBR0csTUFBSCxDQUFVclQsR0FBVixDQUFaO0FBQ0Q7O0FBRUQsUUFBTXFKLFFBQVE7QUFDWmhELGFBQVNyRyxPQUFPO0FBREosR0FBZDs7QUFJQSxNQUFJQSxJQUFJc0MsTUFBUixFQUFnQjtBQUNkK0csVUFBTS9HLE1BQU4sR0FBZSxFQUFmO0FBQ0EsVUFBTSxFQUFFQSxNQUFGLEtBQWF0QyxHQUFuQjtBQUNBLFFBQUltUyxNQUFNbUIsT0FBTixDQUFjaFIsTUFBZCxDQUFKLEVBQTJCO0FBQ3pCK0csWUFBTS9HLE1BQU4sR0FBZSxxQkFBYzRHLFVBQWQsQ0FBeUI1RyxNQUF6QixDQUFmO0FBQ0QsS0FGRCxNQUVPO0FBQ0xFLGFBQU9DLElBQVAsQ0FBWUgsTUFBWixFQUFvQkMsT0FBcEIsQ0FBNEJ5QixPQUFPO0FBQ2pDcUYsY0FBTS9HLE1BQU4sQ0FBYTBCLEdBQWIsSUFBb0IxQixPQUFPMEIsR0FBUCxFQUFZcUMsT0FBaEM7QUFDRCxPQUZEO0FBR0Q7QUFDRjs7QUFFRDBGLE1BQUlwRCxNQUFKLENBQVczSSxJQUFJMkksTUFBSixJQUFjLHFCQUFXSyxxQkFBcEMsRUFBMkRrQixJQUEzRCxDQUFnRWIsS0FBaEU7O0FBRUEsU0FBTzlDLE1BQVA7QUFDRCxDOzs7Ozs7QUN6REQsa0M7Ozs7OztBQ0FBLHlDIiwiZmlsZSI6ImluZGV4LmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDE3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAzZjQ0NGY5ZmRlZmViZmRmNGViOCIsInJlcXVpcmUoJ2RvdGVudicpLmNvbmZpZygpO1xuXG5jb25zdCBXSElURUxJU1QgPSB7XG4gIHBvc3RzOiB7XG4gICAgY3JlYXRlOiBbJ3RpdGxlJywgJ3RleHQnXSxcbiAgICB1cGRhdGU6IFsndGl0bGUnLCAndGV4dCddLFxuICB9LFxuICB1c2Vyczoge1xuICAgIGNyZWF0ZTogWydlbWFpbCcsICd1c2VybmFtZScsICdwYXNzd29yZCcsICduYW1lJ10sXG4gIH0sXG4gIHByb2R1Y3RzOiB7XG4gICAgY3JlYXRlOiBbXG4gICAgICAndGl0bGUnLFxuICAgICAgJ2Rlc2NyaXB0aW9uJyxcbiAgICAgICdpbWFnZVVybCcsXG4gICAgICAncHJpY2UnLFxuICAgICAgJ2N1cnJlbmN5JyxcbiAgICAgICdjYXRlZ29yeScsXG4gICAgICAnc3ViQ2F0ZWdvcnknLFxuICAgIF0sXG4gICAgZGVsZXRlOiBbJ19pZCddLFxuICAgIHVwZGF0ZTogW1xuICAgICAgJ3RpdGxlJyxcbiAgICAgICdkZXNjcmlwdGlvbicsXG4gICAgICAnaW1hZ2VVcmwnLFxuICAgICAgJ3ByaWNlJyxcbiAgICAgICdjdXJyZW5jeScsXG4gICAgICAnY2F0ZWdvcnknLFxuICAgICAgJ3N1YkNhdGVnb3J5JyxcbiAgICBdLFxuICB9LFxuICBvcmRlcnM6IHtcbiAgICBjcmVhdGU6IFtcbiAgICAgICd0cmFuc2FjdGlvbl9pZCcsXG4gICAgICAnY2FydCcsXG4gICAgICAnc2hpcHBpbmdfYWRkcmVzcycsXG4gICAgICAnYmlsbGluZ19hZGRyZXNzJyxcbiAgICAgICdzdHJpcGVUb2tlbicsXG4gICAgICAnY3VycmVuY3knLFxuICAgIF0sXG4gIH0sXG59O1xuXG5jb25zdCBkZXZDb25maWcgPSB7XG4gIEpXVF9TRUNSRVQ6IHByb2Nlc3MuZW52LkpXVF9TRUNSRVRfREVWLFxuICBNT05HT19VUkw6IHByb2Nlc3MuZW52Lk1PTkdPX1VSTF9ERVYsXG4gIFBPU1RHUkVTX1VSTDogcHJvY2Vzcy5lbnYuUE9TVEdSRVNfVVJMX0RFVixcbiAgU1RSSVBFX1NFQ1JFVDogcHJvY2Vzcy5lbnYuU1RSSVBFX1RFU1RfU0VDUkVULFxufTtcblxuY29uc3QgdGVzdENvbmZpZyA9IHtcbiAgSldUX1NFQ1JFVDogcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVF9URVNULFxuICAvLyBNT05HT19VUkw6IHByb2Nlc3MuZW52Lk1PTkdPX1VSTF9URVNULFxuICBNT05HT19VUkw6ICdtb25nb2RiOi8vbG9jYWxob3N0L25vZGUtZWNvbW1lcmNlLXRlc3QnLFxuICBTVFJJUEVfU0VDUkVUOiBwcm9jZXNzLmVudi5TVFJJUEVfVEVTVF9TRUNSRVQsXG4gIFBPU1RHUkVTX1VSTDogcHJvY2Vzcy5lbnYuUE9TVEdSRVNfVVJMX1RFU1QsXG59O1xuXG5jb25zdCBwcm9kQ29uZmlnID0ge1xuICBKV1RfU0VDUkVUOiBwcm9jZXNzLmVudi5KV1RfU0VDUkVUX1BST0QsXG4gIE1PTkdPX1VSTDogcHJvY2Vzcy5lbnYuTU9OR09fVVJMX1BST0QsXG4gIFBPU1RHUkVTX1VSTDogcHJvY2Vzcy5lbnYuUE9TVEdSRVNfVVJMX1BST0QsXG4gIFNUUklQRV9TRUNSRVQ6IHByb2Nlc3MuZW52LlNUUklQRV9MSVZFX1NFQ1JFVCxcbn07XG5cbmNvbnN0IGRlZmF1bHRDb25maWcgPSB7XG4gIFBPUlQ6IHByb2Nlc3MuZW52LlBPUlQgfHwgNDAwMCxcbiAgUkFWRU5fSUQ6IHByb2Nlc3MuZW52LlJBVkVOX0lELFxuICBXSElURUxJU1QsXG59O1xuXG5mdW5jdGlvbiBlbnZDb25maWcoZW52KSB7XG4gIHN3aXRjaCAoZW52KSB7XG4gICAgY2FzZSAnZGV2ZWxvcG1lbnQnOlxuICAgICAgcmV0dXJuIGRldkNvbmZpZztcbiAgICBjYXNlICd0ZXN0JzpcbiAgICAgIHJldHVybiB0ZXN0Q29uZmlnO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gcHJvZENvbmZpZztcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIC4uLmRlZmF1bHRDb25maWcsXG4gIC4uLmVudkNvbmZpZyhwcm9jZXNzLmVudi5OT0RFX0VOViksXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbmZpZy9jb25zdGFudHMuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwLXN0YXR1c1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImh0dHAtc3RhdHVzXCJcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLW11dGFibGUtZXhwb3J0cyAqL1xuXG5pbXBvcnQgeyBoYXNoU3luYywgY29tcGFyZVN5bmMgfSBmcm9tICdiY3J5cHQtbm9kZWpzJztcbmltcG9ydCBqd3QgZnJvbSAnanNvbndlYnRva2VuJztcbmltcG9ydCBTUUwgZnJvbSAnc3FsLXRlbXBsYXRlLXN0cmluZ3MnO1xuaW1wb3J0IHV1aWR2NCBmcm9tICd1dWlkL3Y0JztcblxuaW1wb3J0IGNvbnN0YW50cyBmcm9tICcuLi9jb25maWcvY29uc3RhbnRzJztcbmltcG9ydCB7IGRiIH0gZnJvbSAnLi4vY29uZmlnL2RhdGFiYXNlJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAvKipcbiAgICogQXV0aGVudGljYXRlIHRoZSB1c2VyXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQHBhcmFtIHtTdHJpbmd9IHBhc3N3b3JkIC0gcHJvdmlkZWQgYnkgdGhlIHVzZXJcbiAgICogQHJldHVybnMge0Jvb2xlYW59IGlzTWF0Y2ggLSBwYXNzd29yZCBtYXRjaFxuICAgKi9cbiAgYXV0aGVudGljYXRlVXNlcihwYXNzd29yZCwgaGFzaGVkUGFzc3dvcmQpIHtcbiAgICByZXR1cm4gY29tcGFyZVN5bmMocGFzc3dvcmQsIGhhc2hlZFBhc3N3b3JkKTtcbiAgfSxcblxuICAvKipcbiAgICogZmluZCBhIHVzZXJcbiAgICogQHBhcmFtICB7U3RyaW5nfSAgZmllbGQgdGhlIFNRTCBjb2x1bW4gd2hpY2ggdG8gbG9vayB1cFxuICAgKiBAcGFyYW0gIHtTdHJpbmd9ICBkYXRhICB0aGUgZGF0YSB0byBmaW5kXG4gICAqIEByZXR1cm4ge09iamVjdHxQcm9taXNlfSB0aGUgdXNlciBmb3VuZFxuICAgKi9cbiAgYXN5bmMgZmluZE9uZShmaWVsZCwgZGF0YSkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB1c2VyID0gYXdhaXQgZGIub25lKFxuICAgICAgICBgXG4gICAgICAgIFNFTEVDVCAqIEZST00gdXNlcnNcbiAgICAgICAgV0hFUkUgJDF+PSQyXG4gICAgICBgLFxuICAgICAgICBbZmllbGQsIGRhdGFdLFxuICAgICAgKTtcbiAgICAgIHJldHVybiB1c2VyO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogUGFyc2UgdGhlIHVzZXIgb2JqZWN0IGluIGRhdGEgd2Ugd2FudGVkIHRvIHNlbmQgd2hlbiBhdXRoZW50aWNhdGVkXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQHJldHVybnMge09iamVjdH0gVXNlciAtIHJlYWR5IGZvciBhdXRoXG4gICAqL1xuICB0b0F1dGhKU09OKHVzZXIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXNlcnV1aWQ6IHVzZXIudXNlcnV1aWQsXG4gICAgICBhY2Nlc3NUb2tlbjogdXNlci5hY2Nlc3N0b2tlbixcbiAgICAgIG5hbWU6IHVzZXIubmFtZSxcbiAgICAgIHVzZXJuYW1lOiB1c2VyLnVzZXJuYW1lLFxuICAgICAgZW1haWw6IHVzZXIuZW1haWwsXG4gICAgfTtcbiAgfSxcblxuICBhc3luYyBjcmVhdGVVc2VyKGRhdGEpIHtcbiAgICB0cnkge1xuICAgICAgLypcbiAgICAgICAgKmlmICghZGF0YS5uYW1lIHx8ICFkYXRhLmVtYWlsIHx8ICFkYXRhLnVzZXJuYW1lIHx8ICFkYXRhLnBhc3N3b3JkKSB7XG4gICAgICAgICogIHRocm93IG5ldyBFcnJvcihcIkZpZWxkcyBhcmUgbWlzc2luZ1wiKTtcbiAgICAgICAgKn1cbiAgICAgICAgKi9cbiAgICAgIGF3YWl0IHZhbGlkYXRlVXNlckRhdGEoZGF0YSk7XG4gICAgICBjb25zdCB1dWlkID0gdXVpZHY0KCk7XG4gICAgICAvLyBUT0RPOiBSZWZhY3RvciB0aGVzZSBxdWVyaWVzIHRvIGFuIFNRTCB0cmFuc2FjdGlvblxuICAgICAgY29uc3QgdXNlckNyZWF0ZVRyYW5zYWN0aW9uID0gYXdhaXQgZGIudHgoYXN5bmMgdCA9PiB7XG4gICAgICAgIGNvbnN0IHExID0gYXdhaXQgZGIubm9uZShTUUxgXG4gICAgICAgIElOU0VSVFxuICAgICAgICAgSU5UTyB1c2Vyc1xuICAgICAgICAgKHVzZXJ1dWlkLCBuYW1lLCBhY2Nlc3NUb2tlbiwgZW1haWwsIHVzZXJuYW1lLCBwYXNzd29yZClcbiAgICAgICAgIFZBTFVFUyAoJHt1dWlkfSwgJHtkYXRhLm5hbWV9LCAke19jcmVhdGVUb2tlbihcbiAgICAgICAgICB1dWlkLFxuICAgICAgICApfSwgJHtkYXRhLmVtYWlsfSwgJHtkYXRhLnVzZXJuYW1lfSwgJHtfaGFzaFBhc3N3b3JkKGRhdGEucGFzc3dvcmQpfSlcbiAgICAgIGApO1xuICAgICAgICBjb25zdCBxMiA9IGF3YWl0IGRiLm9uZShTUUxgXG4gICAgICAgIFNFTEVDVCAqXG4gICAgICAgIEZST00gdXNlcnNcbiAgICAgICAgV0hFUkUgXCJ1c2VydXVpZFwiPSR7dXVpZH1cbiAgICAgIGApO1xuICAgICAgICByZXR1cm4gdC5iYXRjaChbcTEsIHEyXSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB1c2VyQ3JlYXRlVHJhbnNhY3Rpb25bMV07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICB9LFxuXG4gIGFzeW5jIGNyZWF0ZUN1c3RvbWVyKHV1aWQsIGN1c3RvbWVySWQpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGRiLm5vbmUoU1FMYFxuICAgICAgICBVUERBVEUgdXNlcnNcbiAgICAgICAgU0VUIHN0cmlwZV9jdXN0b21lcl9pZCA9ICR7Y3VzdG9tZXJJZH1cbiAgICAgICAgV0hFUkUgdXNlcnV1aWQgPSAke3V1aWR9XG4gICAgICBgKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IGVycjtcbiAgICB9XG4gIH0sXG5cbiAgYXN5bmMgZGVsZXRlVXNlcih1dWlkKSB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGRiLm5vbmUoU1FMYFxuICAgICAgICBERUxFVEUgRlJPTSB1c2Vyc1xuICAgICAgICBXSEVSRSB1c2VydXVpZD0ke3V1aWR9XG4gICAgICBgKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgfSxcblxuICBhc3luYyB1cGRhdGVQYXNzd29yZChkYXRhKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghZGF0YS51c2VydXVpZCB8fCAhZGF0YS5wYXNzd29yZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VzZXJ1dWlkIGFuZC9vciBwYXNzd29yZCBtaXNzaW5nLicpO1xuICAgICAgfVxuICAgICAgYXdhaXQgdmFsaWRhdGVQYXNzd29yZChkYXRhLnBhc3N3b3JkLCA2KTtcbiAgICAgIGNvbnN0IGhhc2hlZFBhc3N3b3JkID0gX2hhc2hQYXNzd29yZChkYXRhLnBhc3N3b3JkKTtcbiAgICAgIHJldHVybiBkYi5vbmUoU1FMYFxuICAgICAgICBVUERBVEUgdXNlcnNcbiAgICAgICAgU0VUIHBhc3N3b3JkID0gJHtoYXNoZWRQYXNzd29yZH0sXG4gICAgICAgIHVwZGF0ZWRBdCA9IG5vdygpXG4gICAgICAgIFdIRVJFIHVzZXJ1dWlkID0gJHtkYXRhLnVzZXJ1dWlkfVxuICAgICAgICByZXR1cm5pbmcgdXNlcnV1aWRcbiAgICAgIGApO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgfSxcblxuICBhc3luYyB1cGRhdGVFbWFpbChkYXRhKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghZGF0YS5lbWFpbCB8fCAhZGF0YS51c2VydXVpZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VzZXJ1dWlkIGFuZC9vciBlbWFpbCBpcyBtaXNzaW5nJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZGIub25lKFNRTGBcbiAgICAgICAgVVBEQVRFIHVzZXJzXG4gICAgICAgIFNFVCBlbWFpbCA9ICR7ZGF0YS5lbWFpbH0sXG4gICAgICAgIHVwZGF0ZWRhdCA9IE5PVygpXG4gICAgICAgIFdIRVJFIHVzZXJ1dWlkID0gJHtkYXRhLnVzZXJ1dWlkfVxuICAgICAgICByZXR1cm5pbmcgZW1haWxcbiAgICAgIGApO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgfSxcbn07XG5cbmNvbnN0IHZhbGlkYXRlUGFzc3dvcmQgPSAocGFzc3dvcmQsIG1pbkxlbmd0aCkgPT5cbiAgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGlmICh0eXBlb2YgcGFzc3dvcmQgIT09ICdzdHJpbmcnKSB7XG4gICAgICByZWplY3QoJ1Bhc3N3b3JkIG11c3QgYmUgYSBzdHJpbmcnKTtcbiAgICB9IGVsc2UgaWYgKHBhc3N3b3JkLmxlbmd0aCA8IG1pbkxlbmd0aCAmJiAhcGFzc3dvcmQubWF0Y2goL1xcZCsvZykpIHtcbiAgICAgIHJlamVjdChcbiAgICAgICAgYFBhc3N3b3JkIG11c3QgYmUgYXQgbGVhc3QgJHttaW5MZW5ndGh9IGNoYXJhY3RlcnMgbG9uZyBhbmQgY29udGFpbiBhdCBsZWFzdCBvbmUgZGlnaXRgLFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzb2x2ZSgpO1xuICAgIH1cbiAgfSk7XG5cbmNvbnN0IHZhbGlkYXRlRW1haWwgPSBlbWFpbCA9PlxuICBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgaWYgKHR5cGVvZiBlbWFpbCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHJlamVjdCgnRW1haWwgbXVzdCBiZSBhIHN0cmluZycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBlbWFpbFJlZ2V4ID0gL15bLWEtejAtOSVTXytdKyhcXC5bLWEtejAtOSVTXytdKykqQCg/OlthLXowLTktXXsxLDYzfVxcLil7MSwxMjV9W2Etel17Miw2M30kL2k7XG4gICAgICBjb25zdCBpc1ZhbGlkID0gZW1haWxSZWdleC50ZXN0KGVtYWlsKTtcbiAgICAgIGlmIChpc1ZhbGlkKSB7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlamVjdCgnRW1haWwgaXMgbm90IGluIHRoZSBjb3JyZWN0IGZvcm1hdCcpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbmNvbnN0IHZhbGlkYXRlVXNlckRhdGEgPSBkYXRhID0+XG4gIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCByZXF1aXJlZEZpZWxkcyA9IFsndXNlcm5hbWUnLCAnZW1haWwnLCAncGFzc3dvcmQnLCAnbmFtZSddO1xuICAgIGNvbnN0IGVycm9ycyA9IHt9O1xuICAgIHJlcXVpcmVkRmllbGRzLmZvckVhY2goZmllbGQgPT4ge1xuICAgICAgaWYgKCFkYXRhW2ZpZWxkXSkge1xuICAgICAgICBlcnJvcnNbZmllbGRdID0gJ0ZpZWxkIGlzIHJlcXVpcmVkJztcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoT2JqZWN0LmtleXMoZXJyb3JzKS5sZW5ndGggIT09IDAgJiYgZXJyb3JzLmNvbnN0cnVjdG9yID09PSBPYmplY3QpIHtcbiAgICAgIHJlamVjdChlcnJvcnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWxpZGF0ZVBhc3N3b3JkKGRhdGEucGFzc3dvcmQsIDYpXG4gICAgICAgIC50aGVuKCgpID0+IHZhbGlkYXRlRW1haWwoZGF0YS5lbWFpbCkpXG4gICAgICAgIC50aGVuKCgpID0+IHJlc29sdmUoKSlcbiAgICAgICAgLmNhdGNoKGVyciA9PiByZWplY3QoZXJyKSk7XG4gICAgfVxuICB9KTtcblxuLyoqXG4gKiBIYXNoIHRoZSB1c2VyIHBhc3N3b3JkXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7U3RyaW5nfSBwYXNzd29yZCAtIHVzZXIgcGFzc3dvcmQgY2hvb3NlXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBwYXNzd29yZCAtIGhhc2ggcGFzc3dvcmRcbiAqL1xuY29uc3QgX2hhc2hQYXNzd29yZCA9IHBhc3N3b3JkID0+IGhhc2hTeW5jKHBhc3N3b3JkKTtcblxuLyoqXG4gKiBHZW5lcmF0ZSBhIGp3dCB0b2tlbiBmb3IgYXV0aGVudGljYXRpb25cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtTdHJpbmd9IHVzZXJ1dWlkXG4gKiBAcmV0dXJucyB7U3RyaW5nfSB0b2tlbiAtIEpXVCB0b2tlblxuICovXG5jb25zdCBfY3JlYXRlVG9rZW4gPSB1dWlkID0+XG4gIGp3dC5zaWduKFxuICAgIHtcbiAgICAgIHV1aWQsXG4gICAgfSxcbiAgICBjb25zdGFudHMuSldUX1NFQ1JFVCxcbiAgKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tb2RlbHMvdXNlci5tb2RlbC5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJleHByZXNzXCJcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiam9pXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiam9pXCJcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gZm9yIHRoZSBkYXRhYmFzZVxuICovXG5cbmltcG9ydCBtb25nb29zZSBmcm9tICdtb25nb29zZSc7XG5pbXBvcnQgcGcgZnJvbSAncGctcHJvbWlzZSc7XG5pbXBvcnQgY29uc3RhbnRzIGZyb20gJy4vY29uc3RhbnRzJztcblxuLy8gSW5pdGlhbGl6ZSBwZy1wcm9taXNlXG5jb25zdCBwZ3AgPSBwZygpO1xuXG5jb25zdCBkYiA9IHBncChjb25zdGFudHMuUE9TVEdSRVNfVVJMKTtcblxuLy8gUmVtb3ZlIHRoZSB3YXJuaW5nIHdpdGggUHJvbWlzZVxubW9uZ29vc2UuUHJvbWlzZSA9IGdsb2JhbC5Qcm9taXNlO1xuXG4vLyBJZiBkZWJ1ZyBydW4gdGhlIG1vbmdvb3NlIGRlYnVnIG9wdGlvbnNcbm1vbmdvb3NlLnNldCgnZGVidWcnLCBwcm9jZXNzLmVudi5NT05HT09TRV9ERUJVRyk7XG5cbi8vIENvbm5lY3QgdGhlIGRiIHdpdGggdGhlIHVybCBwcm92aWRlXG50cnkge1xuICBtb25nb29zZS5jb25uZWN0KGNvbnN0YW50cy5NT05HT19VUkwsIHtcbiAgICB1c2VNb25nb0NsaWVudDogdHJ1ZSxcbiAgfSk7XG59IGNhdGNoIChlcnIpIHtcbiAgbW9uZ29vc2UuY3JlYXRlQ29ubmVjdGlvbihjb25zdGFudHMuTU9OR09fVVJMLCB7XG4gICAgdXNlTW9uZ29DbGllbnQ6IHRydWUsXG4gIH0pO1xufVxuXG5tb25nb29zZS5jb25uZWN0aW9uXG4gIC5vbmNlKCdvcGVuJywgKCkgPT4gY29uc29sZS5sb2coJ01vbmdvREIgUnVubmluZycpKVxuICAub24oJ2Vycm9yJywgZSA9PiB7XG4gICAgdGhyb3cgZTtcbiAgfSk7XG5cbmV4cG9ydCB7IGRiIH07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29uZmlnL2RhdGFiYXNlLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibW9uZ29vc2VcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJtb25nb29zZVwiXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3MtdmFsaWRhdGlvblwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImV4cHJlc3MtdmFsaWRhdGlvblwiXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogRmlsdGVyZWQgdGhlIHJlcXVlc3QgYm9keSBmb3IgYmUgc3VyZVxuICogbm90aGluZyB3cm9uZyBjYW4gYmUgcGFzcy5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0ge09iamVjdH0gYm9keSAtIFJlcXVlc3QgYm9keVxuICogQHBhcmFtIHtBcnJheVtTdHJpbmddfSB3aGl0ZWxpc3QgLSBFbGVtZW50IHdobyB3YW50IHRvIHdoaXRlbGlzdFxuICogQHJldHVybnMge09iamVjdH0gYm9keSAtIFJlcXVlc3QgYm9keSBmaWx0ZXJlZFxuICovXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyZWRCb2R5KGJvZHksIHdoaXRlbGlzdCkge1xuICBjb25zdCBpdGVtcyA9IHt9O1xuXG4gIE9iamVjdC5rZXlzKGJvZHkpLmZvckVhY2goa2V5ID0+IHtcbiAgICBpZiAod2hpdGVsaXN0LmluZGV4T2Yoa2V5KSA+PSAwKSB7XG4gICAgICBpdGVtc1trZXldID0gYm9keVtrZXldO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGl0ZW1zO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWxzL2ZpbHRlcmVkQm9keS5qcyIsImltcG9ydCBwYXNzcG9ydCBmcm9tICdwYXNzcG9ydCc7XG5pbXBvcnQgTG9jYWxTdHJhdGVneSBmcm9tICdwYXNzcG9ydC1sb2NhbCc7XG5pbXBvcnQgeyBTdHJhdGVneSBhcyBKV1RTdHJhdGVneSwgRXh0cmFjdEp3dCB9IGZyb20gJ3Bhc3Nwb3J0LWp3dCc7XG5cbmltcG9ydCBVc2VyIGZyb20gJy4uL21vZGVscy91c2VyLm1vZGVsJztcbmltcG9ydCBjb25zdGFudHMgZnJvbSAnLi4vY29uZmlnL2NvbnN0YW50cyc7XG5cbi8qKlxuICogTG9jYWwgU3RyYXRlZ3kgQXV0aFxuICovXG5jb25zdCBsb2NhbE9wdHMgPSB7IHVzZXJuYW1lRmllbGQ6ICdlbWFpbCcgfTtcblxuY29uc3QgbG9jYWxMb2dpbiA9IG5ldyBMb2NhbFN0cmF0ZWd5KFxuICBsb2NhbE9wdHMsXG4gIGFzeW5jIChlbWFpbCwgcGFzc3dvcmQsIGRvbmUpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXIuZmluZE9uZSgnZW1haWwnLCBlbWFpbCk7XG4gICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgcmV0dXJuIGRvbmUobnVsbCwgZmFsc2UpO1xuICAgICAgfSBlbHNlIGlmICghVXNlci5hdXRoZW50aWNhdGVVc2VyKHBhc3N3b3JkLCB1c2VyLnBhc3N3b3JkKSkge1xuICAgICAgICByZXR1cm4gZG9uZShudWxsLCBmYWxzZSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkb25lKG51bGwsIHVzZXIpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBkb25lKGUsIGZhbHNlKTtcbiAgICB9XG4gIH0sXG4pO1xuXG4vKipcbiAqIEpXVCBTdHJhdGVneSBBdXRoXG4gKi9cbmNvbnN0IGp3dE9wdHMgPSB7XG4gIC8vIFRlbGxpbmcgUGFzc3BvcnQgdG8gY2hlY2sgYXV0aG9yaXphdGlvbiBoZWFkZXJzIGZvciBKV1RcbiAgand0RnJvbVJlcXVlc3Q6IEV4dHJhY3RKd3QuZnJvbUF1dGhIZWFkZXJXaXRoU2NoZW1lKCdKV1QnKSxcbiAgLy8gVGVsbGluZyBQYXNzcG9ydCB3aGVyZSB0byBmaW5kIHRoZSBzZWNyZXRcbiAgc2VjcmV0T3JLZXk6IGNvbnN0YW50cy5KV1RfU0VDUkVULFxufTtcblxuY29uc3Qgand0TG9naW4gPSBuZXcgSldUU3RyYXRlZ3koand0T3B0cywgYXN5bmMgKHBheWxvYWQsIGRvbmUpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlci5maW5kT25lKCd1c2VydXVpZCcsIHBheWxvYWQudXVpZCk7XG4gICAgaWYgKCF1c2VyKSB7XG4gICAgICByZXR1cm4gZG9uZShudWxsLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRvbmUobnVsbCwgdXNlcik7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZG9uZShlLCBmYWxzZSk7XG4gIH1cbn0pO1xuXG5wYXNzcG9ydC51c2UobG9jYWxMb2dpbik7XG5wYXNzcG9ydC51c2Uoand0TG9naW4pO1xuXG5leHBvcnQgY29uc3QgYXV0aExvY2FsID0gcGFzc3BvcnQuYXV0aGVudGljYXRlKCdsb2NhbCcsIHsgc2Vzc2lvbjogZmFsc2UgfSk7XG5leHBvcnQgY29uc3QgYXV0aEp3dCA9IHBhc3Nwb3J0LmF1dGhlbnRpY2F0ZSgnand0JywgeyBzZXNzaW9uOiBmYWxzZSB9KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zZXJ2aWNlcy9hdXRoLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic3FsLXRlbXBsYXRlLXN0cmluZ3NcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJzcWwtdGVtcGxhdGUtc3RyaW5nc1wiXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1dWlkL3Y0XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwidXVpZC92NFwiXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgbW9uZ29vc2UsIHsgU2NoZW1hIH0gZnJvbSAnbW9uZ29vc2UnO1xuaW1wb3J0IHVuaXF1ZVZhbGlkYXRvciBmcm9tICdtb25nb29zZS11bmlxdWUtdmFsaWRhdG9yJztcbmltcG9ydCB7IHNsdWdpZnkgfSBmcm9tICcuLi91dGlscy9zbHVnaWZ5JztcblxuY29uc3QgUHJvZHVjdFNjaGVtYSA9IG5ldyBTY2hlbWEoXG4gIHtcbiAgICB0aXRsZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICBtaW5MZW5ndGg6IFszLCAnUHJvZHVjdCB0aXRsZSBtdXN0IGJlIGF0IGxlYXN0IDMgY2hhcmFjdGVycyBsb25nLiddLFxuICAgICAgdHJpbTogdHJ1ZSxcbiAgICB9LFxuICAgIGRlc2NyaXB0aW9uOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIG1pbkxlbmd0aDogWzMsICdQcm9kdWN0IGRlc2NyaXB0aW9uIG11c3QgYmUgYXQgbGVhc3QgMyBjaGFyYWN0ZXJzIGxvbmcuJ10sXG4gICAgfSxcbiAgICBpbWFnZVVybDoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICB0cmltOiB0cnVlLFxuICAgIH0sXG4gICAgcHJpY2U6IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIH0sXG4gICAgY3VycmVuY3k6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIH0sXG4gICAgY2F0ZWdvcnk6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIH0sXG4gICAgc3ViQ2F0ZWdvcnk6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICB9LFxuICAgIGNyZWF0ZWRCeToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgfSxcbiAgICBzbHVnOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIHVuaXF1ZTogdHJ1ZSxcbiAgICB9LFxuICAgIHN0b2NrOiB7XG4gICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICBkZWZhdWx0OiAxLFxuICAgIH0sXG4gIH0sXG4gIHsgdGltZXN0YW1wczogdHJ1ZSB9LFxuKTtcblxuUHJvZHVjdFNjaGVtYS5wbHVnaW4odW5pcXVlVmFsaWRhdG9yLCB7XG4gIG1lc3NhZ2U6ICd7VkFMVUV9IGFscmVhZHkgZXhpc3RzIScsXG59KTtcblxuUHJvZHVjdFNjaGVtYS5wcmUoJ3ZhbGlkYXRlJywgZnVuY3Rpb24obmV4dCkge1xuICB0aGlzLm1ha2VTbHVnKCk7XG5cbiAgbmV4dCgpO1xufSk7XG5cblByb2R1Y3RTY2hlbWEuc3RhdGljcyA9IHtcbiAgY3JlYXRlUHJvZHVjdChhcmdzLCB1c2VydXVpZCkge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZSh7XG4gICAgICAuLi5hcmdzLFxuICAgICAgY3JlYXRlZEJ5OiB1c2VydXVpZCxcbiAgICB9KTtcbiAgfSxcblxuICBnZXRQcm9kdWN0c0J5Q2F0ZWdvcnkoY2F0ZWdvcnkpIHtcbiAgICByZXR1cm4gdGhpcy5maW5kKHsgY2F0ZWdvcnkgfSk7XG4gIH0sXG59O1xuXG5Qcm9kdWN0U2NoZW1hLm1ldGhvZHMgPSB7XG4gIG1ha2VTbHVnKCkge1xuICAgIHRoaXMuc2x1ZyA9IHNsdWdpZnkodGhpcy50aXRsZSk7XG4gIH0sXG59O1xuXG5Qcm9kdWN0U2NoZW1hLmluZGV4KHsgdGl0bGU6ICd0ZXh0JywgZGVzY3JpcHRpb246ICd0ZXh0JyB9KTtcbmNvbnN0IFByb2R1Y3QgPSBtb25nb29zZS5tb2RlbCgnUHJvZHVjdCcsIFByb2R1Y3RTY2hlbWEpO1xuXG5leHBvcnQgZGVmYXVsdCBQcm9kdWN0O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21vZGVscy9wcm9kdWN0Lm1vZGVsLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGFzc3BvcnRcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJwYXNzcG9ydFwiXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb25nb29zZS11bmlxdWUtdmFsaWRhdG9yXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwibW9uZ29vc2UtdW5pcXVlLXZhbGlkYXRvclwiXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tbXV0YWJsZS1leHBvcnRzICovXG5cbmltcG9ydCBtb25nb29zZSwgeyBTY2hlbWEgfSBmcm9tICdtb25nb29zZSc7XG5pbXBvcnQgdW5pcXVlVmFsaWRhdG9yIGZyb20gJ21vbmdvb3NlLXVuaXF1ZS12YWxpZGF0b3InO1xuXG5jb25zdCBQb3N0U2NoZW1hID0gbmV3IFNjaGVtYShcbiAge1xuICAgIHRpdGxlOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB0cmltOiB0cnVlLFxuICAgICAgcmVxdWlyZWQ6IFt0cnVlLCAnVGl0bGUgaXMgcmVxdWlyZWQhJ10sXG4gICAgICBtaW5sZW5ndGg6IFszLCAnVGl0bGUgbXVzdCBiZSBsb25nZXIhJ10sXG4gICAgICB1bmlxdWU6IHRydWUsXG4gICAgfSxcbiAgICB0ZXh0OiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICByZXF1aXJlZDogW3RydWUsICdTb21lIHRleHQgYXJlIHJlcXVpcmVkISddLFxuICAgIH0sXG4gICAgYXV0aG9yOiB7XG4gICAgICB0eXBlOiBTY2hlbWEuVHlwZXMuT2JqZWN0SWQsXG4gICAgICByZWY6ICdVc2VyJyxcbiAgICAgIHJlcXVpcmVkOiBbdHJ1ZSwgJ0F1dGhvciBpcyByZXF1aXJlZCEnXSxcbiAgICB9LFxuICAgIGZhdm9yaXRlQ291bnQ6IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIGRlZmF1bHQ6IDAsXG4gICAgfSxcbiAgfSxcbiAgeyB0aW1lc3RhbXBzOiB0cnVlIH0sXG4pO1xuXG5Qb3N0U2NoZW1hLnBsdWdpbih1bmlxdWVWYWxpZGF0b3IsIHtcbiAgbWVzc2FnZTogJ3tWQUxVRX0gYWxyZWFkeSB0YWtlbiEnLFxufSk7XG5cbi8qKlxuICogU2x1Z2lmeSB0aGUgdGV4dCBvbiB2YWxpZGF0aW9uIGhvb2tcbiAqL1xuLy8gUG9zdFNjaGVtYS5wcmUoXCJ2YWxpZGF0ZVwiLCBmdW5jdGlvbihuZXh0KSB7fSk7XG5cblBvc3RTY2hlbWEuc3RhdGljcyA9IHtcbiAgLyoqXG4gICAqIENyZWF0ZSBhIHBvc3RcbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAcGFyYW0ge09iamVjdH0gYXJncyAtIE9iamVjdCBjb250YWlucyB0aXRsZSBhbmQgdGV4dFxuICAgKiBAcGFyYW0ge1N0cmluZ30gYXV0aG9ySWQgLSB0aGUgYXV0aG9yIGlkXG4gICAqIEByZXR1cm5zIHtQb3N0fSBQb3N0IE9iamVjdCAtIG5ldyBwb3N0IGNyZWF0ZVxuICAgKi9cbiAgY3JlYXRlUG9zdChhcmdzLCBhdXRob3JJZCkge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZSh7XG4gICAgICAuLi5hcmdzLFxuICAgICAgYXV0aG9yOiBhdXRob3JJZCxcbiAgICB9KTtcbiAgfSxcblxuICAvKipcbiAgICogSWYgeW91IGNhbGwgbGlzdCgpIHdpdGggemVybyBhcmd1bWVudHMsIHRoZSBkZXN0cnVjdHVyaW5nIGZhaWxzLFxuICAgKiBiZWNhdXNlIHlvdSBjYW7igJl0IG1hdGNoIGFuIG9iamVjdCBwYXR0ZXJuIGFnYWluc3QgdW5kZWZpbmVkLlxuICAgKiBUaGF0IGNhbiBiZSBmaXhlZCB2aWEgYSBkZWZhdWx0IHZhbHVlLiBJbiB0aGUgZm9sbG93aW5nIGNvZGUsXG4gICAqIHRoZSBvYmplY3QgcGF0dGVybiBpcyBtYXRjaGVkIGFnYWluc3Qge30gaWYgdGhlcmUgaXNu4oCZdCBhdCBsZWFzdCBvbmUgYXJndW1lbnQuXG4gICAqL1xuICBsaXN0KHsgc2tpcCA9IDAsIGxpbWl0ID0gMTAgfSA9IHt9KSB7XG4gICAgcmV0dXJuIHRoaXMuZmluZCgpXG4gICAgICAuc29ydCh7IGNyZWF0ZWRBdDogLTEgfSlcbiAgICAgIC5za2lwKHNraXApXG4gICAgICAubGltaXQobGltaXQpXG4gICAgICAucG9wdWxhdGUoJ2F1dGhvcicpO1xuICB9LFxuXG4gIGluY0Zhdm9yaXRlQ291bnQocG9zdElkKSB7XG4gICAgcmV0dXJuIHRoaXMuZmluZEJ5SWRBbmRVcGRhdGUocG9zdElkLCB7ICRpbmM6IHsgZmF2b3JpdGVDb3VudDogMSB9IH0pO1xuICB9LFxuXG4gIGRlY0Zhdm9yaXRlQ291bnQocG9zdElkKSB7XG4gICAgcmV0dXJuIHRoaXMuZmluZEJ5SWRBbmRVcGRhdGUocG9zdElkLCB7ICRpbmM6IHsgZmF2b3JpdGVDb3VudDogLTEgfSB9KTtcbiAgfSxcbn07XG5cblBvc3RTY2hlbWEubWV0aG9kcyA9IHtcbiAgLyoqXG4gICAqIFNsdWcgdGhlIHRpdGxlIGFuZCBhZGQgdGhpcyB0byB0aGUgc2x1ZyBwcm9wXG4gICAqL1xuICAvKipcbiAgICogUGFyc2UgdGhlIHBvc3QgaW4gZm9ybWF0IHdlIHdhbnQgdG8gc2VuZC5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAcmV0dXJucyB7UG9zdH0gUG9zdCBPYmplY3RcbiAgICovXG4gIHRvSlNPTigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgX2lkOiB0aGlzLl9pZCxcbiAgICAgIHRpdGxlOiB0aGlzLnRpdGxlLFxuICAgICAgdGV4dDogdGhpcy50ZXh0LFxuICAgICAgYXV0aG9yOiB0aGlzLmF1dGhvcixcbiAgICAgIGNyZWF0ZWRBdDogdGhpcy5jcmVhdGVkQXQsXG4gICAgICBmYXZvcml0ZUNvdW50OiB0aGlzLmZhdm9yaXRlQ291bnQsXG4gICAgfTtcbiAgfSxcbn07XG5cbmxldCBQb3N0O1xuXG50cnkge1xuICBQb3N0ID0gbW9uZ29vc2UubW9kZWwoJ1Bvc3QnKTtcbn0gY2F0Y2ggKGUpIHtcbiAgUG9zdCA9IG1vbmdvb3NlLm1vZGVsKCdQb3N0JywgUG9zdFNjaGVtYSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBvc3Q7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbW9kZWxzL3Bvc3QubW9kZWwuanMiLCJpbXBvcnQgaHR0cFN0YXR1cyBmcm9tICdodHRwLXN0YXR1cyc7XG5cbi8qKlxuICogQGV4dGVuZHMgRXJyb3JcbiAqL1xuY2xhc3MgRXh0ZW5kYWJsZUVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBzdGF0dXMsIGlzUHVibGljKSB7XG4gICAgc3VwZXIobWVzc2FnZSk7XG4gICAgdGhpcy5uYW1lID0gdGhpcy5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgdGhpcy5zdGF0dXMgPSBzdGF0dXM7XG4gICAgdGhpcy5pc1B1YmxpYyA9IGlzUHVibGljO1xuICAgIHRoaXMuaXNPcGVyYXRpb25hbCA9IHRydWU7XG4gICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgdGhpcy5jb25zdHJ1Y3Rvci5uYW1lKTtcbiAgfVxufVxuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyBhbiBBUEkgZXJyb3IuXG4gKlxuICogQGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yXG4gKi9cbmNsYXNzIEFQSUVycm9yIGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gQVBJIGVycm9yLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSAtIEVycm9yIG1lc3NhZ2UuXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBzdGF0dXMgLSBIVFRQIHN0YXR1cyBjb2RlIG9mIGVycm9yLlxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IGlzUHVibGljIC0gV2hldGhlciB0aGUgbWVzc2FnZSBzaG91bGQgYmUgdmlzaWJsZSB0byB1c2VyIG9yIG5vdC5cbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIG1lc3NhZ2UsXG4gICAgc3RhdHVzID0gaHR0cFN0YXR1cy5JTlRFUk5BTF9TRVJWRVJfRVJST1IsXG4gICAgaXNQdWJsaWMgPSBmYWxzZSxcbiAgKSB7XG4gICAgc3VwZXIobWVzc2FnZSwgc3RhdHVzLCBpc1B1YmxpYyk7XG4gIH1cbn1cblxuLyoqXG4gKiBDbGFzcyBmb3IgcmVxdWlyZWQgZXJyb3JcbiAqXG4gKiBAY2xhc3MgUmVxdWlyZWRFcnJvclxuICovXG5leHBvcnQgY2xhc3MgUmVxdWlyZWRFcnJvciB7XG4gIC8qKlxuICAgKiBNYWtlIGVycm9yIHByZXR0eVxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBwYXJhbSB7QXJyYXl9IGVycm9ycyAtIEFycmF5IG9mIGVycm9yIE9iamVjdFxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSAtIGVycm9ycyAtIFByZXR0eSBPYmplY3QgdHJhbnNmb3JtXG4gICAqL1xuICBzdGF0aWMgbWFrZVByZXR0eShlcnJvcnMpIHtcbiAgICByZXR1cm4gZXJyb3JzLnJlZHVjZSgob2JqLCBlcnJvcikgPT4ge1xuICAgICAgY29uc3Qgbk9iaiA9IG9iajtcbiAgICAgIG5PYmpbZXJyb3IuZmllbGRdID0gZXJyb3IubWVzc2FnZXNbMF0ucmVwbGFjZSgvXCIvZywgJycpO1xuICAgICAgcmV0dXJuIG5PYmo7XG4gICAgfSwge30pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFQSUVycm9yO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NlcnZpY2VzL2Vycm9yLmpzIiwiLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuLyoqXG4gKiBTZXJ2ZXIgc2V0dXBcbiAqL1xuXG5pbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCBjaGFsayBmcm9tICdjaGFsayc7XG5cbi8vIGltcG9ydCB7IGRiIH0gZnJvbSBcIi4vY29uZmlnL2RhdGFiYXNlXCI7XG5pbXBvcnQgJy4vY29uZmlnL2RhdGFiYXNlJztcbmltcG9ydCBtaWRkbGV3YXJlc0NvbmZpZyBmcm9tICcuL2NvbmZpZy9taWRkbGV3YXJlcyc7XG5pbXBvcnQgY29uc3RhbnRzIGZyb20gJy4vY29uZmlnL2NvbnN0YW50cyc7XG5pbXBvcnQgQXBpUm91dGVzIGZyb20gJy4vcm91dGVzJztcblxuY29uc3QgYXBwID0gZXhwcmVzcygpO1xuXG4vLyBXcmFwIGFsbCB0aGUgbWlkZGxld2FyZXMgd2l0aCB0aGUgc2VydmVyXG5taWRkbGV3YXJlc0NvbmZpZyhhcHApO1xuXG4vLyBhcHAudXNlKChyZXEsIHJlcywgbmV4dCkgPT4ge1xuLy8gICAvKiBlc2xpbnQtZGlzYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuLy8gICByZXEuZGIgPSBkYjtcbi8vICAgbmV4dCgpO1xuLy8gfSk7XG5cbi8vIEFkZCB0aGUgYXBpUm91dGVzIHN0YWNrIHRvIHRoZSBzZXJ2ZXJcbmFwcC51c2UoJy9hcGknLCBBcGlSb3V0ZXMpO1xuXG4vLyBXZSBuZWVkIHRoaXMgdG8gbWFrZSBzdXJlIHdlIGRvbid0IHJ1biBhIHNlY29uZCBpbnN0YW5jZVxuaWYgKCFtb2R1bGUucGFyZW50KSB7XG4gIGFwcC5saXN0ZW4oY29uc3RhbnRzLlBPUlQsIGVyciA9PiB7XG4gICAgaWYgKGVycikge1xuICAgICAgY29uc29sZS5sb2coY2hhbGsucmVkKCdDYW5ub3QgcnVuIScpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coXG4gICAgICAgIGNoYWxrLmdyZWVuLmJvbGQoXG4gICAgICAgICAgYFxuICAgICAgICBZZXAgdGhpcyBpcyB3b3JraW5nIPCfjbpcbiAgICAgICAgQXBwIGxpc3RlbiBvbiBwb3J0OiAke2NvbnN0YW50cy5QT1JUfSDwn42VXG4gICAgICAgIEVudjogJHtwcm9jZXNzLmVudi5OT0RFX0VOVn0g8J+mhFxuICAgICAgYCxcbiAgICAgICAgKSxcbiAgICAgICk7XG4gICAgfVxuICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYXBwO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtb2R1bGUpIHtcclxuXHRpZighbW9kdWxlLndlYnBhY2tQb2x5ZmlsbCkge1xyXG5cdFx0bW9kdWxlLmRlcHJlY2F0ZSA9IGZ1bmN0aW9uKCkge307XHJcblx0XHRtb2R1bGUucGF0aHMgPSBbXTtcclxuXHRcdC8vIG1vZHVsZS5wYXJlbnQgPSB1bmRlZmluZWQgYnkgZGVmYXVsdFxyXG5cdFx0aWYoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XHJcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImxvYWRlZFwiLCB7XHJcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXHJcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5sO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwiaWRcIiwge1xyXG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxyXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHJldHVybiBtb2R1bGUuaTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRtb2R1bGUud2VicGFja1BvbHlmaWxsID0gMTtcclxuXHR9XHJcblx0cmV0dXJuIG1vZHVsZTtcclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzXG4vLyBtb2R1bGUgaWQgPSAxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjaGFsa1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImNoYWxrXCJcbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBnLXByb21pc2VcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJwZy1wcm9taXNlXCJcbi8vIG1vZHVsZSBpZCA9IDIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImRvdGVudlwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImRvdGVudlwiXG4vLyBtb2R1bGUgaWQgPSAyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIENvbmZpZ3VyYXRpb24gb2YgdGhlIHNlcnZlciBtaWRkbGV3YXJlcy5cbiAqL1xuXG5pbXBvcnQgYm9keVBhcnNlciBmcm9tICdib2R5LXBhcnNlcic7XG5pbXBvcnQgbW9yZ2FuIGZyb20gJ21vcmdhbic7XG5pbXBvcnQgY29tcHJlc3Npb24gZnJvbSAnY29tcHJlc3Npb24nO1xuaW1wb3J0IHBhc3Nwb3J0IGZyb20gJ3Bhc3Nwb3J0JztcbmltcG9ydCBleHByZXNzV2luc3RvbiBmcm9tICdleHByZXNzLXdpbnN0b24nO1xuaW1wb3J0IG1ldGhvZE92ZXJyaWRlIGZyb20gJ21ldGhvZC1vdmVycmlkZSc7XG5pbXBvcnQgaGVsbWV0IGZyb20gJ2hlbG1ldCc7XG5pbXBvcnQgY29ycyBmcm9tICdjb3JzJztcbi8vIGltcG9ydCBleHByZXNzU3RhdHVzTW9uaXRvciBmcm9tICdleHByZXNzLXN0YXR1cy1tb25pdG9yJztcbmltcG9ydCB7IGdyYXBocWxFeHByZXNzLCBncmFwaGlxbEV4cHJlc3MgfSBmcm9tICdncmFwaHFsLXNlcnZlci1leHByZXNzJztcblxuaW1wb3J0IHdpbnN0b25JbnN0YW5jZSBmcm9tICcuL3dpbnN0b24nO1xuaW1wb3J0IHsgc2NoZW1hIH0gZnJvbSAnLi4vZ3JhcGhxbC9zY2hlbWEnO1xuXG5jb25zdCBpc1Rlc3QgPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Rlc3QnO1xuY29uc3QgaXNEZXYgPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50JztcblxuZXhwb3J0IGRlZmF1bHQgYXBwID0+IHtcbiAgYXBwLnVzZShjb21wcmVzc2lvbigpKTtcbiAgYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7XG4gIGFwcC51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHsgZXh0ZW5kZWQ6IHRydWUgfSkpO1xuICBhcHAudXNlKHBhc3Nwb3J0LmluaXRpYWxpemUoKSk7XG4gIGFwcC51c2UoaGVsbWV0KCkpO1xuICBhcHAudXNlKGNvcnMoKSk7XG4gIC8vIGFwcC51c2UoZXhwcmVzc1N0YXR1c01vbml0b3IoKSk7XG4gIGFwcC51c2UobWV0aG9kT3ZlcnJpZGUoKSk7XG4gIGFwcC51c2UoXG4gICAgJy9ncmFwaHFsJyxcbiAgICBncmFwaHFsRXhwcmVzcyh7XG4gICAgICBzY2hlbWEsXG4gICAgfSksXG4gICk7XG4gIGFwcC51c2UoXG4gICAgJy9ncmFwaGlxbCcsXG4gICAgZ3JhcGhpcWxFeHByZXNzKHtcbiAgICAgIGVuZHBvaW50VVJMOiAnL2dyYXBocWwnLFxuICAgIH0pLFxuICApO1xuICBpZiAoaXNEZXYgJiYgIWlzVGVzdCkge1xuICAgIGFwcC51c2UobW9yZ2FuKCdkZXYnKSk7XG4gICAgZXhwcmVzc1dpbnN0b24ucmVxdWVzdFdoaXRlbGlzdC5wdXNoKCdib2R5Jyk7XG4gICAgZXhwcmVzc1dpbnN0b24ucmVzcG9uc2VXaGl0ZWxpc3QucHVzaCgnYm9keScpO1xuICAgIGFwcC51c2UoXG4gICAgICBleHByZXNzV2luc3Rvbi5sb2dnZXIoe1xuICAgICAgICB3aW5zdG9uSW5zdGFuY2UsXG4gICAgICAgIG1ldGE6IHRydWUsXG4gICAgICAgIG1zZzpcbiAgICAgICAgICAnSFRUUCB7e3JlcS5tZXRob2R9fSB7e3JlcS51cmx9fSB7e3Jlcy5zdGF0dXNDb2RlfX0ge3tyZXMucmVzcG9uc2VUaW1lfX1tcycsXG4gICAgICAgIGNvbG9yU3RhdHVzOiB0cnVlLFxuICAgICAgfSksXG4gICAgKTtcbiAgfVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb25maWcvbWlkZGxld2FyZXMuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJib2R5LXBhcnNlclwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImJvZHktcGFyc2VyXCJcbi8vIG1vZHVsZSBpZCA9IDIzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1vcmdhblwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIm1vcmdhblwiXG4vLyBtb2R1bGUgaWQgPSAyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb21wcmVzc2lvblwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImNvbXByZXNzaW9uXCJcbi8vIG1vZHVsZSBpZCA9IDI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3Mtd2luc3RvblwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImV4cHJlc3Mtd2luc3RvblwiXG4vLyBtb2R1bGUgaWQgPSAyNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtZXRob2Qtb3ZlcnJpZGVcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJtZXRob2Qtb3ZlcnJpZGVcIlxuLy8gbW9kdWxlIGlkID0gMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaGVsbWV0XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiaGVsbWV0XCJcbi8vIG1vZHVsZSBpZCA9IDI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcnNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJjb3JzXCJcbi8vIG1vZHVsZSBpZCA9IDI5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImdyYXBocWwtc2VydmVyLWV4cHJlc3NcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJncmFwaHFsLXNlcnZlci1leHByZXNzXCJcbi8vIG1vZHVsZSBpZCA9IDMwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQ3JlYXRlIHRoZSB3aW5zdG9uIGxvZ2dlciBpbnN0YW5jZVxuICovXG5cbmltcG9ydCB3aW5zdG9uIGZyb20gJ3dpbnN0b24nO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgd2luc3Rvbi5Mb2dnZXIoe1xuICB0cmFuc3BvcnRzOiBbXG4gICAgbmV3IHdpbnN0b24udHJhbnNwb3J0cy5Db25zb2xlKHtcbiAgICAgIGpzb246IHRydWUsXG4gICAgICBjb2xvcml6ZTogdHJ1ZSxcbiAgICB9KSxcbiAgXSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBsb2dnZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29uZmlnL3dpbnN0b24uanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ3aW5zdG9uXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwid2luc3RvblwiXG4vLyBtb2R1bGUgaWQgPSAzMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBtYWtlRXhlY3V0YWJsZVNjaGVtYSB9IGZyb20gJ2dyYXBocWwtdG9vbHMnO1xuXG5pbXBvcnQgeyByZXNvbHZlcnMgfSBmcm9tICcuL3Jlc29sdmVycyc7IC8vIFdpbGwgYmUgaW1wbGVtZW50ZWQgYXQgYSBsYXRlciBzdGFnZS5cblxuY29uc3QgdHlwZURlZnMgPSBgXG4gICAgc2NhbGFyIERhdGVcblxuICAgIHR5cGUgVXNlciB7XG4gICAgICB1c2VydXVpZDogSUQhXG4gICAgICB1c2VybmFtZTogU3RyaW5nXG4gICAgICBlbWFpbDogU3RyaW5nIVxuICAgICAgbmFtZTogU3RyaW5nXG4gICAgICBhY2Nlc3N0b2tlbjogU3RyaW5nXG4gICAgICBjcmVhdGVkYXQ6IERhdGUhXG4gICAgICB1cGRhdGVkYXQ6IERhdGUhXG4gICAgfVxuXG4gICAgdHlwZSBQcm9kdWN0IHtcbiAgICAgIF9pZDogSUQhXG4gICAgICB0aXRsZTogU3RyaW5nXG4gICAgICBwcmljZTogRmxvYXRcbiAgICAgIGN1cnJlbmN5OiBTdHJpbmdcbiAgICAgIGNhdGVnb3J5OiBTdHJpbmdcbiAgICAgIHN1YkNhdGVnb3J5OiBTdHJpbmdcbiAgICAgIGRlc2NyaXB0aW9uOiBTdHJpbmdcbiAgICAgIGNyZWF0ZWRCeTogU3RyaW5nXG4gICAgICBpbWFnZVVybDogU3RyaW5nXG4gICAgICBjcmVhdGVkQXQ6IERhdGUhXG4gICAgICB1cGRhdGVkQXQ6IERhdGUhXG4gICAgfVxuXG4gICAgIyBUaGlzIHR5cGUgc3BlY2lmaWVzIHRoZSBlbnRyeSBwb2ludHMgaW50byBvdXIgQVBJLlxuICAgIHR5cGUgUXVlcnkge1xuICAgICAgcHJvZHVjdHM6IFtQcm9kdWN0XVxuICAgICAgZ2V0VXNlcih1c2VydXVpZDogSUQhKTogVXNlclxuICAgIH1cblxuICAgICMgVGhlIG11dGF0aW9uIHJvb3QgdHlwZSwgdXNlZCB0byBkZWZpbmUgYWxsIG11dGF0aW9ucy5cbiAgICAjdHlwZSBNdXRhdGlvbiB7XG4gICAgIyAgIyBBIG11dGF0aW9uIHRvIGFkZCBhIG5ldyBjaGFubmVsIHRvIHRoZSBsaXN0IG9mIGNoYW5uZWxzXG4gICAgIyAgYWRkQ2hhbm5lbChuYW1lOiBTdHJpbmchKTogQ2hhbm5lbFxuICAgICN9XG4gICAgYDtcblxuY29uc3Qgc2NoZW1hID0gbWFrZUV4ZWN1dGFibGVTY2hlbWEoeyB0eXBlRGVmcywgcmVzb2x2ZXJzIH0pO1xuZXhwb3J0IHsgc2NoZW1hIH07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZ3JhcGhxbC9zY2hlbWEuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJncmFwaHFsLXRvb2xzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiZ3JhcGhxbC10b29sc1wiXG4vLyBtb2R1bGUgaWQgPSAzNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgVXNlciBmcm9tICcuLi8uLi9tb2RlbHMvdXNlci5tb2RlbCc7XG5pbXBvcnQgUHJvZHVjdCBmcm9tICcuLi8uLi9tb2RlbHMvcHJvZHVjdC5tb2RlbCc7XG5cbmV4cG9ydCBjb25zdCByZXNvbHZlcnMgPSB7XG4gIFF1ZXJ5OiB7XG4gICAgcHJvZHVjdHM6ICgpID0+IFByb2R1Y3QuZmluZCh7fSksXG4gICAgZ2V0VXNlcjogKF8sIHsgdXNlcnV1aWQgfSkgPT4gVXNlci5maW5kT25lKCd1c2VydXVpZCcsIHVzZXJ1dWlkKSxcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZ3JhcGhxbC9yZXNvbHZlcnMvaW5kZXguanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiY3J5cHQtbm9kZWpzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiYmNyeXB0LW5vZGVqc1wiXG4vLyBtb2R1bGUgaWQgPSAzNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJqc29ud2VidG9rZW5cIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJqc29ud2VidG9rZW5cIlxuLy8gbW9kdWxlIGlkID0gMzdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyogZXNsaW50LWRpc2FibGUgbm8tdXNlbGVzcy1lc2NhcGUgKi9cbmV4cG9ydCBjb25zdCBzbHVnaWZ5ID0gdGV4dCA9PlxuICB0ZXh0XG4gICAgLnRvU3RyaW5nKClcbiAgICAudG9Mb3dlckNhc2UoKVxuICAgIC5yZXBsYWNlKC9cXHMrL2csICctJykgLy8gUmVwbGFjZSBzcGFjZXMgd2l0aCAtXG4gICAgLnJlcGxhY2UoL1teXFx3XFwtXSsvZywgJycpIC8vIFJlbW92ZSBhbGwgbm9uLXdvcmQgY2hhcnNcbiAgICAucmVwbGFjZSgvXFwtXFwtKy9nLCAnLScpIC8vIFJlcGxhY2UgbXVsdGlwbGUgLSB3aXRoIHNpbmdsZSAtXG4gICAgLnJlcGxhY2UoL14tKy8sICcnKSAvLyBUcmltIC0gZnJvbSBzdGFydCBvZiB0ZXh0XG4gICAgLnJlcGxhY2UoLy0rJC8sICcnKTsgLy8gVHJpbSAtIGZyb20gZW5kIG9mIHRleHRcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlscy9zbHVnaWZ5LmpzIiwiLyoqXG4gKiBBUEkgUm91dGVzXG4gKi9cblxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgSFRUUFN0YXR1cyBmcm9tICdodHRwLXN0YXR1cyc7XG5cbmltcG9ydCBVc2VyUm91dGVzIGZyb20gJy4vdXNlci5yb3V0ZXMnO1xuaW1wb3J0IFByb2R1Y3RSb3V0ZXMgZnJvbSAnLi9wcm9kdWN0LnJvdXRlcyc7XG5pbXBvcnQgT3JkZXJSb3V0ZXMgZnJvbSAnLi9vcmRlci5yb3V0ZXMnO1xuaW1wb3J0IFBvc3RSb3V0ZXMgZnJvbSAnLi9wb3N0LnJvdXRlcyc7XG5pbXBvcnQgU2VlZFJvdXRlcyBmcm9tICcuL3NlZWQucm91dGVzJztcblxuaW1wb3J0IEFQSUVycm9yIGZyb20gJy4uL3NlcnZpY2VzL2Vycm9yJztcblxuLy8gTWlkZGxld2FyZXNcbmltcG9ydCBsb2dFcnJvclNlcnZpY2UgZnJvbSAnLi4vc2VydmljZXMvbG9nJztcblxuY29uc3Qgcm91dGVzID0gbmV3IFJvdXRlcigpO1xuXG5jb25zdCBpc0RldiA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnO1xuY29uc3QgaXNUZXN0ID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICd0ZXN0Jztcblxucm91dGVzLnVzZSgnL3VzZXJzJywgVXNlclJvdXRlcyk7XG5yb3V0ZXMudXNlKCcvcG9zdHMnLCBQb3N0Um91dGVzKTtcbnJvdXRlcy51c2UoJy9wcm9kdWN0cycsIFByb2R1Y3RSb3V0ZXMpO1xucm91dGVzLnVzZSgnL29yZGVycycsIE9yZGVyUm91dGVzKTtcblxuaWYgKGlzRGV2IHx8IGlzVGVzdCkge1xuICByb3V0ZXMudXNlKCcvc2VlZHMnLCBTZWVkUm91dGVzKTtcbn1cblxucm91dGVzLmFsbCgnKicsIChyZXEsIHJlcywgbmV4dCkgPT5cbiAgbmV4dChuZXcgQVBJRXJyb3IoJ05vdCBGb3VuZCEnLCBIVFRQU3RhdHVzLk5PVF9GT1VORCwgdHJ1ZSkpLFxuKTtcbnJvdXRlcy51c2UobG9nRXJyb3JTZXJ2aWNlKTtcblxuZXhwb3J0IGRlZmF1bHQgcm91dGVzO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3JvdXRlcy9pbmRleC5qcyIsIi8qKlxuICogVXNlciBSb3V0ZXNcbiAqL1xuXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdleHByZXNzJztcbmltcG9ydCB2YWxpZGF0ZSBmcm9tICdleHByZXNzLXZhbGlkYXRpb24nO1xuXG5pbXBvcnQgKiBhcyBVc2VyQ29udHJvbGxlciBmcm9tICcuLi9jb250cm9sbGVycy91c2VyLmNvbnRyb2xsZXInO1xuaW1wb3J0ICogYXMgQXV0aGVudGljYXRpb25Db250cm9sbGVyIGZyb20gJy4uL2NvbnRyb2xsZXJzL2F1dGhlbnRpY2F0aW9uLmNvbnRyb2xsZXInO1xuaW1wb3J0IHsgYXV0aExvY2FsIH0gZnJvbSAnLi4vc2VydmljZXMvYXV0aCc7XG5cbmNvbnN0IHJvdXRlcyA9IG5ldyBSb3V0ZXIoKTtcblxucm91dGVzLnBvc3QoXG4gICcvc2lnbnVwJyxcbiAgdmFsaWRhdGUoVXNlckNvbnRyb2xsZXIudmFsaWRhdGlvbi5jcmVhdGUpLFxuICBVc2VyQ29udHJvbGxlci5jcmVhdGUsXG4pO1xucm91dGVzLnBvc3QoXG4gICcvbG9naW4nLFxuICB2YWxpZGF0ZShBdXRoZW50aWNhdGlvbkNvbnRyb2xsZXIudmFsaWRhdGlvbi5sb2dpbiksXG4gIGF1dGhMb2NhbCxcbiAgQXV0aGVudGljYXRpb25Db250cm9sbGVyLmxvZ2luLFxuKTtcblxuZXhwb3J0IGRlZmF1bHQgcm91dGVzO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3JvdXRlcy91c2VyLnJvdXRlcy5qcyIsIi8qKlxuICogVXNlciBjb250cm9sbGVyXG4gKi9cblxuaW1wb3J0IEpvaSBmcm9tICdqb2knO1xuaW1wb3J0IEhUVFBTdGF0dXMgZnJvbSAnaHR0cC1zdGF0dXMnO1xuXG5pbXBvcnQgeyBmaWx0ZXJlZEJvZHkgfSBmcm9tICcuLi91dGlscy9maWx0ZXJlZEJvZHknO1xuaW1wb3J0IGNvbnN0YW50cyBmcm9tICcuLi9jb25maWcvY29uc3RhbnRzJztcbmltcG9ydCBVc2VyIGZyb20gJy4uL21vZGVscy91c2VyLm1vZGVsJztcblxuZXhwb3J0IGNvbnN0IHZhbGlkYXRpb24gPSB7XG4gIGNyZWF0ZToge1xuICAgIGJvZHk6IHtcbiAgICAgIGVtYWlsOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmVtYWlsKClcbiAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICBwYXNzd29yZDogSm9pLnN0cmluZygpXG4gICAgICAgIC5taW4oNilcbiAgICAgICAgLnJlZ2V4KC9eKD89LipbMC05XSkoPz0uKlthLXpBLVpdKShbYS16QS1aMC05XSspJC8pXG4gICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgdXNlcm5hbWU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAubWluKDMpXG4gICAgICAgIC5tYXgoMjApXG4gICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgbmFtZTogSm9pLnN0cmluZygpXG4gICAgICAgIC5taW4oMilcbiAgICAgICAgLnJlZ2V4KC9bYS16QS1aXSsvKVxuICAgICAgICAucmVxdWlyZWQoKSxcbiAgICB9LFxuICB9LFxufTtcblxuLyoqXG4gKiBAYXBpIHtwb3N0fSAvdXNlcnMvc2lnbnVwIENyZWF0ZSBhIHVzZXJcbiAqIEBhcGlEZXNjcmlwdGlvbiBDcmVhdGUgYSB1c2VyXG4gKiBAYXBpTmFtZSBjcmVhdGVVc2VyXG4gKiBAYXBpR3JvdXAgVXNlclxuICpcbiAqIEBhcGlQYXJhbSAoQm9keSkge1N0cmluZ30gZW1haWwgVXNlciBlbWFpbC5cbiAqIEBhcGlQYXJhbSAoQm9keSkge1N0cmluZ30gcGFzc3dvcmQgVXNlciBwYXNzd29yZC5cbiAqIEBhcGlQYXJhbSAoQm9keSkge1N0cmluZ30gdXNlcm5hbWUgVXNlciB1c2VybmFtZS5cbiAqIEBhcGlQYXJhbSAoQm9keSkge1N0cmluZ30gbmFtZSBVc2VyIG5hbWUuXG4gKlxuICogQGFwaVN1Y2Nlc3Mge051bWJlcn0gc3RhdHVzIFN0YXR1cyBvZiB0aGUgUmVxdWVzdC5cbiAqIEBhcGlTdWNjZXNzIHtTdHJpbmd9IF9pZCBVc2VyIF9pZC5cbiAqIEBhcGlTdWNjZXNzIHtTdHJpbmd9IHRva2VuIEF1dGhlbnRpY2F0aW9uIHRva2VuLlxuICpcbiAqIEBhcGlTdWNjZXNzRXhhbXBsZSBTdWNjZXNzLVJlc3BvbnNlOlxuICpcbiAqIEhUVFAvMS4xIDIwMCBPS1xuICpcbiAqIHtcbiAqICBfaWQ6ICcxMjMnLFxuICogIHRva2VuOiAnSldUIGV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpmYVdRaU9pSTFPVEJoTVdJM09EQXpNREkzTjJOaU5qUXhNMkpoWkdVaUxDSnBZWFFpT2pFME9UTTRNelEyTVRaOS5SU2xNRjZSUndBQUxaUVJkZktyT1pXbnVIQmstbVFOblJjQ0xKc2M4emlvJyxcbiAqIH1cbiAqXG4gKiBAYXBpRXJyb3JFeGFtcGxlIHtqc29ufSBFcnJvclxuICogIEhUVFAvMS4xIDQwMCBCYWQgUmVxdWVzdFxuICpcbiAqICB7XG4gKiAgICBlbWFpbDogJ2VtYWlsIGlzIHJlcXVpcmVkJ1xuICogIH1cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZShyZXEsIHJlcywgbmV4dCkge1xuICBjb25zdCBib2R5ID0gZmlsdGVyZWRCb2R5KHJlcS5ib2R5LCBjb25zdGFudHMuV0hJVEVMSVNULnVzZXJzLmNyZWF0ZSk7XG4gIHRyeSB7XG4gICAgY29uc3QgbmV3VXNlciA9IGF3YWl0IFVzZXIuY3JlYXRlVXNlcihib2R5KTtcbiAgICByZXR1cm4gcmVzLnN0YXR1cyhIVFRQU3RhdHVzLkNSRUFURUQpLmpzb24oVXNlci50b0F1dGhKU09OKG5ld1VzZXIpKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGUuc3RhdHVzID0gSFRUUFN0YXR1cy5CQURfUkVRVUVTVDtcbiAgICByZXR1cm4gbmV4dChlKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnRyb2xsZXJzL3VzZXIuY29udHJvbGxlci5qcyIsIi8qKlxuICogQXV0aGVudGljYXRpb24gY29udHJvbGxlclxuICovXG5cbmltcG9ydCBIVFRQU3RhdHVzIGZyb20gJ2h0dHAtc3RhdHVzJztcbmltcG9ydCBKb2kgZnJvbSAnam9pJztcbmltcG9ydCBVc2VyIGZyb20gJy4uL21vZGVscy91c2VyLm1vZGVsJztcblxuZXhwb3J0IGNvbnN0IHZhbGlkYXRpb24gPSB7XG4gIGxvZ2luOiB7XG4gICAgYm9keToge1xuICAgICAgZW1haWw6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuZW1haWwoKVxuICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgIHBhc3N3b3JkOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLnJlZ2V4KC9eW2EtekEtWjAtOV17MywzMH0kLylcbiAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgfSxcbiAgfSxcbn07XG5cbi8qKlxuICogQGFwaSB7cG9zdH0gL3VzZXJzL2xvZ2luIExvZ2luIGEgdXNlclxuICogQGFwaURlc2NyaXB0aW9uIExvZ2luIGEgdXNlclxuICogQGFwaU5hbWUgbG9naW5Vc2VyXG4gKiBAYXBpR3JvdXAgVXNlclxuICpcbiAqIEBhcGlQYXJhbSAoQm9keSkge1N0cmluZ30gZW1haWwgVXNlciBlbWFpbC5cbiAqIEBhcGlQYXJhbSAoQm9keSkge1N0cmluZ30gcGFzc3dvcmQgVXNlciBwYXNzd29yZC5cbiAqXG4gKiBAYXBpU3VjY2VzcyB7TnVtYmVyfSBzdGF0dXMgU3RhdHVzIG9mIHRoZSBSZXF1ZXN0LlxuICogQGFwaVN1Y2Nlc3Mge1N0cmluZ30gX2lkIFVzZXIgX2lkLlxuICogQGFwaVN1Y2Nlc3Mge1N0cmluZ30gdG9rZW4gQXV0aGVudGljYXRpb24gdG9rZW4uXG4gKlxuICogQGFwaVN1Y2Nlc3NFeGFtcGxlIFN1Y2Nlc3MtUmVzcG9uc2U6XG4gKlxuICogSFRUUC8xLjEgMjAwIE9LXG4gKlxuICoge1xuICogIF9pZDogJzEyMycsXG4gKiAgdG9rZW46ICdKV1QgZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmZhV1FpT2lJMU9UQmhNV0kzT0RBek1ESTNOMk5pTmpReE0ySmhaR1VpTENKcFlYUWlPakUwT1RNNE16UTJNVFo5LlJTbE1GNlJSd0FBTFpRUmRmS3JPWldudUhCay1tUU5uUmNDTEpzYzh6aW8nLFxuICogfVxuICpcbiAqIEBhcGlFcnJvckV4YW1wbGUge2pzb259IEVycm9yXG4gKiAgSFRUUC8xLjEgNDAwIEJhZCBSZXF1ZXN0XG4gKlxuICogIHtcbiAqICAgIGVtYWlsOiAnZW1haWwgaXMgcmVxdWlyZWQnXG4gKiAgfVxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9naW4ocmVxLCByZXMsIG5leHQpIHtcbiAgLy8gY29uc3QgZGF0YSA9IGF3YWl0IGRiLm9uZShcIlNFTEVDVCAqIEZST00gdXNlcnNcIik7XG4gIC8vIGNvbnNvbGUubG9nKGRhdGEpO1xuICByZXMuc3RhdHVzKEhUVFBTdGF0dXMuT0spLmpzb24oVXNlci50b0F1dGhKU09OKHJlcS51c2VyKSk7XG5cbiAgcmV0dXJuIG5leHQoKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb250cm9sbGVycy9hdXRoZW50aWNhdGlvbi5jb250cm9sbGVyLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGFzc3BvcnQtbG9jYWxcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJwYXNzcG9ydC1sb2NhbFwiXG4vLyBtb2R1bGUgaWQgPSA0M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXNzcG9ydC1qd3RcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJwYXNzcG9ydC1qd3RcIlxuLy8gbW9kdWxlIGlkID0gNDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBQcm9kdWN0IFJvdXRlc1xuICovXG5cbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IHZhbGlkYXRlIGZyb20gJ2V4cHJlc3MtdmFsaWRhdGlvbic7XG5cbmltcG9ydCAqIGFzIFByb2R1Y3RDb250cm9sbGVyIGZyb20gJy4uL2NvbnRyb2xsZXJzL3Byb2R1Y3QuY29udHJvbGxlcic7XG5pbXBvcnQgeyBhdXRoSnd0IH0gZnJvbSAnLi4vc2VydmljZXMvYXV0aCc7XG5cbmNvbnN0IHJvdXRlcyA9IG5ldyBSb3V0ZXIoKTtcblxucm91dGVzXG4gIC5yb3V0ZSgnLycpXG4gIC5wb3N0KFxuICAgIGF1dGhKd3QsXG4gICAgdmFsaWRhdGUoUHJvZHVjdENvbnRyb2xsZXIudmFsaWRhdGlvbi5jcmVhdGUpLFxuICAgIFByb2R1Y3RDb250cm9sbGVyLmNyZWF0ZVByb2R1Y3QsXG4gIClcbiAgLmdldChQcm9kdWN0Q29udHJvbGxlci5nZXRBbGxQcm9kdWN0cyk7XG5cbi8vIHJvdXRlcy5yb3V0ZShcIi9zZWFyY2hcIikuZ2V0KFByb2R1Y3RDb250cm9sbGVyLnNlYXJjaFByb2R1Y3RzKTtcblxucm91dGVzXG4gIC5yb3V0ZSgnLzppZCcpXG4gIC5kZWxldGUoYXV0aEp3dCwgUHJvZHVjdENvbnRyb2xsZXIuZGVsZXRlUHJvZHVjdClcbiAgLnBhdGNoKFxuICAgIGF1dGhKd3QsXG4gICAgdmFsaWRhdGUoUHJvZHVjdENvbnRyb2xsZXIudmFsaWRhdGlvbi51cGRhdGUpLFxuICAgIFByb2R1Y3RDb250cm9sbGVyLnVwZGF0ZVByb2R1Y3QsXG4gIClcbiAgLmdldChQcm9kdWN0Q29udHJvbGxlci5nZXRTaW5nbGVQcm9kdWN0KTtcblxuZXhwb3J0IGRlZmF1bHQgcm91dGVzO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3JvdXRlcy9wcm9kdWN0LnJvdXRlcy5qcyIsImltcG9ydCBKb2kgZnJvbSAnam9pJztcbmltcG9ydCBIVFRQU3RhdHVzIGZyb20gJ2h0dHAtc3RhdHVzJztcbmltcG9ydCB7IE9iamVjdElEIH0gZnJvbSAnbW9uZ29kYic7XG5pbXBvcnQgY29uc3RhbnRzIGZyb20gJy4uL2NvbmZpZy9jb25zdGFudHMnO1xuXG5pbXBvcnQgeyBmaWx0ZXJlZEJvZHkgfSBmcm9tICcuLi91dGlscy9maWx0ZXJlZEJvZHknO1xuXG5pbXBvcnQgUHJvZHVjdCBmcm9tICcuLi9tb2RlbHMvcHJvZHVjdC5tb2RlbCc7XG5cbmV4cG9ydCBjb25zdCB2YWxpZGF0aW9uID0ge1xuICBjcmVhdGU6IHtcbiAgICBib2R5OiB7XG4gICAgICB0aXRsZTogSm9pLnN0cmluZygpXG4gICAgICAgIC5taW4oMylcbiAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICBkZXNjcmlwdGlvbjogSm9pLnN0cmluZygpXG4gICAgICAgIC5taW4oMylcbiAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICBpbWFnZVVybDogSm9pLnN0cmluZygpXG4gICAgICAgIC5taW4oMylcbiAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICBwcmljZTogSm9pLm51bWJlcigpLnJlcXVpcmVkKCksXG4gICAgICBjdXJyZW5jeTogSm9pLnN0cmluZygpLnJlcXVpcmVkKCksXG4gICAgICBjYXRlZ29yeTogSm9pLnN0cmluZygpXG4gICAgICAgIC5taW4oMilcbiAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICBzdWJDYXRlZ29yeTogSm9pLnN0cmluZygpLFxuICAgIH0sXG4gIH0sXG4gIHVwZGF0ZToge1xuICAgIGJvZHk6IHtcbiAgICAgIHRpdGxlOiBKb2kuc3RyaW5nKCkubWluKDMpLFxuICAgICAgZGVzY3JpcHRpb246IEpvaS5zdHJpbmcoKS5taW4oMyksXG4gICAgICBpbWFnZVVybDogSm9pLnN0cmluZygpLm1pbigzKSxcbiAgICAgIHByaWNlOiBKb2kubnVtYmVyKCksXG4gICAgICBjdXJyZW5jeTogSm9pLnN0cmluZygpLFxuICAgICAgY2F0ZWdvcnk6IEpvaS5zdHJpbmcoKS5taW4oMiksXG4gICAgICBzdWJDYXRlZ29yeTogSm9pLnN0cmluZygpLFxuICAgIH0sXG4gIH0sXG4gIGRlbGV0ZToge1xuICAgIGJvZHk6IHtcbiAgICAgIF9pZDogSm9pLnN0cmluZygpXG4gICAgICAgIC5taW4oMjQpXG4gICAgICAgIC5yZXF1aXJlZCgpLFxuICAgIH0sXG4gIH0sXG59O1xuXG4vKipcbiAqIEBhcGkge3Bvc3R9IC9wcm9kdWN0cyBDcmVhdGUgYSBwcm9kdWN0XG4gKiBAYXBpRGVzY3JpcHRpb24gQ3JlYXRlIGEgcHJvZHVjdFxuICogQGFwaU5hbWUgY3JlYXRlUHJvZHVjdFxuICogQGFwaUdyb3VwIFByb2R1Y3RcbiAqXG4gKiBAYXBpUGFyYW0gKGJvZHkpIHtTdHJpbmd9IHRpdGxlXG4gKiBAYXBpUGFyYW0gKGJvZHkpIHtTdHJpbmd9IGRlc2NyaXB0aW9uXG4gKiBAYXBpUGFyYW0gKGJvZHkpIHtTdHJpbmd9IGltYWdlVXJsXG4gKiBAYXBpUGFyYW0gKGJvZHkpIHtOdW1iZXJ9IHByaWNlXG4gKiBAYXBpUGFyYW0gKGJvZHkpIHtTdHJpbmd9IGN1cnJlbmN5XG4gKiBAYXBpUGFyYW0gKGJvZHkpIHtTdHJpbmd9IGNhdGVnb3J5XG4gKiBAYXBpUGFyYW0gKGJvZHkpIHtbU3RyaW5nXX0gc3ViQ2F0ZWdvcnlcbiAqXG4gKiBAYXBpSGVhZGVyIHtBdXRob3JpemF0aW9ufSBBdXRob3JpemF0aW9uIEpXVCBUb2tlblxuICpcbiAqIEBhcGlTdWNjZXNzIHtOdW1iZXJ9IHN0YXR1cyBTdGF0dXMgb2YgdGhlIFJlcXVlc3RcbiAqIEBhcGlTdWNjZXNzIHtTdHJpbmd9IG1lc3NhZ2UgRGVzY3JpcHRpb24gb2Ygd2hhdCBoYXMgYmVlbiBkb25lLlxuICpcbiAqIEBhcGlIZWFkZXJFeGFtcGxlIHtqc29ufSBIZWFkZXItRXhhbXBsZTpcbiAqIHtcbiAqICBcIkF1dGhvcml6YXRpb25cIjogXCJKV1QgZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmZhV1FpT2lJMU9UQmhNV0kzT0RBek1ESTNOMk5pTmpReE0ySmhaR1VpTENKcFlYUWlPakUwT1RNNE16UTJNVFo5LlJTbE1GNlJSd0FBTFpRUmRmS3JPWldudUhCay1tUU5uUmNDTEpzYzh6aW9cIlxuICogfVxuICpcbiAqIEBhcGlTdWNjZXNzRXhhbXBsZSBTdWNjZXNzLVJlc3BvbnNlOlxuICpcbiAqIEhUVFAvMS4xIDIwMSBDUkVBVEVEXG4gKlxuICoge1xuICogIG1lc3NhZ2U6ICdOZXcgcHJvZHVjdCBjcmVhdGVkLidcbiAqIH1cbiAqXG4gKiBAYXBpRXJyb3JFeGFtcGxlIHtqc29ufSBVbmF1dGhvcml6ZWRcbiAqICAgIEhUVFAvMS4xIDQwMSBVbmF1dGhvcml6ZWRcbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVByb2R1Y3QgPSBhc3luYyAocmVxLCByZXMsIG5leHQpID0+IHtcbiAgY29uc3QgYm9keSA9IGZpbHRlcmVkQm9keShyZXEuYm9keSwgY29uc3RhbnRzLldISVRFTElTVC5wcm9kdWN0cy5jcmVhdGUpO1xuICB0cnkge1xuICAgIGNvbnN0IG5ld1Byb2R1Y3QgPSBhd2FpdCBQcm9kdWN0LmNyZWF0ZVByb2R1Y3QoYm9keSwgcmVxLnVzZXIudXNlcnV1aWQpO1xuICAgIHJlc1xuICAgICAgLnN0YXR1cyhIVFRQU3RhdHVzLkNSRUFURUQpXG4gICAgICAuanNvbih7IHByb2R1Y3Q6IG5ld1Byb2R1Y3QsIG1lc3NhZ2U6ICdOZXcgcHJvZHVjdCBjcmVhdGVkLiAnIH0pO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gbmV4dChlcnIpO1xuICB9XG59O1xuXG4vKipcbiAqIEBhcGkge2RlbGV0ZX0gL3Byb2R1Y3RzLzppZCBEZWxldGUgYSBwcm9kdWN0XG4gKiBAYXBpRGVzY3JpcHRpb24gRGVsZXRlIGEgcHJvZHVjdFxuICogQGFwaU5hbWUgZGVsZXRlUHJvZHVjdFxuICogQGFwaUdyb3VwIFByb2R1Y3RcbiAqXG4gKiBAYXBpUGFyYW0gKHBhcmFtKSB7U3RyaW5nfSBpZCBNb25nb0RCIE9iamVjdElEIG9mIHRoZSBQcm9kdWN0XG4gKlxuICogQGFwaUhlYWRlciB7QXV0aG9yaXphdGlvbn0gQXV0aG9yaXphdGlvbiBKV1QgVG9rZW5cbiAqXG4gKiBAYXBpU3VjY2VzcyB7TnVtYmVyfSBzdGF0dXMgU3RhdHVzIG9mIHRoZSBSZXF1ZXN0XG4gKiBAYXBpU3VjY2VzcyB7U3RyaW5nfSBtZXNzYWdlIERlc2NyaXB0aW9uIG9mIHdoYXQgaGFzIGJlZW4gZG9uZS5cbiAqIEBhcGlTdWNjZXNzIHtPYmplY3R9IGRlbGV0ZWQgVGhlIG9iamVjdCBvZiB0aGUgcHJvZHVjdCB0aGF0IGhhcyBiZWVuIGRlbGV0ZWRcbiAqXG4gKiBAYXBpSGVhZGVyRXhhbXBsZSB7anNvbn0gSGVhZGVyLUV4YW1wbGU6XG4gKiB7XG4gKiAgXCJBdXRob3JpemF0aW9uXCI6IFwiSldUIGV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpmYVdRaU9pSTFPVEJoTVdJM09EQXpNREkzTjJOaU5qUXhNMkpoWkdVaUxDSnBZWFFpT2pFME9UTTRNelEyTVRaOS5SU2xNRjZSUndBQUxaUVJkZktyT1pXbnVIQmstbVFOblJjQ0xKc2M4emlvXCJcbiAqXG4gKiB9XG4gKlxuICogQGFwaVN1Y2Nlc3NFeGFtcGxlIFN1Y2Nlc3MtUmVzcG9uc2U6XG4gKlxuICogSFRUUC8xLjEgMjAxIENSRUFURURcbiAqXG4gKiB7XG4gKiAgbWVzc2FnZTogJ05ldyBwcm9kdWN0IGNyZWF0ZWQuJ1xuICogfVxuICpcbiAqIEBhcGlFcnJvckV4YW1wbGUge2pzb259IFVuYXV0aG9yaXplZFxuICogICAgSFRUUC8xLjEgNDAxIFVuYXV0aG9yaXplZFxuICovXG5leHBvcnQgY29uc3QgZGVsZXRlUHJvZHVjdCA9IGFzeW5jIChyZXEsIHJlcywgbmV4dCkgPT4ge1xuICAvLyBjb25zdCBib2R5ID0gZmlsdGVyZWRCb2R5KHJlcS5ib2R5LCBjb25zdGFudHMuV0hJVEVMSVNULnByb2R1Y3RzLmRlbGV0ZSk7XG4gIHRyeSB7XG4gICAgaWYgKCFPYmplY3RJRC5pc1ZhbGlkKHJlcS5wYXJhbXMuaWQpKSB7XG4gICAgICByZXR1cm4gcmVzXG4gICAgICAgIC5zdGF0dXMoSFRUUFN0YXR1cy5CQURfUkVRVUVTVClcbiAgICAgICAgLmpzb24oeyBtZXNzYWdlOiAnSW52YWxpZCBNb25nb0RCIE9iamVjdElELicgfSk7XG4gICAgfVxuICAgIGNvbnN0IHByb2R1Y3QgPSBhd2FpdCBQcm9kdWN0LmZpbmRCeUlkKHJlcS5wYXJhbXMuaWQpO1xuICAgIC8vIGlmICghZGVsZXRlZFByb2R1Y3QpIHtcbiAgICAvLyAgIC8qIGVzbGludC1kaXNhYmxlIG5vLXRocm93LWxpdGVyYWwgKi9cbiAgICAvLyAgIHRocm93IHtcbiAgICAvLyAgICAgbmFtZTogXCJQcm9kdWN0IGVycm9yXCIsXG4gICAgLy8gICAgIG1lc3NhZ2U6IFwiTm8gcHJvZHVjdCBmb3VuZCB3aXRoIHRoYXQgX2lkXCIsXG4gICAgLy8gICAgIHN0YXR1czogNDAwXG4gICAgLy8gICB9O1xuICAgIC8vIH1cbiAgICBjb25zdCByZW1vdmVkUHJvZHVjdCA9IGF3YWl0IHByb2R1Y3QucmVtb3ZlKCk7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoSFRUUFN0YXR1cy5PSykuanNvbih7XG4gICAgICBkZWxldGVkOiByZW1vdmVkUHJvZHVjdC50b09iamVjdCgpLFxuICAgICAgbWVzc2FnZTogJ1Byb2R1Y3QgaGFzIGJlZW4gZGVsZXRlZC4nLFxuICAgIH0pO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gbmV4dChlcnIpO1xuICB9XG59O1xuXG4vKipcbiAqIEBhcGkge2dldH0gL3Byb2R1Y3RzIEdldCBwcm9kdWN0c1xuICogQGFwaURlc2NyaXB0aW9uIEdldCBhbGwgcHJvZHVjdHMgb3IgcHJvZHVjdHMgb2YgYSBzcGVjaWZpYyBjYXRlZ29yeVxuICogQGFwaU5hbWUgZ2V0QWxsUHJvZHVjdHNcbiAqIEBhcGlHcm91cCBQcm9kdWN0XG4gKlxuICogQGFwaUhlYWRlciB7QXV0aG9yaXphdGlvbn0gQXV0aG9yaXphdGlvbiBKV1QgVG9rZW5cbiAqXG4gKiBAYXBpUGFyYW0gKHF1ZXJ5KSB7W1N0cmluZ119IGNhdGVnb3J5IFRoZSBwcm9kdWN0IGNhdGVnb3J5IHRvIGZpbmQgcHJvZHVjdHMgb2YuXG4gKlxuICogQGFwaVN1Y2Nlc3Mge051bWJlcn0gc3RhdHVzIFN0YXR1cyBvZiB0aGUgUmVxdWVzdC5cbiAqIEBhcGlTdWNjZXNzIHtBcnJheVtdfSBwcm9kdWN0IExpc3Qgb2YgcHJvZHVjdHMuXG4gKiBAYXBpU3VjY2VzcyB7U3RyaW5nfSBwcm9kdWN0Ll9pZCBQcm9kdWN0IF9pZC5cbiAqIEBhcGlTdWNjZXNzIHtTdHJpbmd9IHByb2R1Y3QudGl0bGUgUHJvZHVjdCB0aXRsZS5cbiAqIEBhcGlTdWNjZXNzIHtOdW1iZXJ9IHByb2R1Y3QucHJpY2UgUHJvZHVjdCBwcmljZS5cbiAqIEBhcGlTdWNjZXNzIHtTdHJpbmd9IHByb2R1Y3QuY3VycmVuY3kgUHJvZHVjdCBjdXJyZW5jeS5cbiAqIEBhcGlTdWNjZXNzIHtTdHJpbmd9IHByb2R1Y3Quc2x1ZyBQcm9kdWN0IHNsdWcuXG4gKiBAYXBpU3VjY2VzcyB7U3RyaW5nfSBwcm9kdWN0LmltYWdlVXJsIFByb2R1Y3QgaW1hZ2VVcmwuXG4gKiBAYXBpU3VjY2VzcyB7U3RyaW5nfSBwcm9kdWN0LmNhdGVnb3J5IFByb2R1Y3QgY2F0ZWdvcnkuXG4gKiBAYXBpU3VjY2VzcyB7U3RyaW5nfSBwcm9kdWN0LmNyZWF0ZWRCeSBQcm9kdWN0IGNyZWF0b3IgdXNlcnV1aWQuXG4gKiBAYXBpU3VjY2VzcyB7U3RyaW5nfSBwcm9kdWN0LmNyZWF0ZWRBdCBQcm9kdWN0IGNyZWF0ZWQgZGF0ZS5cbiAqIEBhcGlTdWNjZXNzIHtTdHJpbmd9IHByb2R1Y3QudXBkYXRlZEF0IFByb2R1Y3QgdXBkYXRlZCBkYXRlLlxuICpcbiAqXG4gKiBAYXBpUGFyYW0gKExvZ2luKSB7U3RyaW5nfSBwYXNzIE9ubHkgbG9nZ2VkIGluIHVzZXJzIGNhbiBkbyB0aGlzLlxuICpcbiAqIEBhcGlIZWFkZXJFeGFtcGxlIHtqc29ufSBIZWFkZXItRXhhbXBsZTpcbiAqIHtcbiAqICBcIkFVVEhPUklaQVRJT05cIjogXCJKV1QgZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmZhV1FpT2lJMU9UQmhNV0kzT0RBek1ESTNOMk5pTmpReE0ySmhaR1VpTENKcFlYUWlPakUwT1RNNE16UTJNVFo5LlJTbE1GNlJSd0FBTFpRUmRmS3JPWldudUhCay1tUU5uUmNDTEpzYzh6aW9cIlxuICogfVxuICpcbiAqIEBhcGlTdWNjZXNzRXhhbXBsZSBTdWNjZXNzLVJlc3BvbnNlOlxuICpcbiAqIEhUVFAvMS4xIDIwMCBPS1xuICpcbiAqIFtcbiAqIFx0e1xuICpcdFx0XCJfaWRcIjogXCI1OWRjZjcxYmI1ZTFhZDNiMzgzOTU0MzJcIixcbiAqXHRcdFwidXBkYXRlZEF0XCI6IFwiMjAxNy0xMC0xMFQxNjozNjo0My40MzNaXCIsXG4gKlx0XHRcImNyZWF0ZWRBdFwiOiBcIjIwMTctMTAtMTBUMTY6MzY6NDMuNDMzWlwiLFxuICpcdFx0XCJzbHVnXCI6IFwic3lzYWRtaW4tMTAxXCIsXG4gKlx0XHRcInRpdGxlXCI6IFwiU3lzYWRtaW4gMTAxXCIsXG4gKlx0XHRcImRlc2NyaXB0aW9uXCI6IFwiVGhlIG9uZSBhbmQgb25seSBzeXNhZG1pbiBib29rIHlvdSBuZWVkIVwiLFxuICpcdFx0XCJwcmljZVwiOiA0MDAsXG4gKlx0XHRcImN1cnJlbmN5XCI6IFwiU0VLXCIsXG4gKlx0XHRcImltYWdlVXJsXCI6IFwiaHR0cHM6Ly9pbWFnZXMtbmEuc3NsLWltYWdlcy1hbWF6b24uY29tL2ltYWdlcy9JLzYxaVdrUTg3dVRMLl9TWDM4MV9CTzEsMjA0LDIwMywyMDBfLmpwZ1wiLFxuICpcdFx0XCJjYXRlZ29yeVwiOiBcIkJvb2tzXCIsXG4gKlx0XHRcImNyZWF0ZWRCeVwiOiBcImU0OTlmMmY0LTZkOWMtNDQ5ZC05NzUzLTgyODI3YzllNWU1MFwiLFxuICpcdFx0XCJfX3ZcIjogMFxuICpcdH1cbiAqIF1cbiAqXG4gKiBAYXBpRXJyb3JFeGFtcGxlIHtqc29ufVxuICogICAgSFRUUC8xLjEgNDAwIEJhZCBSZXF1ZXN0XG4gKiBAYXBpRXJyb3JFeGFtcGxlIHtqc29ufSBVbmF1dGhvcml6ZWRcbiAqICAgIEhUVFAvMS4xIDQwMSBVbmF1dGhvcml6ZWRcbiAqL1xuZXhwb3J0IGNvbnN0IGdldEFsbFByb2R1Y3RzID0gYXN5bmMgKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gIHRyeSB7XG4gICAgaWYgKHJlcS5xdWVyeS5jYXRlZ29yeSkge1xuICAgICAgY29uc3QgcHJvZHVjdHMgPSBhd2FpdCBQcm9kdWN0LmdldFByb2R1Y3RzQnlDYXRlZ29yeShyZXEucXVlcnkuY2F0ZWdvcnkpO1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoSFRUUFN0YXR1cy5PSykuanNvbihwcm9kdWN0cyk7XG4gICAgfVxuICAgIHJldHVybiByZXMuc3RhdHVzKEhUVFBTdGF0dXMuT0spLmpzb24oYXdhaXQgUHJvZHVjdC5maW5kKCkpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBlcnIuc3RhdHVzID0gSFRUUFN0YXR1cy5CQURfUkVRVUVTVDtcbiAgICBuZXh0KGVycik7XG4gIH1cbn07XG5cbi8vIGV4cG9ydCBjb25zdCBzZWFyY2hQcm9kdWN0cyA9IGFzeW5jIChyZXEsIHJlcywgbmV4dCkgPT4ge1xuLy8gICB0cnkge1xuLy8gICAgIGNvbnN0IHNlYXJjaFRlcm1zID0gcmVxLnF1ZXJ5LnE7XG4vLyAgICAgcmV0dXJuIFByb2R1Y3Quc2VhcmNoKFxuLy8gICAgICAgeyBxdWVyeV9zdHJpbmc6IHsgcXVlcnk6IGAqJHtzZWFyY2hUZXJtc30qYCB9IH0sXG4vLyAgICAgICB7IGh5ZHJhdGU6IHRydWUgfSxcbi8vICAgICAgIChlcnIsIHJlc3VsdHMpID0+IHtcbi8vICAgICAgICAgaWYgKGVycikge1xuLy8gICAgICAgICAgIHRocm93IGVycjtcbi8vICAgICAgICAgfVxuLy8gICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyhIVFRQU3RhdHVzLk9LKS5qc29uKHJlc3VsdHMuaGl0cyk7XG4vLyAgICAgICB9XG4vLyAgICAgKTtcbi8vICAgfSBjYXRjaCAoZXJyKSB7XG4vLyAgICAgZXJyLnN0YXR1cyA9IEhUVFBTdGF0dXMuQkFEX1JFUVVFU1Q7XG4vLyAgICAgbmV4dChlcnIpO1xuLy8gICB9XG4vLyB9O1xuXG4vLyBUT0RPOiBXcml0ZSBhcGlkb2Mgc3BlY1xuZXhwb3J0IGNvbnN0IHVwZGF0ZVByb2R1Y3QgPSBhc3luYyAocmVxLCByZXMsIG5leHQpID0+IHtcbiAgY29uc3QgYm9keSA9IGZpbHRlcmVkQm9keShyZXEuYm9keSwgY29uc3RhbnRzLldISVRFTElTVC5wcm9kdWN0cy51cGRhdGUpO1xuICBjb25zdCBwcm9kdWN0SWQgPSByZXEucGFyYW1zLmlkO1xuICB0cnkge1xuICAgIGlmICghT2JqZWN0SUQuaXNWYWxpZChwcm9kdWN0SWQpKSB7XG4gICAgICByZXR1cm4gcmVzXG4gICAgICAgIC5zdGF0dXMoSFRUUFN0YXR1cy5CQURfUkVRVUVTVClcbiAgICAgICAgLmpzb24oeyBtZXNzYWdlOiAnSW52YWxpZCBNb25nb0RCIE9iamVjdElELicgfSk7XG4gICAgfVxuICAgIGNvbnN0IGN1cnJlbnRQcm9kdWN0ID0gYXdhaXQgUHJvZHVjdC5maW5kQnlJZChwcm9kdWN0SWQpO1xuICAgIC8vIFNldCB0aGUgdXBkYXRlZCBkYXRhXG4gICAgLy8gVE9ETzogUGVyaGFwcyBjaGFuZ2UgdGhlIHdheSB0aGF0IGl0IGlzIHVwZGF0ZWQgd2l0aCBleC4gZmluZEJ5SWRBbmRVcGRhdGVcbiAgICBhd2FpdCBjdXJyZW50UHJvZHVjdC5zZXQoeyAuLi5ib2R5IH0pO1xuICAgIC8vIFNhdmUgdGhlIHVwZGF0ZWQgcHJvZHVjdCBhbmQgc2VuZCBpdCBiYWNrLlxuICAgIHJldHVybiByZXMuc3RhdHVzKEhUVFBTdGF0dXMuT0spLmpzb24oYXdhaXQgY3VycmVudFByb2R1Y3Quc2F2ZSgpKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgZXJyLnN0YXR1cyA9IEhUVFBTdGF0dXMuQkFEX1JFUVVFU1Q7XG4gICAgbmV4dChlcnIpO1xuICB9XG59O1xuLy8gVE9ETzogV3JpdGUgYXBpZG9jIHNwZWNcbmV4cG9ydCBjb25zdCBnZXRTaW5nbGVQcm9kdWN0ID0gYXN5bmMgKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gIGlmIChyZXEucGFyYW1zLmlkKSB7XG4gICAgY29uc3QgcHJvZHVjdElkID0gcmVxLnBhcmFtcy5pZDtcbiAgICB0cnkge1xuICAgICAgaWYgKCFPYmplY3RJRC5pc1ZhbGlkKHByb2R1Y3RJZCkpIHtcbiAgICAgICAgcmV0dXJuIHJlc1xuICAgICAgICAgIC5zdGF0dXMoSFRUUFN0YXR1cy5CQURfUkVRVUVTVClcbiAgICAgICAgICAuanNvbih7IG1lc3NhZ2U6ICdJbnZhbGlkIE1vbmdvREIgT2JqZWN0SUQuJyB9KTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHByb2R1Y3QgPSBhd2FpdCBQcm9kdWN0LmZpbmRCeUlkKHByb2R1Y3RJZCk7XG4gICAgICBpZiAoIXByb2R1Y3QpIHtcbiAgICAgICAgcmV0dXJuIHJlc1xuICAgICAgICAgIC5zdGF0dXMoSFRUUFN0YXR1cy5CQURfUkVRVUVTVClcbiAgICAgICAgICAuanNvbih7IG1lc3NhZ2U6ICdBIHByb2R1Y3Qgd2l0aCB0aGF0IGlkIGNvdWxkIG5vdCBiZSBmb3VuZC4nIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoSFRUUFN0YXR1cy5PSykuanNvbihwcm9kdWN0KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGVyci5zdGF0dXMgPSBIVFRQU3RhdHVzLkJBRF9SRVFVRVNUO1xuICAgICAgbmV4dChlcnIpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChyZXEucXVlcnkuc2x1Zykge1xuICAgIGNvbnN0IHByb2R1Y3RTbHVnID0gcmVxLnF1ZXJ5LnNsdWc7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHByb2R1Y3QgPSBhd2FpdCBQcm9kdWN0LmZpbmQoeyBzbHVnOiBwcm9kdWN0U2x1ZyB9KTtcbiAgICAgIGlmICghcHJvZHVjdCkge1xuICAgICAgICByZXR1cm4gcmVzXG4gICAgICAgICAgLnN0YXR1cyhIVFRQU3RhdHVzLkJBRF9SRVFVRVNUKVxuICAgICAgICAgIC5qc29uKHsgbWVzc2FnZTogJ0EgcHJvZHVjdCB3aXRoIHRoYXQgaWQgY291bGQgbm90IGJlIGZvdW5kLicgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyhIVFRQU3RhdHVzLk9LKS5qc29uKHByb2R1Y3QpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgZXJyLnN0YXR1cyA9IEhUVFBTdGF0dXMuQkFEX1JFUVVFU1Q7XG4gICAgICBuZXh0KGVycik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiByZXNcbiAgICAgIC5zdGF0dXMoSFRUUFN0YXR1cy5CQURfUkVRVUVTVClcbiAgICAgIC5qc29uKHsgbWVzc2FnZTogJ1BsZWFzZSBzcGVjaWZ5IGlkIGFzIGEgcGFyYW0gb3Igc2x1ZyBhcyBhIHF1ZXJ5JyB9KTtcbiAgfVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb250cm9sbGVycy9wcm9kdWN0LmNvbnRyb2xsZXIuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb25nb2RiXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwibW9uZ29kYlwiXG4vLyBtb2R1bGUgaWQgPSA0N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIE9yZGVyIFJvdXRlc1xuICovXG5cbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IHZhbGlkYXRlIGZyb20gJ2V4cHJlc3MtdmFsaWRhdGlvbic7XG5cbmltcG9ydCAqIGFzIE9yZGVyQ29udHJvbGxlciBmcm9tICcuLi9jb250cm9sbGVycy9vcmRlci5jb250cm9sbGVyJztcbmltcG9ydCB7IGF1dGhKd3QgfSBmcm9tICcuLi9zZXJ2aWNlcy9hdXRoJztcblxuY29uc3Qgcm91dGVzID0gbmV3IFJvdXRlcigpO1xuXG5yb3V0ZXNcbiAgLnJvdXRlKCcvJylcbiAgLnBvc3QoXG4gICAgYXV0aEp3dCxcbiAgICB2YWxpZGF0ZShPcmRlckNvbnRyb2xsZXIudmFsaWRhdGlvbiksXG4gICAgT3JkZXJDb250cm9sbGVyLmNyZWF0ZU9yZGVyLFxuICApO1xuXG5leHBvcnQgZGVmYXVsdCByb3V0ZXM7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcm91dGVzL29yZGVyLnJvdXRlcy5qcyIsImltcG9ydCBKb2kgZnJvbSAnam9pJztcbmltcG9ydCBIVFRQU3RhdHVzIGZyb20gJ2h0dHAtc3RhdHVzJztcblxuaW1wb3J0IE9yZGVyIGZyb20gJy4uL21vZGVscy9vcmRlci5tb2RlbC5qcyc7XG5pbXBvcnQgeyBmaWx0ZXJlZEJvZHkgfSBmcm9tICcuLi91dGlscy9maWx0ZXJlZEJvZHknO1xuaW1wb3J0IGNvbnN0YW50cyBmcm9tICcuLi9jb25maWcvY29uc3RhbnRzJztcbmltcG9ydCB7IGNyZWF0ZUNoYXJnZSwgY3JlYXRlQ3VzdG9tZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9wYXltZW50JztcblxuZXhwb3J0IGNvbnN0IHZhbGlkYXRpb24gPSB7XG4gIGNyZWF0ZToge1xuICAgIGJvZHk6IHtcbiAgICAgIGNhcnQ6IEpvaS5vYmplY3QoKS5yZXF1aXJlZCgpLFxuICAgICAgdHJhbnNhY3Rpb25faWQ6IEpvaS5zdHJpbmcoKS5ndWlkKHsgdmVyc2lvbjogJ3V1aWR2NCcgfSksXG4gICAgICBzaGlwcGluZ19hZGRyZXNzOiBKb2kub2JqZWN0KCkucmVxdWlyZWQoKSxcbiAgICAgIGJpbGxpbmdfYWRkcmVzczogSm9pLm9iamVjdCgpLnJlcXVpcmVkKCksXG4gICAgICBzdHJpcGVUb2tlbjogSm9pLnN0cmluZygpLnJlcXVpcmVkKCksXG4gICAgICBjdXJyZW5jeTogSm9pLnN0cmluZygpLnJlcXVpcmVkKCksXG4gICAgfSxcbiAgfSxcbn07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVPcmRlciA9IGFzeW5jIChyZXEsIHJlcywgbmV4dCkgPT4ge1xuICBjb25zdCBib2R5ID0gZmlsdGVyZWRCb2R5KHJlcS5ib2R5LCBjb25zdGFudHMuV0hJVEVMSVNULm9yZGVycy5jcmVhdGUpO1xuICB0cnkge1xuICAgIGNvbnN0IG9yZGVyID0gYXdhaXQgT3JkZXIuY3JlYXRlT3JkZXIoe1xuICAgICAgLi4uYm9keSxcbiAgICAgIGNyZWF0ZWRfYnk6IHJlcS51c2VyLnVzZXJ1dWlkLFxuICAgIH0pO1xuICAgIGxldCBjdXN0b21lcklkID0gcmVxLnVzZXIuc3RyaXBlX2N1c3RvbWVyX2lkO1xuICAgIGlmICghY3VzdG9tZXJJZCkge1xuICAgICAgY3VzdG9tZXJJZCA9IGF3YWl0IGNyZWF0ZUN1c3RvbWVyKHJlcS51c2VyLnVzZXJ1dWlkLCB7XG4gICAgICAgIGVtYWlsOiByZXEudXNlci5lbWFpbCxcbiAgICAgICAgc291cmNlOiBib2R5LnN0cmlwZVRva2VuLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGF3YWl0IGNyZWF0ZUNoYXJnZShyZXEudXNlci51c2VydXVpZCwge1xuICAgICAgY3VycmVuY3k6IGJvZHkuY3VycmVuY3ksXG4gICAgICBhbW91bnQ6IHBhcnNlRmxvYXQob3JkZXIudG90YWxfcHJpY2UpLFxuICAgICAgY3VzdG9tZXI6IGN1c3RvbWVySWQsXG4gICAgICBvcmRlcl9pZDogb3JkZXIub3JkZXJfaWQsXG4gICAgICBiaWxsaW5nX2FkZHJlc3M6IGJvZHkuYmlsbGluZ19hZGRyZXNzLFxuICAgIH0pO1xuICAgIHJldHVybiByZXNcbiAgICAgIC5zdGF0dXMoSFRUUFN0YXR1cy5DUkVBVEVEKVxuICAgICAgLmpzb24oeyBtZXNzYWdlOiAnT3JkZXIgY3JlYXRlZCcsIG9yZGVyIH0pO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBlcnIuc3RhdHVzID0gSFRUUFN0YXR1cy5CQURfUkVRVUVTVDtcbiAgICBuZXh0KGVycik7XG4gIH1cbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29udHJvbGxlcnMvb3JkZXIuY29udHJvbGxlci5qcyIsImltcG9ydCBTUUwgZnJvbSAnc3FsLXRlbXBsYXRlLXN0cmluZ3MnO1xuaW1wb3J0IHV1aWR2NCBmcm9tICd1dWlkL3Y0JztcbmltcG9ydCBtb25nb29zZSBmcm9tICdtb25nb29zZSc7XG5cbmltcG9ydCB7IGRiIH0gZnJvbSAnLi4vY29uZmlnL2RhdGFiYXNlJztcbmltcG9ydCBQcm9kdWN0IGZyb20gJy4vcHJvZHVjdC5tb2RlbCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgYXN5bmMgY3JlYXRlT3JkZXIoZGF0YSkge1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCB2YWxpZGF0ZU9yZGVyRGF0YShkYXRhKTtcbiAgICAgIGNvbnN0IG9yZGVySWQgPSB1dWlkdjQoKTtcbiAgICAgIGNvbnN0IGNhcnQgPSBkYXRhLmNhcnQ7XG4gICAgICBsZXQgdG90YWxQcmljZSA9IDA7XG4gICAgICBjb25zdCBwcm9kdWN0SWRzID0gW107XG4gICAgICBPYmplY3Qua2V5cyhjYXJ0KS5mb3JFYWNoKHByb2R1Y3RJZCA9PiB7XG4gICAgICAgIHByb2R1Y3RJZHMucHVzaChwcm9kdWN0SWQpO1xuICAgICAgfSk7XG4gICAgICBjb25zdCBwcm9kdWN0cyA9IGF3YWl0IFByb2R1Y3QuZmluZCh7XG4gICAgICAgIF9pZDogeyAkaW46IHByb2R1Y3RJZHMubWFwKGlkID0+IG1vbmdvb3NlLlR5cGVzLk9iamVjdElkKGlkKSkgfSxcbiAgICAgIH0pO1xuICAgICAgcHJvZHVjdHMubWFwKFxuICAgICAgICBwcm9kdWN0ID0+ICh0b3RhbFByaWNlICs9IGNhcnRbcHJvZHVjdC5faWRdLnF0eSAqIHByb2R1Y3QucHJpY2UpLFxuICAgICAgKTtcbiAgICAgIC8vIGRiLnR4KHQgPT4ge1xuICAgICAgLy8gICBjb25zdCBxMSA9IHQub25lKFNRTGBcbiAgICAgIC8vICAgICBJTlNFUlQgSU5UTyBvcmRlcnNcbiAgICAgIC8vICAgICAob3JkZXJfaWQsIGNyZWF0ZWRfYnksIGNhcnQsIHRvdGFsX3ByaWNlLCB0cmFuc2FjdGlvbl9pZCwgc2hpcHBpbmdfYWRkcmVzcylcbiAgICAgIC8vICAgICBWQUxVRVMgKFxuICAgICAgLy8gICAgICAgJHtvcmRlcklkfSxcbiAgICAgIC8vICAgICAgICR7ZGF0YS5jcmVhdGVkX2J5fSxcbiAgICAgIC8vICAgICAgICR7ZGF0YS5jYXJ0fSxcbiAgICAgIC8vICAgICAgICR7dG90YWxQcmljZX0sXG4gICAgICAvLyAgICAgICAke2RhdGEudHJhbnNhY3Rpb25faWR9LFxuICAgICAgLy8gICAgICAgJHtkYXRhLnNoaXBwaW5nX2FkZHJlc3N9XG4gICAgICAvLyAgICAgKVxuICAgICAgLy8gICAgIHJldHVybmluZyBvcmRlcl9pZFxuICAgICAgLy8gICBgKTtcbiAgICAgIC8vICAgY29uc3QgcTIgPSB0Lm5vbmU7XG4gICAgICAvLyB9KTtcbiAgICAgIHJldHVybiBhd2FpdCBkYi5vbmUoU1FMYFxuICAgICAgICBJTlNFUlQgSU5UTyBvcmRlcnNcbiAgICAgICAgKG9yZGVyX2lkLCBjcmVhdGVkX2J5LCBjYXJ0LCB0b3RhbF9wcmljZSwgc2hpcHBpbmdfYWRkcmVzcylcbiAgICAgICAgVkFMVUVTIChcbiAgICAgICAgICAke29yZGVySWR9LFxuICAgICAgICAgICR7ZGF0YS5jcmVhdGVkX2J5fSxcbiAgICAgICAgICAke2RhdGEuY2FydH0sXG4gICAgICAgICAgJHt0b3RhbFByaWNlfSxcbiAgICAgICAgICAke2RhdGEuc2hpcHBpbmdfYWRkcmVzc31cbiAgICAgICAgKVxuICAgICAgICByZXR1cm5pbmcgb3JkZXJfaWQsIHRvdGFsX3ByaWNlXG4gICAgICBgKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IGVycjtcbiAgICB9XG4gIH0sXG5cbiAgYXN5bmMgZ2V0QWxsT3JkZXJzKCkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gYXdhaXQgZGIuYW55KFNRTGBcbiAgICAgICAgU0VMRUNUICogRlJPTSBvcmRlcnNcbiAgICAgIGApO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgfSxcblxuICBhc3luYyBnZXRPcmRlcihvcmRlcklkKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBhd2FpdCBkYi5vbmUoU1FMYFxuICAgICAgICBTRUxFQ1QgKiBGUk9NIG9yZGVyc1xuICAgICAgICBXSEVSRSBvcmRlcl9pZCA9ICR7b3JkZXJJZH1cbiAgICAgIGApO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgfSxcbn07XG5cbi8vIFRPRE86IFdyaXRlIGEgdXRpbGl0eSBmb3IgdGhpcyBmdW5jdGlvbiBiZWNhdXNlIGl0IGlzIHJlcGVhdGluZyBpbiBldmVyeSBtb2RlbC5cbmZ1bmN0aW9uIHZhbGlkYXRlT3JkZXJEYXRhKGRhdGEpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCByZXF1aXJlZEZpZWxkcyA9IFsnY2FydCcsICdjcmVhdGVkX2J5JywgJ3NoaXBwaW5nX2FkZHJlc3MnXTtcbiAgICBjb25zdCBlcnJvcnMgPSB7fTtcbiAgICByZXF1aXJlZEZpZWxkcy5mb3JFYWNoKGZpZWxkID0+IHtcbiAgICAgIGlmICghZGF0YVtmaWVsZF0pIHtcbiAgICAgICAgZXJyb3JzW2ZpZWxkXSA9ICdGaWVsZCBpcyByZXF1aXJlZCc7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKE9iamVjdC5rZXlzKGVycm9ycykubGVuZ3RoICE9PSAwICYmIGVycm9ycy5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0KSB7XG4gICAgICByZWplY3QoZXJyb3JzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzb2x2ZSgpO1xuICAgIH1cbiAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbW9kZWxzL29yZGVyLm1vZGVsLmpzIiwiaW1wb3J0IHN0cmlwZVBhY2thZ2UgZnJvbSAnc3RyaXBlJztcblxuaW1wb3J0IFVzZXIgZnJvbSAnLi4vbW9kZWxzL3VzZXIubW9kZWwnO1xuaW1wb3J0IFRyYW5zYWN0aW9uIGZyb20gJy4uL21vZGVscy90cmFuc2FjdGlvbi5tb2RlbCc7XG5pbXBvcnQgY29uc3RhbnRzIGZyb20gJy4uL2NvbmZpZy9jb25zdGFudHMnO1xuXG5jb25zdCBzdHJpcGUgPSBzdHJpcGVQYWNrYWdlKGNvbnN0YW50cy5TVFJJUEVfU0VDUkVUKTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUNoYXJnZSh1c2VydXVpZCwgY2hhcmdlRGV0YWlscykge1xuICB0cnkge1xuICAgIGNvbnN0IGNoYXJnZSA9IGF3YWl0IHN0cmlwZS5jaGFyZ2VzLmNyZWF0ZSh7XG4gICAgICBhbW91bnQ6IGNoYXJnZURldGFpbHMuYW1vdW50ICogMTAwLFxuICAgICAgY3VzdG9tZXI6IGNoYXJnZURldGFpbHMuY3VzdG9tZXIsXG4gICAgICBjdXJyZW5jeTogY2hhcmdlRGV0YWlscy5jdXJyZW5jeSxcbiAgICB9KTtcbiAgICByZXR1cm4gYXdhaXQgVHJhbnNhY3Rpb24uY3JlYXRlVHJhbnNhY3Rpb24oe1xuICAgICAgY3JlYXRlZF9ieTogdXNlcnV1aWQsXG4gICAgICBhbW91bnQ6IGNoYXJnZURldGFpbHMuYW1vdW50LFxuICAgICAgY3VycmVuY3k6IGNoYXJnZURldGFpbHMuY3VycmVuY3ksXG4gICAgICBzdHJpcGVfY3VzdG9tZXJfaWQ6IGNoYXJnZURldGFpbHMuY3VzdG9tZXIsXG4gICAgICBiaWxsaW5nX2FkZHJlc3M6IGNoYXJnZURldGFpbHMuYmlsbGluZ19hZGRyZXNzLFxuICAgICAgc3RyaXBlX2NoYXJnZV9pZDogY2hhcmdlLmlkLFxuICAgICAgb3JkZXJfaWQ6IGNoYXJnZURldGFpbHMub3JkZXJfaWQsXG4gICAgfSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHRocm93IGVycjtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlQ3VzdG9tZXIodXNlcnV1aWQsIGN1c3RvbWVyRGV0YWlscykge1xuICB0cnkge1xuICAgIGNvbnN0IGN1c3RvbWVyID0gYXdhaXQgc3RyaXBlLmN1c3RvbWVycy5jcmVhdGUoe1xuICAgICAgLi4uY3VzdG9tZXJEZXRhaWxzLFxuICAgIH0pO1xuICAgIGF3YWl0IFVzZXIuY3JlYXRlQ3VzdG9tZXIodXNlcnV1aWQsIGN1c3RvbWVyLmlkKTtcbiAgICByZXR1cm4gY3VzdG9tZXIuaWQ7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHRocm93IGVycjtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NlcnZpY2VzL3BheW1lbnQuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzdHJpcGVcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJzdHJpcGVcIlxuLy8gbW9kdWxlIGlkID0gNTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IFNRTCBmcm9tICdzcWwtdGVtcGxhdGUtc3RyaW5ncyc7XG5pbXBvcnQgdXVpZHY0IGZyb20gJ3V1aWQvdjQnO1xuXG5pbXBvcnQgeyBkYiB9IGZyb20gJy4uL2NvbmZpZy9kYXRhYmFzZSc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgYXN5bmMgY3JlYXRlVHJhbnNhY3Rpb24oZGF0YSkge1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCB2YWxpZGFkYXRlVHJhbnNhY3Rpb25EYXRhKGRhdGEpO1xuICAgICAgY29uc3QgdHJhbnNhY3Rpb25JZCA9IHV1aWR2NCgpO1xuICAgICAgY29uc3QgdHJhbnNhY3Rpb24gPSBhd2FpdCBkYi50eChhc3luYyB0ID0+IHtcbiAgICAgICAgY29uc3QgcTEgPSBhd2FpdCB0Lm9uZShTUUxgXG4gICAgICAgICAgU0VMRUNUIG9yZGVyX2lkLCB0b3RhbF9wcmljZSBGUk9NIG9yZGVyc1xuICAgICAgICAgIFdIRVJFIG9yZGVyX2lkID0gJHtkYXRhLm9yZGVyX2lkfVxuICAgICAgICBgKTtcbiAgICAgICAgY29uc3QgcTIgPSBhd2FpdCB0Lm9uZShTUUxgXG4gICAgICAgICAgSU5TRVJUIElOVE8gdHJhbnNhY3Rpb25zXG4gICAgICAgICAgKHRyYW5zYWN0aW9uX2lkLCBjcmVhdGVkX2J5LCBhbW91bnQsIGN1cnJlbmN5LCBzdHJpcGVfY3VzdG9tZXJfaWQsIHN0cmlwZV9jaGFyZ2VfaWQsIG9yZGVyX2lkLCBiaWxsaW5nX2FkZHJlc3MpXG4gICAgICAgICAgVkFMVUVTIChcbiAgICAgICAgICAgICR7dHJhbnNhY3Rpb25JZH0sXG4gICAgICAgICAgICAke2RhdGEuY3JlYXRlZF9ieX0sXG4gICAgICAgICAgICAke3BhcnNlRmxvYXQocTEudG90YWxfcHJpY2UpfSxcbiAgICAgICAgICAgICR7ZGF0YS5jdXJyZW5jeX0sXG4gICAgICAgICAgICAke2RhdGEuc3RyaXBlX2N1c3RvbWVyX2lkfSxcbiAgICAgICAgICAgICR7ZGF0YS5zdHJpcGVfY2hhcmdlX2lkfSxcbiAgICAgICAgICAgICR7cTEub3JkZXJfaWR9LFxuICAgICAgICAgICAgJHtkYXRhLmJpbGxpbmdfYWRkcmVzc31cbiAgICAgICAgICApXG4gICAgICAgICAgcmV0dXJuaW5nIHRyYW5zYWN0aW9uX2lkXG4gICAgICAgIGApO1xuICAgICAgICBjb25zdCBxMyA9IHQubm9uZShTUUxgXG4gICAgICAgICAgVVBEQVRFIG9yZGVyc1xuICAgICAgICAgIFNFVCB0cmFuc2FjdGlvbl9pZCA9ICR7cTIudHJhbnNhY3Rpb25faWR9XG4gICAgICAgICAgV0hFUkUgb3JkZXJfaWQgPSAke3ExLm9yZGVyX2lkfVxuICAgICAgICBgKTtcbiAgICAgICAgcmV0dXJuIHQuYmF0Y2goW3ExLCBxMiwgcTNdKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRyYW5zYWN0aW9uO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgfSxcbn07XG5cbmZ1bmN0aW9uIHZhbGlkYWRhdGVUcmFuc2FjdGlvbkRhdGEoZGF0YSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IHJlcXVpcmVkRmllbGRzID0gW1xuICAgICAgJ2NyZWF0ZWRfYnknLFxuICAgICAgJ2Ftb3VudCcsXG4gICAgICAnY3VycmVuY3knLFxuICAgICAgJ3N0cmlwZV9jdXN0b21lcl9pZCcsXG4gICAgICAnc3RyaXBlX2NoYXJnZV9pZCcsXG4gICAgICAnb3JkZXJfaWQnLFxuICAgICAgJ2JpbGxpbmdfYWRkcmVzcycsXG4gICAgXTtcbiAgICBjb25zdCBlcnJvcnMgPSB7fTtcbiAgICByZXF1aXJlZEZpZWxkcy5mb3JFYWNoKGZpZWxkID0+IHtcbiAgICAgIGlmICghZGF0YVtmaWVsZF0pIHtcbiAgICAgICAgZXJyb3JzW2ZpZWxkXSA9ICdGaWVsZCBpcyByZXF1aXJlZCc7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKE9iamVjdC5rZXlzKGVycm9ycykubGVuZ3RoICE9PSAwICYmIGVycm9ycy5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0KSB7XG4gICAgICByZWplY3QoZXJyb3JzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzb2x2ZSgpO1xuICAgIH1cbiAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbW9kZWxzL3RyYW5zYWN0aW9uLm1vZGVsLmpzIiwiLyoqXG4gKiBQb3N0IFJvdXRlc1xuICovXG5cbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IHZhbGlkYXRlIGZyb20gJ2V4cHJlc3MtdmFsaWRhdGlvbic7XG5cbmltcG9ydCAqIGFzIFBvc3RDb250cm9sbGVyIGZyb20gJy4uL2NvbnRyb2xsZXJzL3Bvc3QuY29udHJvbGxlcic7XG5pbXBvcnQgeyBhdXRoSnd0IH0gZnJvbSAnLi4vc2VydmljZXMvYXV0aCc7XG5cbmNvbnN0IHJvdXRlcyA9IG5ldyBSb3V0ZXIoKTtcblxuLyoqXG4gKiBDUlVEXG4gKi9cbnJvdXRlcy5nZXQoJy8nLCBhdXRoSnd0LCBQb3N0Q29udHJvbGxlci5nZXRMaXN0KTtcbnJvdXRlcy5nZXQoJy86aWQnLCBhdXRoSnd0LCBQb3N0Q29udHJvbGxlci5nZXRCeUlkKTtcbnJvdXRlcy5wb3N0KFxuICAnLycsXG4gIGF1dGhKd3QsXG4gIHZhbGlkYXRlKFBvc3RDb250cm9sbGVyLnZhbGlkYXRpb24uY3JlYXRlKSxcbiAgUG9zdENvbnRyb2xsZXIuY3JlYXRlLFxuKTtcbnJvdXRlcy5wYXRjaChcbiAgJy86aWQnLFxuICBhdXRoSnd0LFxuICB2YWxpZGF0ZShQb3N0Q29udHJvbGxlci52YWxpZGF0aW9uLnVwZGF0ZSksXG4gIFBvc3RDb250cm9sbGVyLnVwZGF0ZVBvc3QsXG4pO1xucm91dGVzLmRlbGV0ZSgnLzppZCcsIGF1dGhKd3QsIFBvc3RDb250cm9sbGVyLmRlbGV0ZVBvc3QpO1xuXG4vKipcbiAqIEZhdm9yaXRlc1xuICovXG5yb3V0ZXMucG9zdCgnLzppZC9mYXZvcml0ZScsIGF1dGhKd3QsIFBvc3RDb250cm9sbGVyLmZhdm9yaXRlUG9zdCk7XG5cbmV4cG9ydCBkZWZhdWx0IHJvdXRlcztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9yb3V0ZXMvcG9zdC5yb3V0ZXMuanMiLCIvKipcbiAqIFBvc3QgQ29udHJvbGxlclxuICovXG5cbmltcG9ydCBKb2kgZnJvbSAnam9pJztcbmltcG9ydCBIVFRQU3RhdHVzIGZyb20gJ2h0dHAtc3RhdHVzJztcbmltcG9ydCBjb250YW50cyBmcm9tICcuLi9jb25maWcvY29uc3RhbnRzJztcblxuaW1wb3J0IHsgZmlsdGVyZWRCb2R5IH0gZnJvbSAnLi4vdXRpbHMvZmlsdGVyZWRCb2R5JztcbmltcG9ydCBQb3N0IGZyb20gJy4uL21vZGVscy9wb3N0Lm1vZGVsJztcbmltcG9ydCBVc2VyIGZyb20gJy4uL21vZGVscy91c2VyLm1vZGVsJztcblxuZXhwb3J0IGNvbnN0IHZhbGlkYXRpb24gPSB7XG4gIGNyZWF0ZToge1xuICAgIGJvZHk6IHtcbiAgICAgIHRpdGxlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLm1pbigzKVxuICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgIHRleHQ6IEpvaS5zdHJpbmcoKS5yZXF1aXJlZCgpLFxuICAgIH0sXG4gIH0sXG4gIHVwZGF0ZToge1xuICAgIGJvZHk6IHtcbiAgICAgIHRpdGxlOiBKb2kuc3RyaW5nKCkubWluKDMpLFxuICAgICAgdGV4dDogSm9pLnN0cmluZygpLFxuICAgIH0sXG4gIH0sXG59O1xuXG4vKipcbiAqIEBhcGkge2dldH0gL3Bvc3RzIEdldCBwb3N0c1xuICogQGFwaURlc2NyaXB0aW9uIEdldCBhIGxpc3Qgb2YgcG9zdHNcbiAqIEBhcGlOYW1lIGdldExpc3RPZlBvc3RcbiAqIEBhcGlHcm91cCBQb3N0XG4gKlxuICogQGFwaUhlYWRlciB7QXV0aG9yaXphdGlvbn0gQXV0aG9yaXphdGlvbiBKV1QgVG9rZW5cbiAqXG4gKiBAYXBpUGFyYW0gKHF1ZXJ5KSB7SW50fSBza2lwIE51bWJlciBvZiBza2lwIHBvc3RzXG4gKiBAYXBpUGFyYW0gKHF1ZXJ5KSB7SW50fSBsaW1pdCBNYXhpbXVtIG51bWJlciBvZiBwb3N0c1xuICpcbiAqIEBhcGlTdWNjZXNzIHtOdW1iZXJ9IHN0YXR1cyBTdGF0dXMgb2YgdGhlIFJlcXVlc3QuXG4gKiBAYXBpU3VjY2VzcyB7T2JqZWN0W119IHBvc3QgUG9zdCBsaXN0LlxuICogQGFwaVN1Y2Nlc3Mge1N0cmluZ30gcG9zdC5faWQgUG9zdCBfaWQuXG4gKiBAYXBpU3VjY2VzcyB7U3RyaW5nfSBwb3N0LnRpdGxlIFBvc3QgdGl0bGUuXG4gKiBAYXBpU3VjY2VzcyB7U3RyaW5nfSBwb3N0LnRleHQgUG9zdCB0ZXh0LlxuICogQGFwaVN1Y2Nlc3Mge09iamVjdH0gcG9zdC5hdXRob3IgUG9zdCBhdXRob3IuXG4gKiBAYXBpU3VjY2VzcyB7U3RyaW5nfSBwb3N0LmF1dGhvci5faWQgUG9zdCBhdXRob3IgX2lkLlxuICogQGFwaVN1Y2Nlc3Mge1N0cmluZ30gcG9zdC5hdXRob3IudXNlcm5hbWUgUG9zdCBhdXRob3IgdXNlcm5hbWUuXG4gKiBAYXBpU3VjY2VzcyB7U3RyaW5nfSBwb3N0LmNyZWF0ZWRBdCBQb3N0IGNyZWF0ZWQgZGF0ZS5cbiAqXG4gKlxuICogQGFwaVBhcmFtIChMb2dpbikge1N0cmluZ30gcGFzcyBPbmx5IGxvZ2dlZCBpbiB1c2VycyBjYW4gZG8gdGhpcy5cbiAqXG4gKiBAYXBpSGVhZGVyRXhhbXBsZSB7anNvbn0gSGVhZGVyLUV4YW1wbGU6XG4gKiB7XG4gKiAgXCJBVVRIT1JJWkFUSU9OXCI6IFwiSldUIGV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpmYVdRaU9pSTFPVEJoTVdJM09EQXpNREkzTjJOaU5qUXhNMkpoWkdVaUxDSnBZWFFpT2pFME9UTTRNelEyTVRaOS5SU2xNRjZSUndBQUxaUVJkZktyT1pXbnVIQmstbVFOblJjQ0xKc2M4emlvXCJcbiAqIH1cbiAqXG4gKiBAYXBpU3VjY2Vzc0V4YW1wbGUgU3VjY2Vzcy1SZXNwb25zZTpcbiAqXG4gKiBIVFRQLzEuMSAyMDAgT0tcbiAqXG4gKiBbXG4gKiAge1xuICogICAgX2lkOiAnMTIzJyxcbiAqICAgIHRpdGxlOiAnTmV3IHRpdGxlIDEnLFxuICogICAgdGV4dDogJ05ldyB0ZXh0IDEnLFxuICogICAgY3JlYXRlZEF0OiAnMjAxNy0wNS0wMycsXG4gKiAgICBhdXRob3I6IHtcbiAqICAgICAgX2lkOiAnMTIzMzEyJyxcbiAqICAgICAgdXNlcm5hbWU6ICdKb24nXG4gKiAgICB9XG4gKiAgfSxcbiAqICB7XG4gKiAgICBfaWQ6ICcxMjIzNCcsXG4gKiAgICB0aXRsZTogJ05ldyB0aXRsZSAyJyxcbiAqICAgIHRleHQ6ICdOZXcgdGV4dCAyJyxcbiAqICAgIGNyZWF0ZWRBdDogJzIwMTctMDUtMDMnLFxuICogICAgYXV0aG9yOiB7XG4gKiAgICAgIF9pZDogJzEyMzMxMjIzNCcsXG4gKiAgICAgIHVzZXJuYW1lOiAnSm9uJ1xuICogICAgfVxuICogIH1cbiAqIF1cbiAqXG4gKiBAYXBpRXJyb3JFeGFtcGxlIHtqc29ufSBQb3N0IG5vdCBmb3VuZFxuICogICAgSFRUUC8xLjEgNDA0IE5vdCBGb3VuZFxuICogQGFwaUVycm9yRXhhbXBsZSB7anNvbn0gVW5hdXRob3JpemVkXG4gKiAgICBIVFRQLzEuMSA0MDEgVW5hdXRob3JpemVkXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRMaXN0KHJlcSwgcmVzLCBuZXh0KSB7XG4gIHRyeSB7XG4gICAgY29uc3QgcHJvbWlzZSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgIFVzZXIuZmluZEJ5SWQocmVxLnVzZXIuX2lkKSxcbiAgICAgIFBvc3QubGlzdCh7IHNraXA6IHJlcS5xdWVyeS5za2lwLCBsaW1pdDogcmVxLnF1ZXJ5LmxpbWl0IH0pLFxuICAgIF0pO1xuXG4gICAgY29uc3QgcG9zdHNXaXRoRmF2b3JpdGUgPSBwcm9taXNlWzFdLnJlZHVjZSgoYXJyLCBwb3N0KSA9PiB7XG4gICAgICBjb25zdCBmYXZvcml0ZSA9IHByb21pc2VbMF0uX2Zhdm9yaXRlcy5pc1Bvc3RJc0Zhdm9yaXRlKHBvc3QuX2lkKTtcbiAgICAgIGFyci5wdXNoKHtcbiAgICAgICAgLi4ucG9zdC50b0pTT04oKSxcbiAgICAgICAgZmF2b3JpdGUsXG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGFycjtcbiAgICB9LCBbXSk7XG5cbiAgICByZXR1cm4gcmVzLnN0YXR1cyhIVFRQU3RhdHVzLk9LKS5qc29uKHBvc3RzV2l0aEZhdm9yaXRlKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgZXJyLnN0YXR1cyA9IEhUVFBTdGF0dXMuQkFEX1JFUVVFU1Q7XG4gICAgcmV0dXJuIG5leHQoZXJyKTtcbiAgfVxufVxuXG4vKipcbiAqIEBhcGkge2dldH0gL3Bvc3RzLzppZCBHZXQgYSBzaW5nbGUgcG9zdFxuICogQGFwaURlc2NyaXB0aW9uIEdldCBhIHNpbmdsZSBwb3N0XG4gKiBAYXBpTmFtZSBnZXRQb3N0XG4gKiBAYXBpR3JvdXAgUG9zdFxuICpcbiAqIEBhcGlIZWFkZXIge0F1dGhvcml6YXRpb259IEF1dGhvcml6YXRpb24gSldUIFRva2VuXG4gKlxuICogQGFwaVN1Y2Nlc3Mge051bWJlcn0gc3RhdHVzIFN0YXR1cyBvZiB0aGUgUmVxdWVzdC5cbiAqIEBhcGlTdWNjZXNzIHtPYmplY3R9IHBvc3QgUG9zdCBjcmVhdGVkLlxuICogQGFwaVN1Y2Nlc3Mge1N0cmluZ30gcG9zdC5faWQgUG9zdCBfaWQuXG4gKiBAYXBpU3VjY2VzcyB7U3RyaW5nfSBwb3N0LnRpdGxlIFBvc3QgdGl0bGUuXG4gKiBAYXBpU3VjY2VzcyB7U3RyaW5nfSBwb3N0LnRleHQgUG9zdCB0ZXh0LlxuICogQGFwaVN1Y2Nlc3Mge09iamVjdH0gcG9zdC5hdXRob3IgUG9zdCBhdXRob3IuXG4gKiBAYXBpU3VjY2VzcyB7U3RyaW5nfSBwb3N0LmF1dGhvci5faWQgQXV0aG9yIGlkLlxuICogQGFwaVN1Y2Nlc3Mge1N0cmluZ30gcG9zdC5hdXRob3IudXNlcm5hbWUgQXV0aG9yIHVzZXJuYW1lLlxuICogQGFwaVN1Y2Nlc3Mge1N0cmluZ30gcG9zdC5jcmVhdGVkQXQgUG9zdCBjcmVhdGVkIGRhdGUuXG4gKiBAYXBpU3VjY2VzcyB7Qm9vbGVhbn0gZmF2b3JpdGUgVXNlciBoYXZlIGZhdm9yaXRlIHBvc3RcbiAqXG4gKiBAYXBpUGFyYW0gKExvZ2luKSB7U3RyaW5nfSBwYXNzIE9ubHkgbG9nZ2VkIGluIHVzZXJzIGNhbiBkbyB0aGlzLlxuICpcbiAqIEBhcGlIZWFkZXJFeGFtcGxlIHtqc29ufSBIZWFkZXItRXhhbXBsZTpcbiAqIHtcbiAqICBcIkFVVEhPUklaQVRJT05cIjogXCJKV1QgZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmZhV1FpT2lJMU9UQmhNV0kzT0RBek1ESTNOMk5pTmpReE0ySmhaR1VpTENKcFlYUWlPakUwT1RNNE16UTJNVFo5LlJTbE1GNlJSd0FBTFpRUmRmS3JPWldudUhCay1tUU5uUmNDTEpzYzh6aW9cIlxuICogfVxuICpcbiAqIEBhcGlTdWNjZXNzRXhhbXBsZSBTdWNjZXNzLVJlc3BvbnNlOlxuICpcbiAqIEhUVFAvMS4xIDIwMCBPS1xuICpcbiAqIHtcbiAqICBfaWQ6ICcxMjMnLFxuICogIHRpdGxlOiAnYSB0aXRsZScsXG4gKiAgdGV4dDogJ2EgdGV4dCcsXG4gKiAgY3JlYXRlZEF0OiAnMjAxNy0wNS0wMycsXG4gKiAgYXV0aG9yOiB7XG4gKiAgICBfaWQ6ICcxMjMzMTInLFxuICogICAgdXNlcm5hbWU6ICdKb24nXG4gKiAgfSxcbiAqICBmYXZvcml0ZTogdHJ1ZVxuICogfVxuICpcbiAqIEBhcGlFcnJvckV4YW1wbGUge2pzb259IFBvc3Qgbm90IGZvdW5kXG4gKiAgICBIVFRQLzEuMSA0MDQgTm90IEZvdW5kXG4gKiBAYXBpRXJyb3JFeGFtcGxlIHtqc29ufSBVbmF1dGhvcml6ZWRcbiAqICAgIEhUVFAvMS4xIDQwMSBVbmF1dGhvcml6ZWRcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEJ5SWQocmVxLCByZXMsIG5leHQpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBwcm9taXNlID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgVXNlci5maW5kQnlJZChyZXEudXNlci5faWQpLFxuICAgICAgUG9zdC5maW5kQnlJZChyZXEucGFyYW1zLmlkKS5wb3B1bGF0ZSgnYXV0aG9yJyksXG4gICAgXSk7XG4gICAgY29uc3QgZmF2b3JpdGUgPSBwcm9taXNlWzBdLl9mYXZvcml0ZXMuaXNQb3N0SXNGYXZvcml0ZShyZXEucGFyYW1zLmlkKTtcbiAgICByZXR1cm4gcmVzLnN0YXR1cyhIVFRQU3RhdHVzLk9LKS5qc29uKHtcbiAgICAgIC4uLnByb21pc2VbMV0udG9KU09OKCksXG4gICAgICBmYXZvcml0ZSxcbiAgICB9KTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgZXJyLnN0YXR1cyA9IEhUVFBTdGF0dXMuQkFEX1JFUVVFU1Q7XG4gICAgcmV0dXJuIG5leHQoZXJyKTtcbiAgfVxufVxuXG4vKipcbiAqIEBhcGkge3Bvc3R9IC9wb3N0cyBDcmVhdGUgYSBwb3N0XG4gKiBAYXBpRGVzY3JpcHRpb24gQ3JlYXRlIGEgcG9zdFxuICogQGFwaU5hbWUgY3JlYXRlUG9zdFxuICogQGFwaUdyb3VwIFBvc3RcbiAqXG4gKiBAYXBpUGFyYW0gKEJvZHkpIHtTdHJpbmd9IHRpdGxlIFBvc3QgdGl0bGUuXG4gKiBAYXBpUGFyYW0gKEJvZHkpIHtTdHJpbmd9IHRleHQgUG9zdCB0ZXh0LlxuICpcbiAqIEBhcGlIZWFkZXIge0F1dGhvcml6YXRpb259IEF1dGhvcml6YXRpb24gSldUIFRva2VuXG4gKlxuICogQGFwaVN1Y2Nlc3Mge051bWJlcn0gc3RhdHVzIFN0YXR1cyBvZiB0aGUgUmVxdWVzdC5cbiAqIEBhcGlTdWNjZXNzIHtPYmplY3R9IHBvc3QgUG9zdCBjcmVhdGVkLlxuICogQGFwaVN1Y2Nlc3Mge1N0cmluZ30gcG9zdC5faWQgUG9zdCBfaWQuXG4gKiBAYXBpU3VjY2VzcyB7U3RyaW5nfSBwb3N0LnRpdGxlIFBvc3QgdGl0bGUuXG4gKiBAYXBpU3VjY2VzcyB7U3RyaW5nfSBwb3N0LnRleHQgUG9zdCB0ZXh0LlxuICogQGFwaVN1Y2Nlc3Mge1N0cmluZ30gcG9zdC5hdXRob3IgUG9zdCBhdXRob3IgaWQuXG4gKiBAYXBpU3VjY2VzcyB7U3RyaW5nfSBwb3N0LmNyZWF0ZWRBdCBQb3N0IGNyZWF0ZWQgZGF0ZS5cbiAqXG4gKiBAYXBpUGFyYW0gKExvZ2luKSB7U3RyaW5nfSBwYXNzIE9ubHkgbG9nZ2VkIGluIHVzZXJzIGNhbiBkbyB0aGlzLlxuICpcbiAqIEBhcGlIZWFkZXJFeGFtcGxlIHtqc29ufSBIZWFkZXItRXhhbXBsZTpcbiAqIHtcbiAqICBcIkFVVEhPUklaQVRJT05cIjogXCJKV1QgZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmZhV1FpT2lJMU9UQmhNV0kzT0RBek1ESTNOMk5pTmpReE0ySmhaR1VpTENKcFlYUWlPakUwT1RNNE16UTJNVFo5LlJTbE1GNlJSd0FBTFpRUmRmS3JPWldudUhCay1tUU5uUmNDTEpzYzh6aW9cIlxuICogfVxuICpcbiAqIEBhcGlTdWNjZXNzRXhhbXBsZSBTdWNjZXNzLVJlc3BvbnNlOlxuICpcbiAqIEhUVFAvMS4xIDIwMCBPS1xuICpcbiAqIHtcbiAqICBfaWQ6ICcxMjMnLFxuICogIHRpdGxlOiAnYSB0aXRsZScsXG4gKiAgdGV4dDogJ2EgdGV4dCcsXG4gKiAgY3JlYXRlZEF0OiAnMjAxNy0wNS0wMycsXG4gKiAgYXV0aG9yOiAnMTIzMzEyJ1xuICogfVxuICpcbiAqIEBhcGlFcnJvckV4YW1wbGUge2pzb259IFVuYXV0aG9yaXplZFxuICogICAgSFRUUC8xLjEgNDAxIFVuYXV0aG9yaXplZFxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlKHJlcSwgcmVzLCBuZXh0KSB7XG4gIGNvbnN0IGJvZHkgPSBmaWx0ZXJlZEJvZHkocmVxLmJvZHksIGNvbnRhbnRzLldISVRFTElTVC5wb3N0cy5jcmVhdGUpO1xuICB0cnkge1xuICAgIHJldHVybiByZXNcbiAgICAgIC5zdGF0dXMoSFRUUFN0YXR1cy5DUkVBVEVEKVxuICAgICAgLmpzb24oYXdhaXQgUG9zdC5jcmVhdGVQb3N0KGJvZHksIHJlcS51c2VyLl9pZCkpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBlcnIuc3RhdHVzID0gSFRUUFN0YXR1cy5CQURfUkVRVUVTVDtcbiAgICByZXR1cm4gbmV4dChlcnIpO1xuICB9XG59XG5cbi8qKlxuICogQGFwaSB7ZGVsZXRlfSAvcG9zdHMvOmlkIERlbGV0ZSBhIHBvc3RcbiAqIEBhcGlEZXNjcmlwdGlvbiBEZWxldGUgYSBwb3N0IGlmIHRoZSBhdXRob3IgaXQncyB0aGUgcmlnaHQgb25lXG4gKiBAYXBpTmFtZSBkZWxldGVQb3N0XG4gKiBAYXBpR3JvdXAgUG9zdFxuICpcbiAqIEBhcGlIZWFkZXIge0F1dGhvcml6YXRpb259IEF1dGhvcml6YXRpb24gSldUIFRva2VuXG4gKlxuICogQGFwaVBhcmFtIHtTdHJpbmd9IGlkIFBvc3QgdW5pcXVlIElELlxuICpcbiAqIEBhcGlQYXJhbSAoTG9naW4pIHtTdHJpbmd9IHBhc3MgT25seSBsb2dnZWQgaW4gdXNlcnMgY2FuIGRvIHRoaXMuXG4gKlxuICogQGFwaVN1Y2Nlc3Mge051bWJlcn0gc3RhdHVzIFN0YXR1cyBvZiB0aGUgUmVxdWVzdC5cbiAqXG4gKiBAYXBpSGVhZGVyRXhhbXBsZSB7anNvbn0gSGVhZGVyLUV4YW1wbGU6XG4gKiB7XG4gKiAgXCJBVVRIT1JJWkFUSU9OXCI6IFwiSldUIGV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpmYVdRaU9pSTFPVEJoTVdJM09EQXpNREkzTjJOaU5qUXhNMkpoWkdVaUxDSnBZWFFpT2pFME9UTTRNelEyTVRaOS5SU2xNRjZSUndBQUxaUVJkZktyT1pXbnVIQmstbVFOblJjQ0xKc2M4emlvXCJcbiAqIH1cbiAqXG4gKiBAYXBpU3VjY2Vzc0V4YW1wbGUgU3VjY2Vzcy1SZXNwb25zZTpcbiAqXG4gKiBIVFRQLzEuMSAyMDAgT0tcbiAqXG4gKiAyMDBcbiAqXG4gKiBAYXBpRXJyb3JFeGFtcGxlIHtqc29ufSBQb3N0IG5vdCBmb3VuZFxuICogICAgSFRUUC8xLjEgNDA0IE5vdCBGb3VuZFxuICogQGFwaUVycm9yRXhhbXBsZSB7anNvbn0gVW5hdXRob3JpemVkXG4gKiAgICBIVFRQLzEuMSA0MDEgVW5hdXRob3JpemVkXG4gKlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVsZXRlUG9zdChyZXEsIHJlcywgbmV4dCkge1xuICB0cnkge1xuICAgIGNvbnN0IHBvc3QgPSBhd2FpdCBQb3N0LmZpbmRCeUlkKHJlcS5wYXJhbXMuaWQpO1xuXG4gICAgaWYgKHBvc3QuYXV0aG9yLnRvU3RyaW5nKCkgIT09IHJlcS51c2VyLl9pZC50b1N0cmluZygpKSB7XG4gICAgICByZXR1cm4gcmVzLnNlbmRTdGF0dXMoSFRUUFN0YXR1cy5VTkFVVEhPUklaRUQpO1xuICAgIH1cbiAgICBhd2FpdCBwb3N0LnJlbW92ZSgpO1xuICAgIHJldHVybiByZXMuc2VuZFN0YXR1cyhIVFRQU3RhdHVzLk9LKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgZXJyLnN0YXR1cyA9IEhUVFBTdGF0dXMuQkFEX1JFUVVFU1Q7XG4gICAgcmV0dXJuIG5leHQoZXJyKTtcbiAgfVxufVxuXG4vKipcbiAqIEBhcGkge3BhdGNofSAvcG9zdHMvOmlkIFVwZGF0ZSBhIHBvc3RcbiAqIEBhcGlEZXNjcmlwdGlvbiBVcGRhdGUgYSBwb3N0IGlmIHRoZSBhdXRob3IgaXQncyB0aGUgcmlnaHQgb25lXG4gKiBAYXBpTmFtZSB1cGRhdGVQb3N0XG4gKiBAYXBpR3JvdXAgUG9zdFxuICpcbiAqIEBhcGlIZWFkZXIge0F1dGhvcml6YXRpb259IEF1dGhvcml6YXRpb24gSldUIFRva2VuXG4gKlxuICogQGFwaVBhcmFtIHtTdHJpbmd9IGlkIFBvc3QgdW5pcXVlIElELlxuICpcbiAqIEBhcGlQYXJhbSAoQm9keSkge1N0cmluZ30gW3RpdGxlXSBQb3N0IHRpdGxlLlxuICogQGFwaVBhcmFtIChCb2R5KSB7U3RyaW5nfSBbdGV4dF0gUG9zdCB0ZXh0LlxuICpcbiAqIEBhcGlTdWNjZXNzIHtOdW1iZXJ9IHN0YXR1cyBTdGF0dXMgb2YgdGhlIFJlcXVlc3QuXG4gKiBAYXBpU3VjY2VzcyB7T2JqZWN0fSBwb3N0IFBvc3QgdXBkYXRlZC5cbiAqIEBhcGlTdWNjZXNzIHtTdHJpbmd9IHBvc3QuX2lkIFBvc3QgX2lkLlxuICogQGFwaVN1Y2Nlc3Mge1N0cmluZ30gcG9zdC50aXRsZSBQb3N0IHRpdGxlLlxuICogQGFwaVN1Y2Nlc3Mge1N0cmluZ30gcG9zdC50ZXh0IFBvc3QgdGV4dC5cbiAqIEBhcGlTdWNjZXNzIHtTdHJpbmd9IHBvc3QuYXV0aG9yIFBvc3QgYXV0aG9yIGlkLlxuICogQGFwaVN1Y2Nlc3Mge1N0cmluZ30gcG9zdC5jcmVhdGVkQXQgUG9zdCBjcmVhdGVkIGRhdGUuXG4gKlxuICogQGFwaVBhcmFtIChMb2dpbikge1N0cmluZ30gcGFzcyBPbmx5IGxvZ2dlZCBpbiB1c2VycyBjYW4gZG8gdGhpcy5cbiAqXG4gKiBAYXBpSGVhZGVyRXhhbXBsZSB7anNvbn0gSGVhZGVyLUV4YW1wbGU6XG4gKiB7XG4gKiAgXCJBVVRIT1JJWkFUSU9OXCI6IFwiSldUIGV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpmYVdRaU9pSTFPVEJoTVdJM09EQXpNREkzTjJOaU5qUXhNMkpoWkdVaUxDSnBZWFFpT2pFME9UTTRNelEyTVRaOS5SU2xNRjZSUndBQUxaUVJkZktyT1pXbnVIQmstbVFOblJjQ0xKc2M4emlvXCJcbiAqIH1cbiAqXG4gKiBAYXBpU3VjY2Vzc0V4YW1wbGUgU3VjY2Vzcy1SZXNwb25zZTpcbiAqXG4gKiBIVFRQLzEuMSAyMDAgT0tcbiAqXG4gKiB7XG4gKiAgX2lkOiAnMTIzJyxcbiAqICB0aXRsZTogJ05ldyB0aXRsZScsXG4gKiAgdGV4dDogJ05ldyB0ZXh0JyxcbiAqICBjcmVhdGVkQXQ6ICcyMDE3LTA1LTAzJyxcbiAqICBhdXRob3I6ICcxMjMzMTInXG4gKiB9XG4gKlxuICogQGFwaUVycm9yRXhhbXBsZSB7anNvbn0gUG9zdCBub3QgZm91bmRcbiAqICAgIEhUVFAvMS4xIDQwNCBOb3QgRm91bmRcbiAqIEBhcGlFcnJvckV4YW1wbGUge2pzb259IFVuYXV0aG9yaXplZFxuICogICAgSFRUUC8xLjEgNDAxIFVuYXV0aG9yaXplZFxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlUG9zdChyZXEsIHJlcywgbmV4dCkge1xuICBjb25zdCBib2R5ID0gZmlsdGVyZWRCb2R5KHJlcS5ib2R5LCBjb250YW50cy5XSElURUxJU1QucG9zdHMudXBkYXRlKTtcbiAgdHJ5IHtcbiAgICBjb25zdCBwb3N0ID0gYXdhaXQgUG9zdC5maW5kQnlJZChyZXEucGFyYW1zLmlkKTtcblxuICAgIGlmIChwb3N0LmF1dGhvci50b1N0cmluZygpICE9PSByZXEudXNlci5faWQudG9TdHJpbmcoKSkge1xuICAgICAgcmV0dXJuIHJlcy5zZW5kU3RhdHVzKEhUVFBTdGF0dXMuVU5BVVRIT1JJWkVEKTtcbiAgICB9XG5cbiAgICBPYmplY3Qua2V5cyhib2R5KS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBwb3N0W2tleV0gPSBib2R5W2tleV07XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVzLnN0YXR1cyhIVFRQU3RhdHVzLk9LKS5qc29uKGF3YWl0IHBvc3Quc2F2ZSgpKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgZXJyLnN0YXR1cyA9IEhUVFBTdGF0dXMuQkFEX1JFUVVFU1Q7XG4gICAgcmV0dXJuIG5leHQoZXJyKTtcbiAgfVxufVxuXG4vKipcbiAqIEBhcGkge3Bvc3R9IC9wb3N0cy86aWQvZmF2b3JpdGUgRmF2b3JpdGUgYSBwb3N0XG4gKiBAYXBpRGVzY3JpcHRpb24gRmF2b3JpdGUgYSBwb3N0IG9yIHVuZmF2b3JpdGUgaWYgYWxyZWFkeS5cbiAqIEBhcGlOYW1lIGZhdm9yaXRlUG9zdFxuICogQGFwaUdyb3VwIFBvc3RcbiAqXG4gKiBAYXBpSGVhZGVyIHtBdXRob3JpemF0aW9ufSBBdXRob3JpemF0aW9uIEpXVCBUb2tlblxuICpcbiAqIEBhcGlQYXJhbSB7U3RyaW5nfSBpZCBQb3N0IHVuaXF1ZSBJRC5cbiAqXG4gKiBAYXBpU3VjY2VzcyB7TnVtYmVyfSBzdGF0dXMgU3RhdHVzIG9mIHRoZSBSZXF1ZXN0LlxuICpcbiAqIEBhcGlQYXJhbSAoTG9naW4pIHtTdHJpbmd9IHBhc3MgT25seSBsb2dnZWQgaW4gdXNlcnMgY2FuIGRvIHRoaXMuXG4gKlxuICogQGFwaUhlYWRlckV4YW1wbGUge2pzb259IEhlYWRlci1FeGFtcGxlOlxuICoge1xuICogIFwiQVVUSE9SSVpBVElPTlwiOiBcIkpXVCBleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKZmFXUWlPaUkxT1RCaE1XSTNPREF6TURJM04yTmlOalF4TTJKaFpHVWlMQ0pwWVhRaU9qRTBPVE00TXpRMk1UWjkuUlNsTUY2UlJ3QUFMWlFSZGZLck9aV251SEJrLW1RTm5SY0NMSnNjOHppb1wiXG4gKiB9XG4gKlxuICogQGFwaVN1Y2Nlc3NFeGFtcGxlIFN1Y2Nlc3MtUmVzcG9uc2U6XG4gKlxuICogSFRUUC8xLjEgMjAwIE9LXG4gKlxuICogQGFwaUVycm9yRXhhbXBsZSB7anNvbn0gUG9zdCBub3QgZm91bmRcbiAqICAgIEhUVFAvMS4xIDQwNCBOb3QgRm91bmRcbiAqIEBhcGlFcnJvckV4YW1wbGUge2pzb259IFVuYXV0aG9yaXplZFxuICogICAgSFRUUC8xLjEgNDAxIFVuYXV0aG9yaXplZFxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmF2b3JpdGVQb3N0KHJlcSwgcmVzLCBuZXh0KSB7XG4gIHRyeSB7XG4gICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXIuZmluZEJ5SWQocmVxLnVzZXIuX2lkKTtcbiAgICBhd2FpdCB1c2VyLl9mYXZvcml0ZXMucG9zdHMocmVxLnBhcmFtcy5pZCk7XG4gICAgcmV0dXJuIHJlcy5zZW5kU3RhdHVzKEhUVFBTdGF0dXMuT0spO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBlcnIuc3RhdHVzID0gSFRUUFN0YXR1cy5CQURfUkVRVUVTVDtcbiAgICByZXR1cm4gbmV4dChlcnIpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29udHJvbGxlcnMvcG9zdC5jb250cm9sbGVyLmpzIiwiaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnZXhwcmVzcyc7XG5cbmltcG9ydCAqIGFzIFNlZWRDb250cm9sbGVyIGZyb20gJy4uL2NvbnRyb2xsZXJzL3NlZWQuY29udHJvbGxlcic7XG5cbmNvbnN0IHJvdXRlcyA9IG5ldyBSb3V0ZXIoKTtcblxucm91dGVzLmdldCgnL2NsZWFyJywgU2VlZENvbnRyb2xsZXIuY2xlYXJBbGwpO1xucm91dGVzLmdldCgnL3VzZXJzL2NsZWFyJywgU2VlZENvbnRyb2xsZXIuY2xlYXJTZWVkVXNlcnMpO1xucm91dGVzLmdldCgnL3VzZXJzLzpjb3VudD8nLCBTZWVkQ29udHJvbGxlci5zZWVkVXNlcnMpO1xuXG5leHBvcnQgZGVmYXVsdCByb3V0ZXM7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcm91dGVzL3NlZWQucm91dGVzLmpzIiwiLyoqXG4gKiBTZWVkIGNvbnRyb2xsZXIgZm9yIGZpbGwgeW91ciBkYiBvZiBmYWtlIGRhdGFcbiAqL1xuXG5pbXBvcnQgSFRUUFN0YXR1cyBmcm9tICdodHRwLXN0YXR1cyc7XG5cbmltcG9ydCBVc2VyIGZyb20gJy4uL21vZGVscy91c2VyLm1vZGVsJztcbmltcG9ydCBQb3N0IGZyb20gJy4uL21vZGVscy9wb3N0Lm1vZGVsJztcbmltcG9ydCB7IHVzZXJTZWVkLCBkZWxldGVVc2VyU2VlZCB9IGZyb20gJy4uL3NlZWRzL3VzZXIuc2VlZCc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZWVkVXNlcnMocmVxLCByZXMsIG5leHQpIHtcbiAgdHJ5IHtcbiAgICBhd2FpdCB1c2VyU2VlZChyZXEucGFyYW1zLmNvdW50KTtcblxuICAgIHJldHVybiByZXNcbiAgICAgIC5zdGF0dXMoSFRUUFN0YXR1cy5PSylcbiAgICAgIC5zZW5kKGBVc2VyIHNlZWQgc3VjY2VzcyEgQ3JlYXRlZCAke3JlcS5wYXJhbXMuY291bnQgfHwgMTB9IHVzZXJzIWApO1xuICB9IGNhdGNoIChlKSB7XG4gICAgZS5zdGF0dXMgPSBIVFRQU3RhdHVzLkJBRF9SRVFVRVNUO1xuICAgIHJldHVybiBuZXh0KGUpO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjbGVhclNlZWRVc2VycyhyZXEsIHJlcywgbmV4dCkge1xuICB0cnkge1xuICAgIGF3YWl0IGRlbGV0ZVVzZXJTZWVkKCk7XG5cbiAgICByZXR1cm4gcmVzLnN0YXR1cyhIVFRQU3RhdHVzLk9LKS5zZW5kKCdVc2VyIGNvbGxlY3Rpb24gZW1wdHknKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGUuc3RhdHVzID0gSFRUUFN0YXR1cy5CQURfUkVRVUVTVDtcbiAgICByZXR1cm4gbmV4dChlKTtcbiAgfVxufVxuXG4vKipcbiAqIFRha2UgYWxsIHlvdXIgbW9kZWwgYW5kIGNsZWFyIGl0XG4gKlxuICogQHBhcmFtIHthbnl9IHJlcVxuICogQHBhcmFtIHthbnl9IHJlc1xuICogQHBhcmFtIHthbnl9IG5leHRcbiAqIEByZXR1cm5zIHtTdHJpbmd9IEFsbCBjb2xsZWN0aW9ucyBjbGVhclxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2xlYXJBbGwocmVxLCByZXMsIG5leHQpIHtcbiAgdHJ5IHtcbiAgICBhd2FpdCBQcm9taXNlLmFsbChbVXNlci5yZW1vdmUoKSwgUG9zdC5yZW1vdmUoKV0pO1xuXG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoSFRUUFN0YXR1cy5PSykuc2VuZCgnQWxsIGNvbGxlY3Rpb25zIGNsZWFyJyk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBlLnN0YXR1cyA9IEhUVFBTdGF0dXMuQkFEX1JFUVVFU1Q7XG4gICAgcmV0dXJuIG5leHQoZSk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb250cm9sbGVycy9zZWVkLmNvbnRyb2xsZXIuanMiLCJpbXBvcnQgZmFrZXIgZnJvbSAnZmFrZXInO1xuXG5pbXBvcnQgVXNlciBmcm9tICcuLi9tb2RlbHMvdXNlci5tb2RlbCc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1c2VyU2VlZChjb3VudCkge1xuICBjb25zdCB1c2VycyA9IFtdO1xuXG4gIEFycmF5LmZyb20oeyBsZW5ndGg6IGNvdW50IHx8IDEwIH0pLm1hcCgoKSA9PiB7XG4gICAgY29uc3QgZmFrZVVzZXIgPSB7XG4gICAgICBuYW1lOiBgJHtmYWtlci5uYW1lLmZpcnN0TmFtZSgpfSAke2Zha2VyLm5hbWUubGFzdE5hbWUoKX1gLFxuICAgICAgdXNlcm5hbWU6IGZha2VyLmludGVybmV0LnVzZXJOYW1lKCksXG4gICAgICBlbWFpbDogZmFrZXIuaW50ZXJuZXQuZW1haWwoKSxcbiAgICAgIHBhc3N3b3JkOiAncGFzc3dvcmQxJyxcbiAgICB9O1xuICAgIHJldHVybiB1c2Vycy5wdXNoKGZha2VVc2VyKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGF3YWl0IFVzZXIuaW5zZXJ0TWFueSh1c2Vycyk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxldGVVc2VyU2VlZCgpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gYXdhaXQgVXNlci5yZW1vdmUoKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBlO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2VlZHMvdXNlci5zZWVkLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZmFrZXJcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJmYWtlclwiXG4vLyBtb2R1bGUgaWQgPSA1OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIEVycm9yIGhhbmRsZXIgZm9yIGFwaSByb3V0ZXNcbiAqL1xuXG5pbXBvcnQgUmF2ZW4gZnJvbSAncmF2ZW4nO1xuaW1wb3J0IFByZXR0eUVycm9yIGZyb20gJ3ByZXR0eS1lcnJvcic7XG5pbXBvcnQgSFRUUFN0YXR1cyBmcm9tICdodHRwLXN0YXR1cyc7XG5cbmltcG9ydCBjb25zdGFudHMgZnJvbSAnLi4vY29uZmlnL2NvbnN0YW50cyc7XG5pbXBvcnQgQVBJRXJyb3IsIHsgUmVxdWlyZWRFcnJvciB9IGZyb20gJy4vZXJyb3InO1xuXG5jb25zdCBpc1Byb2QgPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nO1xuY29uc3QgaXNEZXYgPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50JztcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsb2dFcnJvclNlcnZpY2UoZXJyLCByZXEsIHJlcywgbmV4dCkge1xuICBpZiAoIWVycikge1xuICAgIHJldHVybiBuZXcgQVBJRXJyb3IoXG4gICAgICAnRXJyb3Igd2l0aCB0aGUgc2VydmVyIScsXG4gICAgICBIVFRQU3RhdHVzLklOVEVSTkFMX1NFUlZFUl9FUlJPUixcbiAgICAgIHRydWUsXG4gICAgKTtcbiAgfVxuXG4gIGlmIChpc1Byb2QpIHtcbiAgICBjb25zdCByYXZlbiA9IG5ldyBSYXZlbi5DbGllbnQoY29uc3RhbnRzLlJBVkVOX0lEKTtcbiAgICByYXZlbi5jYXB0dXJlRXhjZXB0aW9uKGVycik7XG4gIH1cblxuICBpZiAoaXNEZXYpIHtcbiAgICBjb25zdCBwZSA9IG5ldyBQcmV0dHlFcnJvcigpO1xuICAgIHBlLnNraXBOb2RlRmlsZXMoKTtcbiAgICBwZS5za2lwUGFja2FnZSgnZXhwcmVzcycpO1xuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICBjb25zb2xlLmxvZyhwZS5yZW5kZXIoZXJyKSk7XG4gIH1cblxuICBjb25zdCBlcnJvciA9IHtcbiAgICBtZXNzYWdlOiBlcnIgfHwgJ0ludGVybmFsIFNlcnZlciBFcnJvci4nLFxuICB9O1xuXG4gIGlmIChlcnIuZXJyb3JzKSB7XG4gICAgZXJyb3IuZXJyb3JzID0ge307XG4gICAgY29uc3QgeyBlcnJvcnMgfSA9IGVycjtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShlcnJvcnMpKSB7XG4gICAgICBlcnJvci5lcnJvcnMgPSBSZXF1aXJlZEVycm9yLm1ha2VQcmV0dHkoZXJyb3JzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgT2JqZWN0LmtleXMoZXJyb3JzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIGVycm9yLmVycm9yc1trZXldID0gZXJyb3JzW2tleV0ubWVzc2FnZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJlcy5zdGF0dXMoZXJyLnN0YXR1cyB8fCBIVFRQU3RhdHVzLklOVEVSTkFMX1NFUlZFUl9FUlJPUikuanNvbihlcnJvcik7XG5cbiAgcmV0dXJuIG5leHQoKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zZXJ2aWNlcy9sb2cuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyYXZlblwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJhdmVuXCJcbi8vIG1vZHVsZSBpZCA9IDYxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInByZXR0eS1lcnJvclwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInByZXR0eS1lcnJvclwiXG4vLyBtb2R1bGUgaWQgPSA2MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9