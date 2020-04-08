"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _apolloServerExpress = require("apollo-server-express");

var _express = _interopRequireDefault(require("express"));

var _graphql = require("../graphql");

var _http = _interopRequireWildcard(require("http"));

var _routes = require("../routes");

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var HOST = "127.0.0.1";
var PORT = "3000";
var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use(_routes.router);
var server = new _apolloServerExpress.ApolloServer({
  typeDefs: _graphql.typeDefs,
  resolvers: _graphql.resolvers,
  context: function () {
    var _context = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(_ref) {
      var req, connection, token;
      return regeneratorRuntime.wrap(function _callee$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              req = _ref.req, connection = _ref.connection;

              if (!connection) {
                _context2.next = 5;
                break;
              }

              return _context2.abrupt("return", connection.context);

            case 5:
              _context2.prev = 5;
              token = req.headers.authorization;
              return _context2.abrupt("return", {
                token: token
              });

            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2["catch"](5);
              return _context2.abrupt("return", {
                token: ""
              });

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee, null, [[5, 10]]);
    }));

    function context(_x) {
      return _context.apply(this, arguments);
    }

    return context;
  }(),
  subscriptions: {
    onConnect: function onConnect(connectionParams, webSocket, context) {
      var token = connectionParams['Authorization'];
      return {
        token: token
      };
    }
  }
});
server.applyMiddleware({
  app: app
});

var httpserver = _http["default"].createServer(app);

server.installSubscriptionHandlers(httpserver);
httpserver.listen({
  port: PORT,
  host: HOST
}, function () {
  console.log("server ready http://".concat(HOST, ":").concat(PORT).concat(server.graphqlPath));
});