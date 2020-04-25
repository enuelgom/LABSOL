"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subirImagen = void 0;

var _multer = _interopRequireDefault(require("multer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, "../logos");
  },
  filename: function filename(req, file, cb) {
    cb(null, "".concat(file.originalname));
  }
});

var subirImagen = (0, _multer["default"])({
  dest: '../logos/',
  storage: storage
});
exports.subirImagen = subirImagen;