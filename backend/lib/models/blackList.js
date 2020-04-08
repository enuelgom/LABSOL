"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _connections = _interopRequireDefault(require("../db/connections"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _connections["default"].Schema;
var blackListSchema = new Schema({
  token: String
});

var blackList = _connections["default"].model('blackList', blackListSchema);

var _default = blackList;
exports["default"] = _default;