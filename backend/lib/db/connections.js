"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_mongoose["default"].connect('mongodb://localhost/Gestor', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var db = _mongoose["default"].connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("🚀 Mongo client connected!");
});
var _default = _mongoose["default"];
exports["default"] = _default;