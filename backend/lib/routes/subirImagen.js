"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filesRoutes = void 0;

var _multer = require("./multer");

var _express = require("express");

var _labs = _interopRequireDefault(require("../models/labs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var filesRoutes = (0, _express.Router)();
exports.filesRoutes = filesRoutes;
filesRoutes.post('/upload', _multer.subirImagen.single("imagen"),
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var imagenRuta, lab;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            imagenRuta = req.file.path;
            console.log(req.file);
            _context.next = 4;
            return _labs["default"].where({
              nombre: req.headers.labname
            }).findOneAndUpdate();

          case 4:
            lab = _context.sent;
            console.log(lab);
            lab.logo = imagenRuta;
            _context.next = 9;
            return lab.save();

          case 9:
            res.send({
              'message': 'Aquita'
            });

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
filesRoutes.get('/sendImg/:lab',
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var lab, _lab;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            lab = req.params.lab;
            _context2.next = 4;
            return _labs["default"].where({
              nombre: lab
            }).findOne();

          case 4:
            _lab = _context2.sent;
            res.download(_lab.logo);
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", _context2.t0);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 8]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());