"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyExp = void 0;

require("@babel/polyfill");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var verifyExp = function verifyExp(token) {
  var decoded = _jsonwebtoken["default"].decode(token);

  var dateNow = new Date();
  var dateExp = new Date(0);

  try {
    dateExp.setUTCSeconds(decoded.exp);
    var expired = dateNow.valueOf() > dateExp.valueOf() ? true : false;
    return expired;
  } catch (_unused) {
    return true;
  }
};

exports.verifyExp = verifyExp;