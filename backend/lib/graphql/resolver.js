"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _labs = _interopRequireDefault(require("../models/labs"));

var _alumnos2 = _interopRequireDefault(require("../models/alumnos"));

var _colaborador2 = _interopRequireDefault(require("../models/colaborador"));

var _fs = _interopRequireDefault(require("fs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _admin2 = _interopRequireDefault(require("../models/admin"));

var _graphqlSubscriptions = require("graphql-subscriptions");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _blackList = _interopRequireDefault(require("../models/blackList"));

var _index = require("../auth/index");

var _os = require("os");

var _graphql = require("graphql");

var _graphqlTools = require("graphql-tools");

var _util = require("util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var SECRET = _fs["default"].readFileSync("src/private.key");

var pubsub = new _graphqlSubscriptions.PubSub();
var lista = [];
var resolvers = {
  Subscription: {
    lista: {
      subscribe: function subscribe() {
        return pubsub.asyncIterator(["LISTA"]);
      }
    }
  },
  Query: {
    Colaborador: function Colaborador(root, args, context) {
      return _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var token, _blacklist, decoded, _id, colaboradores;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                token = context.token;
                _context.next = 3;
                return _blackList["default"].find({
                  token: token
                }).findOne();

              case 3:
                _blacklist = _context.sent;

                if (!(!context.token || (0, _index.verifyExp)(token) || !_blacklist == "")) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt("return", "Tu sesion ha expirado");

              case 6:
                _context.prev = 6;
                decoded = _jsonwebtoken["default"].decode(token, SECRET);
                _id = decoded._id;
                _context.next = 11;
                return _colaborador2["default"].where({
                  _id: _id
                }).findOne();

              case 11:
                colaboradores = _context.sent;
                return _context.abrupt("return", colaboradores);

              case 15:
                _context.prev = 15;
                _context.t0 = _context["catch"](6);
                return _context.abrupt("return", _context.t0);

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[6, 15]]);
      }))();
    },
    Colaboradores: function Colaboradores(root, args, context) {
      return _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var token, _blacklist, decoded, siglas, lab, id_lab, colaboradores;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                token = context.token;
                _context2.next = 3;
                return _blackList["default"].find({
                  token: token
                }).findOne();

              case 3:
                _blacklist = _context2.sent;

                if (!(!context.token || (0, _index.verifyExp)(token) || !_blacklist == "")) {
                  _context2.next = 6;
                  break;
                }

                return _context2.abrupt("return", "Tu sesion ha expirado");

              case 6:
                _context2.prev = 6;
                decoded = _jsonwebtoken["default"].decode(token, SECRET);
                siglas = decoded.siglas;
                _context2.next = 11;
                return _labs["default"].where({
                  siglas: siglas
                }).findOne();

              case 11:
                lab = _context2.sent;
                id_lab = lab._id;
                _context2.next = 15;
                return _colaborador2["default"].where({
                  id_lab: id_lab
                }).find();

              case 15:
                colaboradores = _context2.sent;
                return _context2.abrupt("return", colaboradores);

              case 19:
                _context2.prev = 19;
                _context2.t0 = _context2["catch"](6);
                return _context2.abrupt("return", _context2.t0);

              case 22:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[6, 19]]);
      }))();
    },
    getFaseAct: function getFaseAct(root, args, context) {
      return _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        var nombre, proyecto, _lab, datos, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, val, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, val2, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, val3;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                nombre = args.nombre, proyecto = args.proyecto;
                _context3.next = 4;
                return _labs["default"].where({
                  nombre: nombre
                }).findOne();

              case 4:
                _lab = _context3.sent;
                datos = [];
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context3.prev = 9;
                _iterator = _lab.proyectos[Symbol.iterator]();

              case 11:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context3.next = 61;
                  break;
                }

                val = _step.value;

                if (!(val.proyecto === proyecto)) {
                  _context3.next = 58;
                  break;
                }

                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context3.prev = 17;
                _iterator2 = val.avances.fases[Symbol.iterator]();

              case 19:
                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                  _context3.next = 44;
                  break;
                }

                val2 = _step2.value;
                datos.push({
                  fase: val2.fase,
                  _rowVariant: "success"
                });
                _iteratorNormalCompletion3 = true;
                _didIteratorError3 = false;
                _iteratorError3 = undefined;
                _context3.prev = 25;

                for (_iterator3 = val2.actividades[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                  val3 = _step3.value;

                  if (val3.evaluacion === null || val3.evaluacion === "") {
                    datos.push({
                      actividades: val3._actividad,
                      semI: val3.semanaInicio,
                      semF: val3.semanaTerminacion,
                      evaluacion: ""
                    });
                  } else {
                    datos.push({
                      actividades: val3._actividad,
                      semI: val3.semanaInicio,
                      semF: val3.semanaTerminacion,
                      evaluacion: val3.evaluacion
                    });
                  }
                }

                _context3.next = 33;
                break;

              case 29:
                _context3.prev = 29;
                _context3.t0 = _context3["catch"](25);
                _didIteratorError3 = true;
                _iteratorError3 = _context3.t0;

              case 33:
                _context3.prev = 33;
                _context3.prev = 34;

                if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
                  _iterator3["return"]();
                }

              case 36:
                _context3.prev = 36;

                if (!_didIteratorError3) {
                  _context3.next = 39;
                  break;
                }

                throw _iteratorError3;

              case 39:
                return _context3.finish(36);

              case 40:
                return _context3.finish(33);

              case 41:
                _iteratorNormalCompletion2 = true;
                _context3.next = 19;
                break;

              case 44:
                _context3.next = 50;
                break;

              case 46:
                _context3.prev = 46;
                _context3.t1 = _context3["catch"](17);
                _didIteratorError2 = true;
                _iteratorError2 = _context3.t1;

              case 50:
                _context3.prev = 50;
                _context3.prev = 51;

                if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                  _iterator2["return"]();
                }

              case 53:
                _context3.prev = 53;

                if (!_didIteratorError2) {
                  _context3.next = 56;
                  break;
                }

                throw _iteratorError2;

              case 56:
                return _context3.finish(53);

              case 57:
                return _context3.finish(50);

              case 58:
                _iteratorNormalCompletion = true;
                _context3.next = 11;
                break;

              case 61:
                _context3.next = 67;
                break;

              case 63:
                _context3.prev = 63;
                _context3.t2 = _context3["catch"](9);
                _didIteratorError = true;
                _iteratorError = _context3.t2;

              case 67:
                _context3.prev = 67;
                _context3.prev = 68;

                if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                  _iterator["return"]();
                }

              case 70:
                _context3.prev = 70;

                if (!_didIteratorError) {
                  _context3.next = 73;
                  break;
                }

                throw _iteratorError;

              case 73:
                return _context3.finish(70);

              case 74:
                return _context3.finish(67);

              case 75:
                return _context3.abrupt("return", datos);

              case 78:
                _context3.prev = 78;
                _context3.t3 = _context3["catch"](0);
                console.log(_context3.t3);
                return _context3.abrupt("return", _context3.t3);

              case 82:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 78], [9, 63, 67, 75], [17, 46, 50, 58], [25, 29, 33, 41], [34,, 36, 40], [51,, 53, 57], [68,, 70, 74]]);
      }))();
    },
    existeMetod: function existeMetod(root, args, context) {
      return _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        var nombre, proyecto, _lab, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, val;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                nombre = args.nombre, proyecto = args.proyecto;
                _context4.next = 4;
                return _labs["default"].where({
                  nombre: nombre
                }).findOne();

              case 4:
                _lab = _context4.sent;
                _iteratorNormalCompletion4 = true;
                _didIteratorError4 = false;
                _iteratorError4 = undefined;
                _context4.prev = 8;
                _iterator4 = _lab.proyectos[Symbol.iterator]();

              case 10:
                if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                  _context4.next = 21;
                  break;
                }

                val = _step4.value;

                if (!(val.proyecto === proyecto)) {
                  _context4.next = 18;
                  break;
                }

                if (!(val.avances.metodologia === "")) {
                  _context4.next = 17;
                  break;
                }

                return _context4.abrupt("return", false);

              case 17:
                return _context4.abrupt("return", val.avances.metodologia);

              case 18:
                _iteratorNormalCompletion4 = true;
                _context4.next = 10;
                break;

              case 21:
                _context4.next = 27;
                break;

              case 23:
                _context4.prev = 23;
                _context4.t0 = _context4["catch"](8);
                _didIteratorError4 = true;
                _iteratorError4 = _context4.t0;

              case 27:
                _context4.prev = 27;
                _context4.prev = 28;

                if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
                  _iterator4["return"]();
                }

              case 30:
                _context4.prev = 30;

                if (!_didIteratorError4) {
                  _context4.next = 33;
                  break;
                }

                throw _iteratorError4;

              case 33:
                return _context4.finish(30);

              case 34:
                return _context4.finish(27);

              case 35:
                _context4.next = 40;
                break;

              case 37:
                _context4.prev = 37;
                _context4.t1 = _context4["catch"](0);
                return _context4.abrupt("return", _context4.t1);

              case 40:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 37], [8, 23, 27, 35], [28,, 30, 34]]);
      }))();
    },
    getLabName: function getLabName(root, args, context) {
      return _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5() {
        var siglas, nameLab, nombre;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                siglas = args.siglas;
                _context5.next = 3;
                return _labs["default"].where({
                  siglas: siglas
                }).findOne();

              case 3:
                nameLab = _context5.sent;
                nombre = nameLab.nombre;
                return _context5.abrupt("return", nombre);

              case 6:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }))();
    },
    allLabs: function allLabs(root, args, context) {
      return _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6() {
        var _allLabs, _count, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, val, i, j, _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, val2;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return _labs["default"].find();

              case 2:
                _allLabs = _context6.sent;
                _count = [];
                _iteratorNormalCompletion5 = true;
                _didIteratorError5 = false;
                _iteratorError5 = undefined;
                _context6.prev = 7;
                _iterator5 = _allLabs[Symbol.iterator]();

              case 9:
                if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
                  _context6.next = 36;
                  break;
                }

                val = _step5.value;
                i = 0, j = 0;
                _iteratorNormalCompletion6 = true;
                _didIteratorError6 = false;
                _iteratorError6 = undefined;
                _context6.prev = 15;

                for (_iterator6 = val.proyectos[Symbol.iterator](); !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                  val2 = _step6.value;

                  if (val2.status === "Nuevo") {
                    i++;
                  }

                  if (val2.status === "Aceptado") {
                    j++;
                  }
                }

                _context6.next = 23;
                break;

              case 19:
                _context6.prev = 19;
                _context6.t0 = _context6["catch"](15);
                _didIteratorError6 = true;
                _iteratorError6 = _context6.t0;

              case 23:
                _context6.prev = 23;
                _context6.prev = 24;

                if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
                  _iterator6["return"]();
                }

              case 26:
                _context6.prev = 26;

                if (!_didIteratorError6) {
                  _context6.next = 29;
                  break;
                }

                throw _iteratorError6;

              case 29:
                return _context6.finish(26);

              case 30:
                return _context6.finish(23);

              case 31:
                if (i === 0) {
                  i = "";
                }

                if (val._status != "Eliminado") {
                  _count.push({
                    nombre: val.nombre,
                    count: "" + j,
                    notificaciones: i,
                    tipoLaboratorio: val.tipoLaboratorio,
                    siglas: val.siglas
                  });
                }

              case 33:
                _iteratorNormalCompletion5 = true;
                _context6.next = 9;
                break;

              case 36:
                _context6.next = 42;
                break;

              case 38:
                _context6.prev = 38;
                _context6.t1 = _context6["catch"](7);
                _didIteratorError5 = true;
                _iteratorError5 = _context6.t1;

              case 42:
                _context6.prev = 42;
                _context6.prev = 43;

                if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
                  _iterator5["return"]();
                }

              case 45:
                _context6.prev = 45;

                if (!_didIteratorError5) {
                  _context6.next = 48;
                  break;
                }

                throw _iteratorError5;

              case 48:
                return _context6.finish(45);

              case 49:
                return _context6.finish(42);

              case 50:
                return _context6.abrupt("return", _count);

              case 51:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[7, 38, 42, 50], [15, 19, 23, 31], [24,, 26, 30], [43,, 45, 49]]);
      }))();
    },
    oneLab: function oneLab(root, args, context) {
      return _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7() {
        var nombre, proyectoCategoria, _oneLab, cat, categoria, _iteratorNormalCompletion7, _didIteratorError7, _iteratorError7, _iterator7, _step7, val, i, _iteratorNormalCompletion8, _didIteratorError8, _iteratorError8, _iterator8, _step8, val2;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                nombre = args.nombre, proyectoCategoria = args.proyectoCategoria;
                _context7.next = 3;
                return _labs["default"].where({
                  siglas: nombre
                }).findOne();

              case 3:
                _oneLab = _context7.sent;
                cat = "";
                _context7.t0 = proyectoCategoria;
                _context7.next = _context7.t0 === "Nuevos proyectos" ? 8 : _context7.t0 === "Proyectos en catalogo" ? 10 : _context7.t0 === "Proyectos en desarrollo" ? 12 : _context7.t0 === "Proyectos finalizados" ? 14 : 16;
                break;

              case 8:
                cat = "Nuevo";
                return _context7.abrupt("break", 17);

              case 10:
                cat = "Aceptado";
                return _context7.abrupt("break", 17);

              case 12:
                cat = "En desarrollo";
                return _context7.abrupt("break", 17);

              case 14:
                cat = "Finalizado";
                return _context7.abrupt("break", 17);

              case 16:
                return _context7.abrupt("return", "");

              case 17:
                categoria = [];
                _iteratorNormalCompletion7 = true;
                _didIteratorError7 = false;
                _iteratorError7 = undefined;
                _context7.prev = 21;
                _iterator7 = _oneLab.proyectos[Symbol.iterator]();

              case 23:
                if (_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done) {
                  _context7.next = 50;
                  break;
                }

                val = _step7.value;

                if (!(val.status === cat)) {
                  _context7.next = 47;
                  break;
                }

                i = 0;
                _iteratorNormalCompletion8 = true;
                _didIteratorError8 = false;
                _iteratorError8 = undefined;
                _context7.prev = 30;

                for (_iterator8 = val.alumnos[Symbol.iterator](); !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                  val2 = _step8.value;

                  if (val2.status === "Aceptado") {
                    i = i + 1;
                  }
                }

                _context7.next = 38;
                break;

              case 34:
                _context7.prev = 34;
                _context7.t1 = _context7["catch"](30);
                _didIteratorError8 = true;
                _iteratorError8 = _context7.t1;

              case 38:
                _context7.prev = 38;
                _context7.prev = 39;

                if (!_iteratorNormalCompletion8 && _iterator8["return"] != null) {
                  _iterator8["return"]();
                }

              case 41:
                _context7.prev = 41;

                if (!_didIteratorError8) {
                  _context7.next = 44;
                  break;
                }

                throw _iteratorError8;

              case 44:
                return _context7.finish(41);

              case 45:
                return _context7.finish(38);

              case 46:
                categoria.push({
                  _id: val._id,
                  proyecto: val.proyecto,
                  objetivo: val.objetivo,
                  requerimientos: val.requerimientos,
                  perfiles: val.perfiles,
                  habilidades: val.habilidades,
                  avances: val.avances,
                  status: val.status,
                  numAlu: val.numAlu,
                  alumnos: val.alumnos,
                  colaboradores: val.colaboradores,
                  alumnosExistentes: "" + i
                });

              case 47:
                _iteratorNormalCompletion7 = true;
                _context7.next = 23;
                break;

              case 50:
                _context7.next = 56;
                break;

              case 52:
                _context7.prev = 52;
                _context7.t2 = _context7["catch"](21);
                _didIteratorError7 = true;
                _iteratorError7 = _context7.t2;

              case 56:
                _context7.prev = 56;
                _context7.prev = 57;

                if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
                  _iterator7["return"]();
                }

              case 59:
                _context7.prev = 59;

                if (!_didIteratorError7) {
                  _context7.next = 62;
                  break;
                }

                throw _iteratorError7;

              case 62:
                return _context7.finish(59);

              case 63:
                return _context7.finish(56);

              case 64:
                return _context7.abrupt("return", categoria);

              case 65:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[21, 52, 56, 64], [30, 34, 38, 46], [39,, 41, 45], [57,, 59, 63]]);
      }))();
    },
    proyecto: function proyecto(root, args, context) {
      return _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8() {
        var nombre, proyecto, _onepro, _proyecto, _iteratorNormalCompletion9, _didIteratorError9, _iteratorError9, _iterator9, _step9, val, i, _iteratorNormalCompletion10, _didIteratorError10, _iteratorError10, _iterator10, _step10, val2;

        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                nombre = args.nombre, proyecto = args.proyecto;
                _context8.next = 3;
                return _labs["default"].findOne({
                  siglas: nombre
                });

              case 3:
                _onepro = _context8.sent;
                _proyecto = {};
                _iteratorNormalCompletion9 = true;
                _didIteratorError9 = false;
                _iteratorError9 = undefined;
                _context8.prev = 8;
                _iterator9 = _onepro.proyectos[Symbol.iterator]();

              case 10:
                if (_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done) {
                  _context8.next = 38;
                  break;
                }

                val = _step9.value;

                if (!(val.proyecto === proyecto)) {
                  _context8.next = 35;
                  break;
                }

                i = 0;
                _iteratorNormalCompletion10 = true;
                _didIteratorError10 = false;
                _iteratorError10 = undefined;
                _context8.prev = 17;

                for (_iterator10 = val.alumnos[Symbol.iterator](); !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                  val2 = _step10.value;

                  if (val2.status === "Aceptado") {
                    i = i + 1;
                  }
                }

                _context8.next = 25;
                break;

              case 21:
                _context8.prev = 21;
                _context8.t0 = _context8["catch"](17);
                _didIteratorError10 = true;
                _iteratorError10 = _context8.t0;

              case 25:
                _context8.prev = 25;
                _context8.prev = 26;

                if (!_iteratorNormalCompletion10 && _iterator10["return"] != null) {
                  _iterator10["return"]();
                }

              case 28:
                _context8.prev = 28;

                if (!_didIteratorError10) {
                  _context8.next = 31;
                  break;
                }

                throw _iteratorError10;

              case 31:
                return _context8.finish(28);

              case 32:
                return _context8.finish(25);

              case 33:
                _proyecto = val;
                _proyecto["alumnosExistentes"] = "" + i;

              case 35:
                _iteratorNormalCompletion9 = true;
                _context8.next = 10;
                break;

              case 38:
                _context8.next = 44;
                break;

              case 40:
                _context8.prev = 40;
                _context8.t1 = _context8["catch"](8);
                _didIteratorError9 = true;
                _iteratorError9 = _context8.t1;

              case 44:
                _context8.prev = 44;
                _context8.prev = 45;

                if (!_iteratorNormalCompletion9 && _iterator9["return"] != null) {
                  _iterator9["return"]();
                }

              case 47:
                _context8.prev = 47;

                if (!_didIteratorError9) {
                  _context8.next = 50;
                  break;
                }

                throw _iteratorError9;

              case 50:
                return _context8.finish(47);

              case 51:
                return _context8.finish(44);

              case 52:
                return _context8.abrupt("return", _proyecto);

              case 53:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, null, [[8, 40, 44, 52], [17, 21, 25, 33], [26,, 28, 32], [45,, 47, 51]]);
      }))();
    },
    alumnos: function alumnos(root, args, context) {
      return _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee9() {
        var nombre, proyecto, status, laboratorio, _proyecto, _iteratorNormalCompletion11, _didIteratorError11, _iteratorError11, _iterator11, _step11, val, nombres, _iteratorNormalCompletion12, _didIteratorError12, _iteratorError12, _iterator12, _step12, _val, nombreAlumno;

        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.prev = 0;
                nombre = args.nombre, proyecto = args.proyecto, status = args.status;
                _context9.next = 4;
                return _labs["default"].findOne({
                  siglas: nombre
                });

              case 4:
                laboratorio = _context9.sent;
                _proyecto = [];
                _iteratorNormalCompletion11 = true;
                _didIteratorError11 = false;
                _iteratorError11 = undefined;
                _context9.prev = 9;

                for (_iterator11 = laboratorio.proyectos[Symbol.iterator](); !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
                  val = _step11.value;

                  if (val.proyecto === proyecto) {
                    _proyecto = val;
                  }
                }

                _context9.next = 17;
                break;

              case 13:
                _context9.prev = 13;
                _context9.t0 = _context9["catch"](9);
                _didIteratorError11 = true;
                _iteratorError11 = _context9.t0;

              case 17:
                _context9.prev = 17;
                _context9.prev = 18;

                if (!_iteratorNormalCompletion11 && _iterator11["return"] != null) {
                  _iterator11["return"]();
                }

              case 20:
                _context9.prev = 20;

                if (!_didIteratorError11) {
                  _context9.next = 23;
                  break;
                }

                throw _iteratorError11;

              case 23:
                return _context9.finish(20);

              case 24:
                return _context9.finish(17);

              case 25:
                nombres = [];
                _iteratorNormalCompletion12 = true;
                _didIteratorError12 = false;
                _iteratorError12 = undefined;
                _context9.prev = 29;
                _iterator12 = _proyecto.alumnos[Symbol.iterator]();

              case 31:
                if (_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done) {
                  _context9.next = 41;
                  break;
                }

                _val = _step12.value;

                if (!(_val.status === status)) {
                  _context9.next = 38;
                  break;
                }

                _context9.next = 36;
                return _alumnos2["default"].findOne({
                  _id: _val._id
                });

              case 36:
                nombreAlumno = _context9.sent;
                nombres.push({
                  nombre: nombreAlumno.alumno + " " + nombreAlumno.ape_p + " " + nombreAlumno.ape_m,
                  institucion: nombreAlumno.institucion,
                  carrera: nombreAlumno.carrera,
                  telefono: nombreAlumno.telefono,
                  correo: nombreAlumno.correo,
                  _id: nombreAlumno._id
                });

              case 38:
                _iteratorNormalCompletion12 = true;
                _context9.next = 31;
                break;

              case 41:
                _context9.next = 47;
                break;

              case 43:
                _context9.prev = 43;
                _context9.t1 = _context9["catch"](29);
                _didIteratorError12 = true;
                _iteratorError12 = _context9.t1;

              case 47:
                _context9.prev = 47;
                _context9.prev = 48;

                if (!_iteratorNormalCompletion12 && _iterator12["return"] != null) {
                  _iterator12["return"]();
                }

              case 50:
                _context9.prev = 50;

                if (!_didIteratorError12) {
                  _context9.next = 53;
                  break;
                }

                throw _iteratorError12;

              case 53:
                return _context9.finish(50);

              case 54:
                return _context9.finish(47);

              case 55:
                return _context9.abrupt("return", nombres);

              case 58:
                _context9.prev = 58;
                _context9.t2 = _context9["catch"](0);

              case 60:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, null, [[0, 58], [9, 13, 17, 25], [18,, 20, 24], [29, 43, 47, 55], [48,, 50, 54]]);
      }))();
    },
    Count: function Count(root, args, context) {
      return _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee10() {
        var laboratorios, _count, _iteratorNormalCompletion13, _didIteratorError13, _iteratorError13, _iterator13, _step13, val;

        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return _labs["default"].find();

              case 2:
                laboratorios = _context10.sent;
                _count = [];
                _iteratorNormalCompletion13 = true;
                _didIteratorError13 = false;
                _iteratorError13 = undefined;
                _context10.prev = 7;

                for (_iterator13 = laboratorios[Symbol.iterator](); !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
                  val = _step13.value;

                  _count.push({
                    nombre: val.nombre,
                    count: "" + val.proyectos.length
                  });
                }

                _context10.next = 15;
                break;

              case 11:
                _context10.prev = 11;
                _context10.t0 = _context10["catch"](7);
                _didIteratorError13 = true;
                _iteratorError13 = _context10.t0;

              case 15:
                _context10.prev = 15;
                _context10.prev = 16;

                if (!_iteratorNormalCompletion13 && _iterator13["return"] != null) {
                  _iterator13["return"]();
                }

              case 18:
                _context10.prev = 18;

                if (!_didIteratorError13) {
                  _context10.next = 21;
                  break;
                }

                throw _iteratorError13;

              case 21:
                return _context10.finish(18);

              case 22:
                return _context10.finish(15);

              case 23:
                return _context10.abrupt("return", _count);

              case 24:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, null, [[7, 11, 15, 23], [16,, 18, 22]]);
      }))();
    },
    infoAlumno: function infoAlumno(root, args, context) {
      return _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee11() {
        var token, _blacklist, usuario, alum;

        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                token = context.token;
                _context11.next = 3;
                return _blackList["default"].find({
                  token: token
                }).findOne();

              case 3:
                _blacklist = _context11.sent;

                if (!(!context.token || (0, _index.verifyExp)(token) || !_blacklist == "")) {
                  _context11.next = 6;
                  break;
                }

                return _context11.abrupt("return", "Tu sesion ha expirado");

              case 6:
                usuario = args.usuario;
                _context11.next = 9;
                return _alumnos2["default"].findOne({
                  usuario: usuario
                });

              case 9:
                alum = _context11.sent;
                return _context11.abrupt("return", alum);

              case 11:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      }))();
    },
    misSolicitudes: function misSolicitudes(root, args, context) {
      return _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee12() {
        var token, decoded, alumno, misSolicitudes, _iteratorNormalCompletion14, _didIteratorError14, _iteratorError14, _iterator14, _step14, val, laboratorio, _iteratorNormalCompletion15, _didIteratorError15, _iteratorError15, _iterator15, _step15, val2;

        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                token = context.token;
                decoded = _jsonwebtoken["default"].decode(token, SECRET);
                _context12.next = 4;
                return _alumnos2["default"].findOne({
                  usuario: decoded["usuario"]
                });

              case 4:
                alumno = _context12.sent;
                misSolicitudes = [];
                _iteratorNormalCompletion14 = true;
                _didIteratorError14 = false;
                _iteratorError14 = undefined;
                _context12.prev = 9;
                _iterator14 = alumno.solicitudes[Symbol.iterator]();

              case 11:
                if (_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done) {
                  _context12.next = 38;
                  break;
                }

                val = _step14.value;
                _context12.next = 15;
                return _labs["default"].findOne({
                  siglas: val.nombre
                });

              case 15:
                laboratorio = _context12.sent;
                _iteratorNormalCompletion15 = true;
                _didIteratorError15 = false;
                _iteratorError15 = undefined;
                _context12.prev = 19;

                for (_iterator15 = laboratorio.proyectos[Symbol.iterator](); !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
                  val2 = _step15.value;

                  if (val2.proyecto === val.proyecto) {
                    if (alumno.status != "cancelado") {
                      misSolicitudes.push({
                        nombre: laboratorio.nombre,
                        proyecto: val2.proyecto,
                        status: val._status
                      });
                    }
                  }
                }

                _context12.next = 27;
                break;

              case 23:
                _context12.prev = 23;
                _context12.t0 = _context12["catch"](19);
                _didIteratorError15 = true;
                _iteratorError15 = _context12.t0;

              case 27:
                _context12.prev = 27;
                _context12.prev = 28;

                if (!_iteratorNormalCompletion15 && _iterator15["return"] != null) {
                  _iterator15["return"]();
                }

              case 30:
                _context12.prev = 30;

                if (!_didIteratorError15) {
                  _context12.next = 33;
                  break;
                }

                throw _iteratorError15;

              case 33:
                return _context12.finish(30);

              case 34:
                return _context12.finish(27);

              case 35:
                _iteratorNormalCompletion14 = true;
                _context12.next = 11;
                break;

              case 38:
                _context12.next = 44;
                break;

              case 40:
                _context12.prev = 40;
                _context12.t1 = _context12["catch"](9);
                _didIteratorError14 = true;
                _iteratorError14 = _context12.t1;

              case 44:
                _context12.prev = 44;
                _context12.prev = 45;

                if (!_iteratorNormalCompletion14 && _iterator14["return"] != null) {
                  _iterator14["return"]();
                }

              case 47:
                _context12.prev = 47;

                if (!_didIteratorError14) {
                  _context12.next = 50;
                  break;
                }

                throw _iteratorError14;

              case 50:
                return _context12.finish(47);

              case 51:
                return _context12.finish(44);

              case 52:
                return _context12.abrupt("return", misSolicitudes);

              case 53:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, null, [[9, 40, 44, 52], [19, 23, 27, 35], [28,, 30, 34], [45,, 47, 51]]);
      }))();
    },
    infoLab: function infoLab(root, args, context) {
      return _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee13() {
        var token, decoded, _lab;

        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                token = context.token;
                decoded = _jsonwebtoken["default"].decode(token, SECRET);
                _context13.next = 4;
                return _labs["default"].findOne({
                  usuario: decoded["usuario"]
                });

              case 4:
                _lab = _context13.sent;
                return _context13.abrupt("return", _lab);

              case 6:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13);
      }))();
    }
  },
  Mutation: {
    agregarLista: function agregarLista(root, args, context) {
      var elemento = args.elemento;
      lista.push(elemento);
      pubsub.publish("LISTA", {
        lista: lista
      });
      return "agregado";
    },
    login: function login(root, args, context) {
      return _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee14() {
        var usuario, clave, alumno, adm, lab, colaboradores, typeUser, nombre, _typeUser, _nombre2, siglas, _typeUser2, _nombre3, _id, _typeUser3, _lab2, _nombre4, _siglas, _id2;

        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                // const date = new Date(2020,2,18);
                // const dateNow = new Date();
                // if(date > dateNow) console.log("aun no es fecha")
                // console.log(date)
                usuario = args.usuario, clave = args.clave;
                _context14.prev = 1;
                _context14.next = 4;
                return _alumnos2["default"].where({
                  usuario: usuario
                }).findOne();

              case 4:
                alumno = _context14.sent;
                _context14.next = 7;
                return _admin2["default"].where({
                  usuario: usuario
                }).findOne();

              case 7:
                adm = _context14.sent;
                _context14.next = 10;
                return _labs["default"].where({
                  usuario: usuario
                }).findOne();

              case 10:
                lab = _context14.sent;
                _context14.next = 13;
                return _colaborador2["default"].where({
                  usuario: usuario
                }).findOne();

              case 13:
                colaboradores = _context14.sent;

                if (!adm) {
                  _context14.next = 24;
                  break;
                }

                _context14.next = 17;
                return _bcrypt["default"].compare(clave, adm.clave);

              case 17:
                if (!_context14.sent) {
                  _context14.next = 23;
                  break;
                }

                typeUser = "0";
                nombre = adm.nombre;
                return _context14.abrupt("return", _jsonwebtoken["default"].sign({
                  usuario: usuario,
                  nombre: nombre,
                  typeUser: typeUser
                }, SECRET, {
                  expiresIn: '5h'
                }));

              case 23:
                return _context14.abrupt("return", "Contraseña incorrecta");

              case 24:
                if (!lab) {
                  _context14.next = 35;
                  break;
                }

                _context14.next = 27;
                return _bcrypt["default"].compare(clave, lab.clave);

              case 27:
                if (!_context14.sent) {
                  _context14.next = 34;
                  break;
                }

                _typeUser = "1";
                _nombre2 = lab.nombre;
                siglas = lab.siglas;
                return _context14.abrupt("return", _jsonwebtoken["default"].sign({
                  usuario: usuario,
                  nombre: _nombre2,
                  typeUser: _typeUser,
                  siglas: siglas
                }, SECRET, {
                  expiresIn: '5h'
                }));

              case 34:
                return _context14.abrupt("return", "Contraseña incorrecta");

              case 35:
                if (!alumno) {
                  _context14.next = 46;
                  break;
                }

                _context14.next = 38;
                return _bcrypt["default"].compare(clave, alumno.clave);

              case 38:
                if (!_context14.sent) {
                  _context14.next = 45;
                  break;
                }

                _typeUser2 = "2";
                _nombre3 = alumno.alumno;
                _id = alumno._id;
                return _context14.abrupt("return", _jsonwebtoken["default"].sign({
                  usuario: usuario,
                  nombre: _nombre3,
                  typeUser: _typeUser2,
                  _id: _id
                }, SECRET, {
                  expiresIn: '5h'
                }));

              case 45:
                return _context14.abrupt("return", "Contraseña incorrecta");

              case 46:
                if (!colaboradores) {
                  _context14.next = 61;
                  break;
                }

                _context14.next = 49;
                return _bcrypt["default"].compare(clave, colaboradores.clave);

              case 49:
                if (!_context14.sent) {
                  _context14.next = 60;
                  break;
                }

                _typeUser3 = "1.1";
                _context14.next = 53;
                return _labs["default"].where({
                  _id: colaboradores.id_lab
                }).findOne();

              case 53:
                _lab2 = _context14.sent;
                _nombre4 = _lab2.nombre;
                _siglas = _lab2.siglas;
                _id2 = colaboradores._id;
                return _context14.abrupt("return", _jsonwebtoken["default"].sign({
                  nombre: _nombre4,
                  siglas: _siglas,
                  typeUser: _typeUser3,
                  _id: _id2
                }, SECRET, {
                  expiresIn: '5h'
                }));

              case 60:
                return _context14.abrupt("return", "Contraseña incorrecta");

              case 61:
                return _context14.abrupt("return", "El usuario no existe");

              case 64:
                _context14.prev = 64;
                _context14.t0 = _context14["catch"](1);
                return _context14.abrupt("return", _context14.t0);

              case 67:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, null, [[1, 64]]);
      }))();
    },
    logOut: function logOut(root, args, context) {
      return _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee15() {
        var token, _blacklist;

        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                token = context.token;
                _context15.next = 3;
                return _blackList["default"].find({
                  token: token
                }).findOne();

              case 3:
                _blacklist = _context15.sent;

                if (!(!context.token || !_blacklist == "")) {
                  _context15.next = 6;
                  break;
                }

                return _context15.abrupt("return", "Tu sesion ha expirado");

              case 6:
                _context15.next = 8;
                return new _blackList["default"]({
                  token: token
                }).save();

              case 8:
                return _context15.abrupt("return", "sesion Cerrada");

              case 9:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15);
      }))();
    },
    nuevoLab: function nuevoLab(root, args, context) {
      return _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee16() {
        var token, _blacklist, nombre, siglas, usuario, tipoLaboratorio, clave, passHashed, msjerror;

        return regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                token = context.token;
                _context16.next = 3;
                return _blackList["default"].find({
                  token: token
                }).findOne();

              case 3:
                _blacklist = _context16.sent;

                if (!(!context.token || (0, _index.verifyExp)(token) || !_blacklist == "")) {
                  _context16.next = 6;
                  break;
                }

                return _context16.abrupt("return", "Tu sesion ha expirado");

              case 6:
                nombre = args.nombre, siglas = args.siglas, usuario = args.usuario, tipoLaboratorio = args.tipoLaboratorio;
                clave = args.clave;
                _context16.next = 10;
                return _bcrypt["default"].hash(clave, 10);

              case 10:
                passHashed = _context16.sent;
                clave = passHashed;
                _context16.next = 14;
                return _labs["default"].where({
                  nombre: nombre
                }).findOne();

              case 14:
                if (!_context16.sent) {
                  _context16.next = 16;
                  break;
                }

                return _context16.abrupt("return", "Laboratorio existente");

              case 16:
                _context16.prev = 16;
                _context16.next = 19;
                return new _labs["default"]({
                  nombre: nombre,
                  siglas: siglas,
                  usuario: usuario,
                  clave: clave,
                  tipoLaboratorio: tipoLaboratorio
                }).save();

              case 19:
                return _context16.abrupt("return", "Laboratorio registrado");

              case 22:
                _context16.prev = 22;
                _context16.t0 = _context16["catch"](16);
                msjerror = _context16.t0.message;

                if (!msjerror.includes('siglas')) {
                  _context16.next = 29;
                  break;
                }

                return _context16.abrupt("return", "Siglas existentes");

              case 29:
                if (!msjerror.includes('usuario')) {
                  _context16.next = 31;
                  break;
                }

                return _context16.abrupt("return", "Usuario existente");

              case 31:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, null, [[16, 22]]);
      }))();
    },
    eliminarLaboratorio: function eliminarLaboratorio(root, args, context) {
      return _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee17() {
        var token, _blacklist, nombre, laboratorio, stat;

        return regeneratorRuntime.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                token = context.token;
                _context17.next = 3;
                return _blackList["default"].find({
                  token: token
                }).findOne();

              case 3:
                _blacklist = _context17.sent;

                if (!(!context.token || (0, _index.verifyExp)(token) || !_blacklist == "")) {
                  _context17.next = 6;
                  break;
                }

                return _context17.abrupt("return", "Tu sesion ha expirado");

              case 6:
                nombre = args.nombre;
                _context17.next = 9;
                return _labs["default"].where({
                  siglas: nombre
                }).findOneAndUpdate();

              case 9:
                laboratorio = _context17.sent;
                _context17.prev = 10;
                stat = "Eliminado";
                laboratorio._status = stat;
                _context17.next = 15;
                return laboratorio.save();

              case 15:
                return _context17.abrupt("return", "hecho");

              case 18:
                _context17.prev = 18;
                _context17.t0 = _context17["catch"](10);

              case 20:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, null, [[10, 18]]);
      }))();
    },
    updateLab: function updateLab(root, args, context) {
      return _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee18() {
        var token, _blacklist, clave, Clave, decoded, user, _usuario, updateLab, chAdmins, chAlumnos, Datos, _i, _Datos, val, typeUser, nombre, usuario, siglas, msjerror;

        return regeneratorRuntime.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                _context18.prev = 0;
                token = context.token;
                _context18.next = 4;
                return _blackList["default"].find({
                  token: token
                }).findOne();

              case 4:
                _blacklist = _context18.sent;

                if (!(!context.token || (0, _index.verifyExp)(token) || !_blacklist == "")) {
                  _context18.next = 7;
                  break;
                }

                return _context18.abrupt("return", "Tu sesion ha expirado");

              case 7:
                clave = args.clave;
                _context18.next = 10;
                return _bcrypt["default"].hash(clave, 10);

              case 10:
                Clave = _context18.sent;
                decoded = _jsonwebtoken["default"].decode(token, SECRET);
                user = decoded["usuario"];
                _usuario = args["usuario"];
                _context18.next = 16;
                return _labs["default"].where({
                  usuario: user
                }).findOneAndUpdate();

              case 16:
                updateLab = _context18.sent;
                _context18.next = 19;
                return _admin2["default"].where({
                  usuario: _usuario
                }).findOne();

              case 19:
                chAdmins = _context18.sent;
                _context18.next = 22;
                return _alumnos2["default"].where({
                  usuario: _usuario
                }).findOne();

              case 22:
                chAlumnos = _context18.sent;

                if (!(!chAlumnos == "" || !chAdmins == "")) {
                  _context18.next = 25;
                  break;
                }

                return _context18.abrupt("return", "Usuario existente");

              case 25:
                Datos = ["nombre", "siglas", "usuario", "tipoLaboratorio"];

                for (_i = 0, _Datos = Datos; _i < _Datos.length; _i++) {
                  val = _Datos[_i];

                  if (args[val] != "" || args[val] != null) {
                    updateLab[val] = args[val];
                  }
                }

                if (clave != "") {
                  updateLab["clave"] = Clave;
                }

                typeUser = "1";
                nombre = updateLab.nombre;
                usuario = updateLab.usuario;
                siglas = updateLab.siglas;
                _context18.next = 34;
                return updateLab.save();

              case 34:
                return _context18.abrupt("return", _jsonwebtoken["default"].sign({
                  usuario: usuario,
                  siglas: siglas,
                  nombre: nombre,
                  typeUser: typeUser
                }, SECRET, {
                  expiresIn: '2h'
                }));

              case 37:
                _context18.prev = 37;
                _context18.t0 = _context18["catch"](0);
                msjerror = _context18.t0.message;

                if (!msjerror.includes('usuario')) {
                  _context18.next = 44;
                  break;
                }

                return _context18.abrupt("return", "Usuario existente");

              case 44:
                if (!msjerror.includes('siglas')) {
                  _context18.next = 46;
                  break;
                }

                return _context18.abrupt("return", "Sigla existente");

              case 46:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, null, [[0, 37]]);
      }))();
    },
    agregarProyecto: function agregarProyecto(root, args, context) {
      return _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee19() {
        var token, decoded, _blacklist, proyecto, objetivo, requerimientos, habilidades, perfiles, numAlu, status, usuario, laboratorio, _iteratorNormalCompletion16, _didIteratorError16, _iteratorError16, _iterator16, _step16, val;

        return regeneratorRuntime.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                _context19.prev = 0;
                token = context.token;
                decoded = _jsonwebtoken["default"].decode(token, SECRET);
                _context19.next = 5;
                return _blackList["default"].find({
                  token: token
                }).findOne();

              case 5:
                _blacklist = _context19.sent;

                if (!(!context.token || (0, _index.verifyExp)(token) || !_blacklist == "")) {
                  _context19.next = 8;
                  break;
                }

                return _context19.abrupt("return", "Tu sesion ha expirado");

              case 8:
                proyecto = args.proyecto, objetivo = args.objetivo, requerimientos = args.requerimientos, habilidades = args.habilidades, perfiles = args.perfiles, numAlu = args.numAlu;
                status = "Nuevo";
                usuario = decoded["usuario"];
                _context19.next = 13;
                return _labs["default"].where({
                  usuario: usuario
                }).findOneAndUpdate();

              case 13:
                laboratorio = _context19.sent;
                _iteratorNormalCompletion16 = true;
                _didIteratorError16 = false;
                _iteratorError16 = undefined;
                _context19.prev = 17;
                _iterator16 = laboratorio.proyectos[Symbol.iterator]();

              case 19:
                if (_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done) {
                  _context19.next = 31;
                  break;
                }

                val = _step16.value;

                if (!(val.proyecto == proyecto)) {
                  _context19.next = 25;
                  break;
                }

                return _context19.abrupt("return", "Nombre del priyecto existente");

              case 25:
                laboratorio.proyectos.unshift({
                  proyecto: proyecto,
                  objetivo: objetivo,
                  requerimientos: requerimientos,
                  perfiles: perfiles,
                  habilidades: habilidades,
                  status: status,
                  numAlu: numAlu
                });
                laboratorio.save();
                return _context19.abrupt("return", "Proyecto registrado");

              case 28:
                _iteratorNormalCompletion16 = true;
                _context19.next = 19;
                break;

              case 31:
                _context19.next = 37;
                break;

              case 33:
                _context19.prev = 33;
                _context19.t0 = _context19["catch"](17);
                _didIteratorError16 = true;
                _iteratorError16 = _context19.t0;

              case 37:
                _context19.prev = 37;
                _context19.prev = 38;

                if (!_iteratorNormalCompletion16 && _iterator16["return"] != null) {
                  _iterator16["return"]();
                }

              case 40:
                _context19.prev = 40;

                if (!_didIteratorError16) {
                  _context19.next = 43;
                  break;
                }

                throw _iteratorError16;

              case 43:
                return _context19.finish(40);

              case 44:
                return _context19.finish(37);

              case 45:
                if (!(laboratorio.proyectos == "")) {
                  _context19.next = 49;
                  break;
                }

                laboratorio.proyectos.unshift({
                  proyecto: proyecto,
                  objetivo: objetivo,
                  requerimientos: requerimientos,
                  perfiles: perfiles,
                  habilidades: habilidades,
                  status: status,
                  numAlu: numAlu
                });
                laboratorio.save();
                return _context19.abrupt("return", "Proyecto registrado");

              case 49:
                _context19.next = 54;
                break;

              case 51:
                _context19.prev = 51;
                _context19.t1 = _context19["catch"](0);
                return _context19.abrupt("return", _context19.t1);

              case 54:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19, null, [[0, 51], [17, 33, 37, 45], [38,, 40, 44]]);
      }))();
    },
    updateProyecto: function updateProyecto(root, args, context) {
      return _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee20() {
        var token, decoded, _blacklist, usuario, proyecto, id, laboratorio, datos, _iteratorNormalCompletion17, _didIteratorError17, _iteratorError17, _iterator17, _step17, val, oldpro, _iteratorNormalCompletion18, _didIteratorError18, _iteratorError18, _iterator18, _step18, data, _iteratorNormalCompletion19, _didIteratorError19, _iteratorError19, _iterator19, _step19, alumno, _alumno, _iteratorNormalCompletion20, _didIteratorError20, _iteratorError20, _iterator20, _step20, findalum;

        return regeneratorRuntime.wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                token = context.token;
                decoded = _jsonwebtoken["default"].decode(token, SECRET);
                _context20.next = 4;
                return _blackList["default"].find({
                  token: token
                }).findOne();

              case 4:
                _blacklist = _context20.sent;

                if (!(!context.token || (0, _index.verifyExp)(token) || !_blacklist == "")) {
                  _context20.next = 7;
                  break;
                }

                return _context20.abrupt("return", "Tu sesion ha expirado");

              case 7:
                usuario = decoded["usuario"];
                proyecto = args.proyecto;
                id = args["_id"];
                _context20.next = 12;
                return _labs["default"].where({
                  usuario: usuario
                }).findOneAndUpdate();

              case 12:
                laboratorio = _context20.sent;
                datos = ["proyecto", "objetivo", "requerimientos", "habilidades", "perfiles", "numAlu"];
                _context20.prev = 14;
                _iteratorNormalCompletion17 = true;
                _didIteratorError17 = false;
                _iteratorError17 = undefined;
                _context20.prev = 18;
                _iterator17 = laboratorio.proyectos[Symbol.iterator]();

              case 20:
                if (_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done) {
                  _context20.next = 102;
                  break;
                }

                val = _step17.value;

                if (!(val._id == id)) {
                  _context20.next = 99;
                  break;
                }

                oldpro = val.proyecto;
                _iteratorNormalCompletion18 = true;
                _didIteratorError18 = false;
                _iteratorError18 = undefined;
                _context20.prev = 27;
                _iterator18 = datos[Symbol.iterator]();

              case 29:
                if (_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done) {
                  _context20.next = 37;
                  break;
                }

                data = _step18.value;

                if (args[data] != "") {
                  val[data] = args[data];
                }

                _context20.next = 34;
                return laboratorio.save();

              case 34:
                _iteratorNormalCompletion18 = true;
                _context20.next = 29;
                break;

              case 37:
                _context20.next = 43;
                break;

              case 39:
                _context20.prev = 39;
                _context20.t0 = _context20["catch"](27);
                _didIteratorError18 = true;
                _iteratorError18 = _context20.t0;

              case 43:
                _context20.prev = 43;
                _context20.prev = 44;

                if (!_iteratorNormalCompletion18 && _iterator18["return"] != null) {
                  _iterator18["return"]();
                }

              case 46:
                _context20.prev = 46;

                if (!_didIteratorError18) {
                  _context20.next = 49;
                  break;
                }

                throw _iteratorError18;

              case 49:
                return _context20.finish(46);

              case 50:
                return _context20.finish(43);

              case 51:
                _iteratorNormalCompletion19 = true;
                _didIteratorError19 = false;
                _iteratorError19 = undefined;
                _context20.prev = 54;
                _iterator19 = val.alumnos[Symbol.iterator]();

              case 56:
                if (_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done) {
                  _context20.next = 85;
                  break;
                }

                alumno = _step19.value;
                _context20.next = 60;
                return _alumnos2["default"].where({
                  _id: alumno["id"]
                }).findOneAndUpdate();

              case 60:
                _alumno = _context20.sent;
                _iteratorNormalCompletion20 = true;
                _didIteratorError20 = false;
                _iteratorError20 = undefined;
                _context20.prev = 64;

                for (_iterator20 = _alumno.solicitudes[Symbol.iterator](); !(_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done); _iteratorNormalCompletion20 = true) {
                  findalum = _step20.value;

                  if (findalum.proyecto === oldpro) {
                    findalum.proyecto = proyecto;
                  }
                }

                _context20.next = 72;
                break;

              case 68:
                _context20.prev = 68;
                _context20.t1 = _context20["catch"](64);
                _didIteratorError20 = true;
                _iteratorError20 = _context20.t1;

              case 72:
                _context20.prev = 72;
                _context20.prev = 73;

                if (!_iteratorNormalCompletion20 && _iterator20["return"] != null) {
                  _iterator20["return"]();
                }

              case 75:
                _context20.prev = 75;

                if (!_didIteratorError20) {
                  _context20.next = 78;
                  break;
                }

                throw _iteratorError20;

              case 78:
                return _context20.finish(75);

              case 79:
                return _context20.finish(72);

              case 80:
                _context20.next = 82;
                return _alumno.save();

              case 82:
                _iteratorNormalCompletion19 = true;
                _context20.next = 56;
                break;

              case 85:
                _context20.next = 91;
                break;

              case 87:
                _context20.prev = 87;
                _context20.t2 = _context20["catch"](54);
                _didIteratorError19 = true;
                _iteratorError19 = _context20.t2;

              case 91:
                _context20.prev = 91;
                _context20.prev = 92;

                if (!_iteratorNormalCompletion19 && _iterator19["return"] != null) {
                  _iterator19["return"]();
                }

              case 94:
                _context20.prev = 94;

                if (!_didIteratorError19) {
                  _context20.next = 97;
                  break;
                }

                throw _iteratorError19;

              case 97:
                return _context20.finish(94);

              case 98:
                return _context20.finish(91);

              case 99:
                _iteratorNormalCompletion17 = true;
                _context20.next = 20;
                break;

              case 102:
                _context20.next = 108;
                break;

              case 104:
                _context20.prev = 104;
                _context20.t3 = _context20["catch"](18);
                _didIteratorError17 = true;
                _iteratorError17 = _context20.t3;

              case 108:
                _context20.prev = 108;
                _context20.prev = 109;

                if (!_iteratorNormalCompletion17 && _iterator17["return"] != null) {
                  _iterator17["return"]();
                }

              case 111:
                _context20.prev = 111;

                if (!_didIteratorError17) {
                  _context20.next = 114;
                  break;
                }

                throw _iteratorError17;

              case 114:
                return _context20.finish(111);

              case 115:
                return _context20.finish(108);

              case 116:
                return _context20.abrupt("return", "hola");

              case 119:
                _context20.prev = 119;
                _context20.t4 = _context20["catch"](14);

              case 121:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20, null, [[14, 119], [18, 104, 108, 116], [27, 39, 43, 51], [44,, 46, 50], [54, 87, 91, 99], [64, 68, 72, 80], [73,, 75, 79], [92,, 94, 98], [109,, 111, 115]]);
      }))();
    },
    eliminarProyecto: function eliminarProyecto(root, args, context) {
      return _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee21() {
        var token, _blacklist, decoded, _proyecto, laboratorio, _iteratorNormalCompletion21, _didIteratorError21, _iteratorError21, _iterator21, _step21, val;

        return regeneratorRuntime.wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                token = context.token;
                _context21.next = 3;
                return _blackList["default"].find({
                  token: token
                }).findOne();

              case 3:
                _blacklist = _context21.sent;

                if (!(!context.token || (0, _index.verifyExp)(token) || !_blacklist == "")) {
                  _context21.next = 6;
                  break;
                }

                return _context21.abrupt("return", "Tu sesion ha expirado");

              case 6:
                _context21.prev = 6;
                decoded = _jsonwebtoken["default"].decode(token, SECRET);
                _proyecto = args["proyecto"];
                _context21.next = 11;
                return _labs["default"].where({
                  siglas: decoded["siglas"]
                }).findOneAndUpdate();

              case 11:
                laboratorio = _context21.sent;
                _iteratorNormalCompletion21 = true;
                _didIteratorError21 = false;
                _iteratorError21 = undefined;
                _context21.prev = 15;

                for (_iterator21 = laboratorio.proyectos[Symbol.iterator](); !(_iteratorNormalCompletion21 = (_step21 = _iterator21.next()).done); _iteratorNormalCompletion21 = true) {
                  val = _step21.value;

                  if (val.proyecto == _proyecto) {
                    val.status = "Eliminado";
                  }
                }

                _context21.next = 23;
                break;

              case 19:
                _context21.prev = 19;
                _context21.t0 = _context21["catch"](15);
                _didIteratorError21 = true;
                _iteratorError21 = _context21.t0;

              case 23:
                _context21.prev = 23;
                _context21.prev = 24;

                if (!_iteratorNormalCompletion21 && _iterator21["return"] != null) {
                  _iterator21["return"]();
                }

              case 26:
                _context21.prev = 26;

                if (!_didIteratorError21) {
                  _context21.next = 29;
                  break;
                }

                throw _iteratorError21;

              case 29:
                return _context21.finish(26);

              case 30:
                return _context21.finish(23);

              case 31:
                _context21.next = 33;
                return laboratorio.save();

              case 33:
                return _context21.abrupt("return", "eliminado");

              case 36:
                _context21.prev = 36;
                _context21.t1 = _context21["catch"](6);

              case 38:
              case "end":
                return _context21.stop();
            }
          }
        }, _callee21, null, [[6, 36], [15, 19, 23, 31], [24,, 26, 30]]);
      }))();
    },
    agregarAlumno: function agregarAlumno(root, args, context) {
      return _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee22() {
        var alumno, ape_p, ape_m, correo, telefono, institucion, carrera, semestre_cursado, domicilio, usuario, clave, passHashed;
        return regeneratorRuntime.wrap(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                _context22.prev = 0;
                alumno = args.alumno, ape_p = args.ape_p, ape_m = args.ape_m, correo = args.correo, telefono = args.telefono, institucion = args.institucion, carrera = args.carrera, semestre_cursado = args.semestre_cursado, domicilio = args.domicilio, usuario = args.usuario;
                clave = args.clave;
                _context22.next = 5;
                return _bcrypt["default"].hash(clave, 10);

              case 5:
                passHashed = _context22.sent;
                clave = passHashed;
                _context22.next = 9;
                return _alumnos2["default"].findOne({
                  "correo": correo
                });

              case 9:
                if (!_context22.sent) {
                  _context22.next = 17;
                  break;
                }

                _context22.next = 12;
                return _alumnos2["default"].findOne({
                  "usuario": usuario
                });

              case 12:
                if (!_context22.sent) {
                  _context22.next = 14;
                  break;
                }

                return _context22.abrupt("return", "Usuario y correo existentes ");

              case 14:
                return _context22.abrupt("return", "Correo existente");

              case 17:
                _context22.next = 19;
                return _alumnos2["default"].findOne({
                  "usuario": usuario
                });

              case 19:
                if (!_context22.sent) {
                  _context22.next = 21;
                  break;
                }

                return _context22.abrupt("return", "Usuario existente");

              case 21:
                _context22.next = 23;
                return new _alumnos2["default"]({
                  alumno: alumno,
                  ape_p: ape_p,
                  ape_m: ape_m,
                  correo: correo,
                  telefono: telefono,
                  institucion: institucion,
                  carrera: carrera,
                  semestre_cursado: semestre_cursado,
                  domicilio: domicilio,
                  usuario: usuario,
                  clave: clave
                }).save();

              case 23:
                return _context22.abrupt("return", "Usuario registrado");

              case 26:
                _context22.prev = 26;
                _context22.t0 = _context22["catch"](0);
                return _context22.abrupt("return", _context22.t0);

              case 29:
              case "end":
                return _context22.stop();
            }
          }
        }, _callee22, null, [[0, 26]]);
      }))();
    },
    actualizarALumno: function actualizarALumno(root, args, context) {
      return _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee23() {
        var token, _blacklist, _id, clave, Clave, _alumno, Alumno, chAdmins, chLabs, _i2, _alumno2, val, typeUser, nombre, usuario, msjerror;

        return regeneratorRuntime.wrap(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                token = context.token;
                _context23.next = 3;
                return _blackList["default"].find({
                  token: token
                }).findOne();

              case 3:
                _blacklist = _context23.sent;

                if (!(!context.token || (0, _index.verifyExp)(token) || !_blacklist == "")) {
                  _context23.next = 6;
                  break;
                }

                return _context23.abrupt("return", "Tu sesion ha expirado");

              case 6:
                _id = args._id;
                clave = args.clave;
                _context23.next = 10;
                return _bcrypt["default"].hash(clave, 10);

              case 10:
                Clave = _context23.sent;
                _context23.prev = 11;
                _alumno = ["alumno", "ape_p", "ape_m", "correo", "telefono", "institucion", "carrera", "semestre_cursado", "domicilio", "usuario"];
                _context23.next = 15;
                return _alumnos2["default"].where({
                  _id: _id
                }).findOneAndUpdate();

              case 15:
                Alumno = _context23.sent;
                _context23.next = 18;
                return _admin2["default"].where({
                  usuario: args["usuario"]
                }).findOne();

              case 18:
                chAdmins = _context23.sent;
                _context23.next = 21;
                return _labs["default"].where({
                  usuario: args["usuario"]
                }).findOne();

              case 21:
                chLabs = _context23.sent;

                if (!(!chLabs == "" || !chAdmins == "")) {
                  _context23.next = 24;
                  break;
                }

                return _context23.abrupt("return", "Usuario existente");

              case 24:
                for (_i2 = 0, _alumno2 = _alumno; _i2 < _alumno2.length; _i2++) {
                  val = _alumno2[_i2];

                  if (args[val] != "") {
                    Alumno[val] = args[val];
                  }
                }

                if (clave != "") {
                  Alumno["clave"] = Clave;
                }

                typeUser = "2";
                nombre = Alumno.alumno;
                usuario = Alumno.usuario;
                _context23.next = 31;
                return Alumno.save();

              case 31:
                return _context23.abrupt("return", _jsonwebtoken["default"].sign({
                  usuario: usuario,
                  nombre: nombre,
                  typeUser: typeUser,
                  _id: _id
                }, SECRET, {
                  expiresIn: '2h'
                }));

              case 34:
                _context23.prev = 34;
                _context23.t0 = _context23["catch"](11);
                msjerror = _context23.t0.message;

                if (!msjerror.includes('usuario')) {
                  _context23.next = 41;
                  break;
                }

                return _context23.abrupt("return", "Usuario existente");

              case 41:
                if (!msjerror.includes('correo')) {
                  _context23.next = 43;
                  break;
                }

                return _context23.abrupt("return", "Correo existente");

              case 43:
              case "end":
                return _context23.stop();
            }
          }
        }, _callee23, null, [[11, 34]]);
      }))();
    },
    updateAdmin: function updateAdmin(root, args, context) {
      return _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee24() {
        var token, decoded, user, _blacklist, clave, Clave, _admin, newData, _i3, _newData, val, typeUser, usuario, nombre;

        return regeneratorRuntime.wrap(function _callee24$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                _context24.prev = 0;
                token = context.token;
                decoded = _jsonwebtoken["default"].decode(token, SECRET);
                user = decoded.usuario;
                _context24.next = 6;
                return _blackList["default"].find({
                  token: token
                }).findOne();

              case 6:
                _blacklist = _context24.sent;

                if (!(!context.token || (0, _index.verifyExp)(token) || !_blacklist == "")) {
                  _context24.next = 9;
                  break;
                }

                return _context24.abrupt("return", "Tu sesion ha expirado");

              case 9:
                clave = args.clave;
                _context24.next = 12;
                return _bcrypt["default"].hash(clave, 10);

              case 12:
                Clave = _context24.sent;
                _context24.next = 15;
                return _admin2["default"].where({
                  usuario: user
                }).findOneAndUpdate();

              case 15:
                _admin = _context24.sent;
                newData = ["nombre", "usuario"];

                for (_i3 = 0, _newData = newData; _i3 < _newData.length; _i3++) {
                  val = _newData[_i3];

                  if (args[val] != "" || args[val] != null) {
                    _admin[val] = args[val];
                  }
                }

                if (clave != "") {
                  _admin["clave"] = Clave;
                }

                _context24.next = 21;
                return _admin.save();

              case 21:
                typeUser = "0";
                usuario = _admin["usuario"];
                nombre = _admin["nombre"];
                return _context24.abrupt("return", _jsonwebtoken["default"].sign({
                  usuario: usuario,
                  nombre: nombre,
                  typeUser: typeUser
                }, SECRET, {
                  expiresIn: '2h'
                }));

              case 27:
                _context24.prev = 27;
                _context24.t0 = _context24["catch"](0);
                return _context24.abrupt("return", _context24.t0);

              case 30:
              case "end":
                return _context24.stop();
            }
          }
        }, _callee24, null, [[0, 27]]);
      }))();
    },
    nuevoAdmin: function nuevoAdmin(root, args, context) {
      return _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee25() {
        var token, _blacklist, nombre, usuario, clave, passHashed;

        return regeneratorRuntime.wrap(function _callee25$(_context25) {
          while (1) {
            switch (_context25.prev = _context25.next) {
              case 0:
                _context25.prev = 0;
                token = context.token;
                _context25.next = 4;
                return _blackList["default"].find({
                  token: token
                }).findOne();

              case 4:
                _blacklist = _context25.sent;
                //if (!context.token || verifyExp(token) || !_blacklist=="") return "Tu sesion ha expirado";
                nombre = args.nombre, usuario = args.usuario;
                clave = args.clave;
                _context25.next = 9;
                return _bcrypt["default"].hash(clave, 10);

              case 9:
                passHashed = _context25.sent;
                clave = passHashed;
                _context25.next = 13;
                return new _admin2["default"]({
                  nombre: nombre,
                  usuario: usuario,
                  clave: clave
                }).save();

              case 13:
                return _context25.abrupt("return", "guardado");

              case 16:
                _context25.prev = 16;
                _context25.t0 = _context25["catch"](0);
                return _context25.abrupt("return", _context25.t0);

              case 19:
              case "end":
                return _context25.stop();
            }
          }
        }, _callee25, null, [[0, 16]]);
      }))();
    },
    solicitarProyecto: function solicitarProyecto(root, args, context) {
      return _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee26() {
        var token, _blacklist, decoded, nombre, proyecto, alumno, alum, laboratorio, _iteratorNormalCompletion22, _didIteratorError22, _iteratorError22, _iterator22, _step22, val, _status;

        return regeneratorRuntime.wrap(function _callee26$(_context26) {
          while (1) {
            switch (_context26.prev = _context26.next) {
              case 0:
                token = context.token;
                _context26.next = 3;
                return _blackList["default"].find({
                  token: token
                }).findOne();

              case 3:
                _blacklist = _context26.sent;

                if (!(!context.token || (0, _index.verifyExp)(token) || !_blacklist == "")) {
                  _context26.next = 6;
                  break;
                }

                return _context26.abrupt("return", "Tu sesion ha expirado");

              case 6:
                decoded = _jsonwebtoken["default"].decode(context.token, SECRET);
                nombre = args.nombre, proyecto = args.proyecto;
                alumno = decoded["usuario"];
                _context26.next = 11;
                return _alumnos2["default"].where({
                  usuario: alumno
                }).findOneAndUpdate();

              case 11:
                alum = _context26.sent;
                _context26.next = 14;
                return _labs["default"].where({
                  siglas: nombre
                }).findOneAndUpdate();

              case 14:
                laboratorio = _context26.sent;
                _iteratorNormalCompletion22 = true;
                _didIteratorError22 = false;
                _iteratorError22 = undefined;
                _context26.prev = 18;

                for (_iterator22 = laboratorio.proyectos[Symbol.iterator](); !(_iteratorNormalCompletion22 = (_step22 = _iterator22.next()).done); _iteratorNormalCompletion22 = true) {
                  val = _step22.value;

                  if (val["proyecto"] == proyecto) {
                    val.alumnos.push({
                      _id: alum._id,
                      status: "En espera"
                    });
                  }
                }

                _context26.next = 26;
                break;

              case 22:
                _context26.prev = 22;
                _context26.t0 = _context26["catch"](18);
                _didIteratorError22 = true;
                _iteratorError22 = _context26.t0;

              case 26:
                _context26.prev = 26;
                _context26.prev = 27;

                if (!_iteratorNormalCompletion22 && _iterator22["return"] != null) {
                  _iterator22["return"]();
                }

              case 29:
                _context26.prev = 29;

                if (!_didIteratorError22) {
                  _context26.next = 32;
                  break;
                }

                throw _iteratorError22;

              case 32:
                return _context26.finish(29);

              case 33:
                return _context26.finish(26);

              case 34:
                _status = "En espera";
                alum.solicitudes.push({
                  nombre: nombre,
                  proyecto: proyecto,
                  _status: _status
                });
                _context26.next = 38;
                return laboratorio.save();

              case 38:
                _context26.next = 40;
                return alum.save();

              case 40:
                return _context26.abrupt("return", "hola");

              case 41:
              case "end":
                return _context26.stop();
            }
          }
        }, _callee26, null, [[18, 22, 26, 34], [27,, 29, 33]]);
      }))();
    },
    aceptarSolicitud: function aceptarSolicitud(root, args, context) {
      return _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee27() {
        var nombre, proyecto, _id, accion, laboratorio, _iteratorNormalCompletion23, _didIteratorError23, _iteratorError23, _iterator23, _step23, val, _iteratorNormalCompletion24, _didIteratorError24, _iteratorError24, _iterator24, _step24, val2, alum, _iteratorNormalCompletion25, _didIteratorError25, _iteratorError25, _iterator25, _step25, val3;

        return regeneratorRuntime.wrap(function _callee27$(_context27) {
          while (1) {
            switch (_context27.prev = _context27.next) {
              case 0:
                nombre = args.nombre, proyecto = args.proyecto, _id = args._id, accion = args.accion;
                _context27.next = 3;
                return _labs["default"].where({
                  siglas: nombre
                }).findOneAndUpdate();

              case 3:
                laboratorio = _context27.sent;
                _iteratorNormalCompletion23 = true;
                _didIteratorError23 = false;
                _iteratorError23 = undefined;
                _context27.prev = 7;
                _iterator23 = laboratorio.proyectos[Symbol.iterator]();

              case 9:
                if (_iteratorNormalCompletion23 = (_step23 = _iterator23.next()).done) {
                  _context27.next = 65;
                  break;
                }

                val = _step23.value;

                if (!(val.proyecto === proyecto)) {
                  _context27.next = 62;
                  break;
                }

                _iteratorNormalCompletion24 = true;
                _didIteratorError24 = false;
                _iteratorError24 = undefined;
                _context27.prev = 15;
                _iterator24 = val.alumnos[Symbol.iterator]();

              case 17:
                if (_iteratorNormalCompletion24 = (_step24 = _iterator24.next()).done) {
                  _context27.next = 48;
                  break;
                }

                val2 = _step24.value;

                if (!(val2._id === _id)) {
                  _context27.next = 45;
                  break;
                }

                _context27.next = 22;
                return _alumnos2["default"].where({
                  _id: _id
                }).findOneAndUpdate();

              case 22:
                alum = _context27.sent;
                _iteratorNormalCompletion25 = true;
                _didIteratorError25 = false;
                _iteratorError25 = undefined;
                _context27.prev = 26;

                for (_iterator25 = alum.solicitudes[Symbol.iterator](); !(_iteratorNormalCompletion25 = (_step25 = _iterator25.next()).done); _iteratorNormalCompletion25 = true) {
                  val3 = _step25.value;

                  if (val3.proyecto === proyecto && val3.nombre === nombre) {
                    val3._status = accion;
                  }
                }

                _context27.next = 34;
                break;

              case 30:
                _context27.prev = 30;
                _context27.t0 = _context27["catch"](26);
                _didIteratorError25 = true;
                _iteratorError25 = _context27.t0;

              case 34:
                _context27.prev = 34;
                _context27.prev = 35;

                if (!_iteratorNormalCompletion25 && _iterator25["return"] != null) {
                  _iterator25["return"]();
                }

              case 37:
                _context27.prev = 37;

                if (!_didIteratorError25) {
                  _context27.next = 40;
                  break;
                }

                throw _iteratorError25;

              case 40:
                return _context27.finish(37);

              case 41:
                return _context27.finish(34);

              case 42:
                _context27.next = 44;
                return alum.save();

              case 44:
                val2.status = accion;

              case 45:
                _iteratorNormalCompletion24 = true;
                _context27.next = 17;
                break;

              case 48:
                _context27.next = 54;
                break;

              case 50:
                _context27.prev = 50;
                _context27.t1 = _context27["catch"](15);
                _didIteratorError24 = true;
                _iteratorError24 = _context27.t1;

              case 54:
                _context27.prev = 54;
                _context27.prev = 55;

                if (!_iteratorNormalCompletion24 && _iterator24["return"] != null) {
                  _iterator24["return"]();
                }

              case 57:
                _context27.prev = 57;

                if (!_didIteratorError24) {
                  _context27.next = 60;
                  break;
                }

                throw _iteratorError24;

              case 60:
                return _context27.finish(57);

              case 61:
                return _context27.finish(54);

              case 62:
                _iteratorNormalCompletion23 = true;
                _context27.next = 9;
                break;

              case 65:
                _context27.next = 71;
                break;

              case 67:
                _context27.prev = 67;
                _context27.t2 = _context27["catch"](7);
                _didIteratorError23 = true;
                _iteratorError23 = _context27.t2;

              case 71:
                _context27.prev = 71;
                _context27.prev = 72;

                if (!_iteratorNormalCompletion23 && _iterator23["return"] != null) {
                  _iterator23["return"]();
                }

              case 74:
                _context27.prev = 74;

                if (!_didIteratorError23) {
                  _context27.next = 77;
                  break;
                }

                throw _iteratorError23;

              case 77:
                return _context27.finish(74);

              case 78:
                return _context27.finish(71);

              case 79:
                _context27.next = 81;
                return laboratorio.save();

              case 81:
                return _context27.abrupt("return", "hecho...");

              case 82:
              case "end":
                return _context27.stop();
            }
          }
        }, _callee27, null, [[7, 67, 71, 79], [15, 50, 54, 62], [26, 30, 34, 42], [35,, 37, 41], [55,, 57, 61], [72,, 74, 78]]);
      }))();
    },
    aceptarNuevoProyecto: function aceptarNuevoProyecto(root, args, context) {
      return _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee28() {
        var nombre, proyecto, accion, laboratorio, _iteratorNormalCompletion26, _didIteratorError26, _iteratorError26, _iterator26, _step26, val;

        return regeneratorRuntime.wrap(function _callee28$(_context28) {
          while (1) {
            switch (_context28.prev = _context28.next) {
              case 0:
                nombre = args.nombre, proyecto = args.proyecto, accion = args.accion;
                _context28.next = 3;
                return _labs["default"].where({
                  siglas: nombre
                }).findOneAndUpdate();

              case 3:
                laboratorio = _context28.sent;
                _iteratorNormalCompletion26 = true;
                _didIteratorError26 = false;
                _iteratorError26 = undefined;
                _context28.prev = 7;

                for (_iterator26 = laboratorio.proyectos[Symbol.iterator](); !(_iteratorNormalCompletion26 = (_step26 = _iterator26.next()).done); _iteratorNormalCompletion26 = true) {
                  val = _step26.value;

                  if (val.proyecto === proyecto) {
                    val.status = accion;
                  }
                }

                _context28.next = 15;
                break;

              case 11:
                _context28.prev = 11;
                _context28.t0 = _context28["catch"](7);
                _didIteratorError26 = true;
                _iteratorError26 = _context28.t0;

              case 15:
                _context28.prev = 15;
                _context28.prev = 16;

                if (!_iteratorNormalCompletion26 && _iterator26["return"] != null) {
                  _iterator26["return"]();
                }

              case 18:
                _context28.prev = 18;

                if (!_didIteratorError26) {
                  _context28.next = 21;
                  break;
                }

                throw _iteratorError26;

              case 21:
                return _context28.finish(18);

              case 22:
                return _context28.finish(15);

              case 23:
                _context28.next = 25;
                return laboratorio.save();

              case 25:
              case "end":
                return _context28.stop();
            }
          }
        }, _callee28, null, [[7, 11, 15, 23], [16,, 18, 22]]);
      }))();
    },
    cancelarSolicitudAlumno: function cancelarSolicitudAlumno(root, args, context) {
      return _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee29() {
        var nombre, proyecto, token, _blacklist, decoded, alumno, _iteratorNormalCompletion27, _didIteratorError27, _iteratorError27, _iterator27, _step27, val, laboratorio, _iteratorNormalCompletion28, _didIteratorError28, _iteratorError28, _iterator28, _step28, _val2, _iteratorNormalCompletion29, _didIteratorError29, _iteratorError29, _iterator29, _step29, val2;

        return regeneratorRuntime.wrap(function _callee29$(_context29) {
          while (1) {
            switch (_context29.prev = _context29.next) {
              case 0:
                nombre = args.nombre, proyecto = args.proyecto;
                token = context.token;
                _context29.next = 4;
                return _blackList["default"].find({
                  token: token
                }).findOne();

              case 4:
                _blacklist = _context29.sent;

                if (!(!context.token || (0, _index.verifyExp)(token) || !_blacklist == "")) {
                  _context29.next = 7;
                  break;
                }

                return _context29.abrupt("return", "Tu sesion ha expirado");

              case 7:
                decoded = _jsonwebtoken["default"].decode(token, SECRET);
                _context29.next = 10;
                return _alumnos2["default"].where({
                  usuario: decoded["usuario"]
                }).findOneAndUpdate();

              case 10:
                alumno = _context29.sent;
                _iteratorNormalCompletion27 = true;
                _didIteratorError27 = false;
                _iteratorError27 = undefined;
                _context29.prev = 14;

                for (_iterator27 = alumno.solicitudes[Symbol.iterator](); !(_iteratorNormalCompletion27 = (_step27 = _iterator27.next()).done); _iteratorNormalCompletion27 = true) {
                  val = _step27.value;

                  if (val.proyecto === proyecto) {
                    val._status = "cancelado";
                  }
                }

                _context29.next = 22;
                break;

              case 18:
                _context29.prev = 18;
                _context29.t0 = _context29["catch"](14);
                _didIteratorError27 = true;
                _iteratorError27 = _context29.t0;

              case 22:
                _context29.prev = 22;
                _context29.prev = 23;

                if (!_iteratorNormalCompletion27 && _iterator27["return"] != null) {
                  _iterator27["return"]();
                }

              case 25:
                _context29.prev = 25;

                if (!_didIteratorError27) {
                  _context29.next = 28;
                  break;
                }

                throw _iteratorError27;

              case 28:
                return _context29.finish(25);

              case 29:
                return _context29.finish(22);

              case 30:
                _context29.next = 32;
                return alumno.save();

              case 32:
                _context29.next = 34;
                return _labs["default"].where({
                  nombre: nombre
                }).findOneAndUpdate();

              case 34:
                laboratorio = _context29.sent;
                _iteratorNormalCompletion28 = true;
                _didIteratorError28 = false;
                _iteratorError28 = undefined;
                _context29.prev = 38;
                _iterator28 = laboratorio.proyectos[Symbol.iterator]();

              case 40:
                if (_iteratorNormalCompletion28 = (_step28 = _iterator28.next()).done) {
                  _context29.next = 65;
                  break;
                }

                _val2 = _step28.value;

                if (!(_val2.proyecto === proyecto)) {
                  _context29.next = 62;
                  break;
                }

                _iteratorNormalCompletion29 = true;
                _didIteratorError29 = false;
                _iteratorError29 = undefined;
                _context29.prev = 46;

                for (_iterator29 = _val2.alumnos[Symbol.iterator](); !(_iteratorNormalCompletion29 = (_step29 = _iterator29.next()).done); _iteratorNormalCompletion29 = true) {
                  val2 = _step29.value;

                  if (val2._id === alumno._id) {
                    val2.status = "cancelado";
                  }
                }

                _context29.next = 54;
                break;

              case 50:
                _context29.prev = 50;
                _context29.t1 = _context29["catch"](46);
                _didIteratorError29 = true;
                _iteratorError29 = _context29.t1;

              case 54:
                _context29.prev = 54;
                _context29.prev = 55;

                if (!_iteratorNormalCompletion29 && _iterator29["return"] != null) {
                  _iterator29["return"]();
                }

              case 57:
                _context29.prev = 57;

                if (!_didIteratorError29) {
                  _context29.next = 60;
                  break;
                }

                throw _iteratorError29;

              case 60:
                return _context29.finish(57);

              case 61:
                return _context29.finish(54);

              case 62:
                _iteratorNormalCompletion28 = true;
                _context29.next = 40;
                break;

              case 65:
                _context29.next = 71;
                break;

              case 67:
                _context29.prev = 67;
                _context29.t2 = _context29["catch"](38);
                _didIteratorError28 = true;
                _iteratorError28 = _context29.t2;

              case 71:
                _context29.prev = 71;
                _context29.prev = 72;

                if (!_iteratorNormalCompletion28 && _iterator28["return"] != null) {
                  _iterator28["return"]();
                }

              case 74:
                _context29.prev = 74;

                if (!_didIteratorError28) {
                  _context29.next = 77;
                  break;
                }

                throw _iteratorError28;

              case 77:
                return _context29.finish(74);

              case 78:
                return _context29.finish(71);

              case 79:
                _context29.next = 81;
                return laboratorio.save();

              case 81:
                return _context29.abrupt("return", "Hecho");

              case 82:
              case "end":
                return _context29.stop();
            }
          }
        }, _callee29, null, [[14, 18, 22, 30], [23,, 25, 29], [38, 67, 71, 79], [46, 50, 54, 62], [55,, 57, 61], [72,, 74, 78]]);
      }))();
    },
    Metodologia: function Metodologia(root, args, context) {
      return _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee30() {
        var nombre, proyecto, metodologia, lab, _iteratorNormalCompletion30, _didIteratorError30, _iteratorError30, _iterator30, _step30, val;

        return regeneratorRuntime.wrap(function _callee30$(_context30) {
          while (1) {
            switch (_context30.prev = _context30.next) {
              case 0:
                nombre = args.nombre, proyecto = args.proyecto, metodologia = args.metodologia;
                _context30.next = 3;
                return _labs["default"].where({
                  nombre: nombre
                }).findOneAndUpdate();

              case 3:
                lab = _context30.sent;
                _context30.prev = 4;
                _iteratorNormalCompletion30 = true;
                _didIteratorError30 = false;
                _iteratorError30 = undefined;
                _context30.prev = 8;

                for (_iterator30 = lab.proyectos[Symbol.iterator](); !(_iteratorNormalCompletion30 = (_step30 = _iterator30.next()).done); _iteratorNormalCompletion30 = true) {
                  val = _step30.value;

                  if (val.proyecto === proyecto) {
                    if (val.avances.metodologia != "") {
                      console.log("gola");
                      val.avances.metodologia = metodologia;
                    } else {
                      val.avances = {
                        metodologia: metodologia
                      };
                    }
                  }
                }

                _context30.next = 16;
                break;

              case 12:
                _context30.prev = 12;
                _context30.t0 = _context30["catch"](8);
                _didIteratorError30 = true;
                _iteratorError30 = _context30.t0;

              case 16:
                _context30.prev = 16;
                _context30.prev = 17;

                if (!_iteratorNormalCompletion30 && _iterator30["return"] != null) {
                  _iterator30["return"]();
                }

              case 19:
                _context30.prev = 19;

                if (!_didIteratorError30) {
                  _context30.next = 22;
                  break;
                }

                throw _iteratorError30;

              case 22:
                return _context30.finish(19);

              case 23:
                return _context30.finish(16);

              case 24:
                _context30.next = 26;
                return lab.save();

              case 26:
                return _context30.abrupt("return", "Metodologia agregada");

              case 29:
                _context30.prev = 29;
                _context30.t1 = _context30["catch"](4);
                return _context30.abrupt("return", _context30.t1);

              case 32:
              case "end":
                return _context30.stop();
            }
          }
        }, _callee30, null, [[4, 29], [8, 12, 16, 24], [17,, 19, 23]]);
      }))();
    },
    asignarAvance: function asignarAvance(root, args, context) {
      return _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee31() {
        var nombre, proyecto, fase, actividad, semanaInicial, semanaTerminacion, lab, _iteratorNormalCompletion31, _didIteratorError31, _iteratorError31, _iterator31, _step31, val, existe, _iteratorNormalCompletion32, _didIteratorError32, _iteratorError32, _iterator32, _step32, val2;

        return regeneratorRuntime.wrap(function _callee31$(_context31) {
          while (1) {
            switch (_context31.prev = _context31.next) {
              case 0:
                nombre = args.nombre, proyecto = args.proyecto, fase = args.fase, actividad = args.actividad, semanaInicial = args.semanaInicial, semanaTerminacion = args.semanaTerminacion;
                _context31.next = 3;
                return _labs["default"].where({
                  nombre: nombre
                }).findOneAndUpdate();

              case 3:
                lab = _context31.sent;
                _context31.prev = 4;
                _iteratorNormalCompletion31 = true;
                _didIteratorError31 = false;
                _iteratorError31 = undefined;
                _context31.prev = 8;
                _iterator31 = lab.proyectos[Symbol.iterator]();

              case 10:
                if (_iteratorNormalCompletion31 = (_step31 = _iterator31.next()).done) {
                  _context31.next = 41;
                  break;
                }

                val = _step31.value;

                if (!(val.proyecto === proyecto)) {
                  _context31.next = 38;
                  break;
                }

                existe = false;

                if (!(val.avances.fases.length > 0)) {
                  _context31.next = 37;
                  break;
                }

                // console.log("si hay datos");
                _iteratorNormalCompletion32 = true;
                _didIteratorError32 = false;
                _iteratorError32 = undefined;
                _context31.prev = 18;

                for (_iterator32 = val.avances.fases[Symbol.iterator](); !(_iteratorNormalCompletion32 = (_step32 = _iterator32.next()).done); _iteratorNormalCompletion32 = true) {
                  val2 = _step32.value;

                  if (val2.fase === fase) {
                    // console.log("funciona!");
                    existe = true;
                    val2.actividades.push({
                      _actividad: actividad,
                      semanaInicio: semanaInicial,
                      semanaTerminacion: semanaTerminacion,
                      evaluacion: null
                    });
                  }
                }

                _context31.next = 26;
                break;

              case 22:
                _context31.prev = 22;
                _context31.t0 = _context31["catch"](18);
                _didIteratorError32 = true;
                _iteratorError32 = _context31.t0;

              case 26:
                _context31.prev = 26;
                _context31.prev = 27;

                if (!_iteratorNormalCompletion32 && _iterator32["return"] != null) {
                  _iterator32["return"]();
                }

              case 29:
                _context31.prev = 29;

                if (!_didIteratorError32) {
                  _context31.next = 32;
                  break;
                }

                throw _iteratorError32;

              case 32:
                return _context31.finish(29);

              case 33:
                return _context31.finish(26);

              case 34:
                if (!existe) {
                  // console.log("no existe la fase");
                  val.avances.fases.push({
                    fase: fase,
                    actividades: {
                      _actividad: actividad,
                      semanaInicio: semanaInicial,
                      semanaTerminacion: semanaTerminacion,
                      evaluacion: null
                    }
                  });
                }

                _context31.next = 38;
                break;

              case 37:
                // console.log("no hay ni una fase");
                val.avances.fases.push({
                  fase: fase,
                  actividades: {
                    _actividad: actividad,
                    semanaInicio: semanaInicial,
                    semanaTerminacion: semanaTerminacion,
                    evaluacion: null
                  }
                });

              case 38:
                _iteratorNormalCompletion31 = true;
                _context31.next = 10;
                break;

              case 41:
                _context31.next = 47;
                break;

              case 43:
                _context31.prev = 43;
                _context31.t1 = _context31["catch"](8);
                _didIteratorError31 = true;
                _iteratorError31 = _context31.t1;

              case 47:
                _context31.prev = 47;
                _context31.prev = 48;

                if (!_iteratorNormalCompletion31 && _iterator31["return"] != null) {
                  _iterator31["return"]();
                }

              case 50:
                _context31.prev = 50;

                if (!_didIteratorError31) {
                  _context31.next = 53;
                  break;
                }

                throw _iteratorError31;

              case 53:
                return _context31.finish(50);

              case 54:
                return _context31.finish(47);

              case 55:
                _context31.next = 57;
                return lab.save();

              case 57:
                return _context31.abrupt("return", "Hecho");

              case 60:
                _context31.prev = 60;
                _context31.t2 = _context31["catch"](4);
                return _context31.abrupt("return", _context31.t2);

              case 63:
              case "end":
                return _context31.stop();
            }
          }
        }, _callee31, null, [[4, 60], [8, 43, 47, 55], [18, 22, 26, 34], [27,, 29, 33], [48,, 50, 54]]);
      }))();
    },
    calificarAvance: function calificarAvance(root, args, context) {
      return _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee32() {
        var nombre, proyecto, actividad, calificacion, lab, _iteratorNormalCompletion33, _didIteratorError33, _iteratorError33, _iterator33, _step33, val, _iteratorNormalCompletion34, _didIteratorError34, _iteratorError34, _iterator34, _step34, val2, _iteratorNormalCompletion35, _didIteratorError35, _iteratorError35, _iterator35, _step35, val3;

        return regeneratorRuntime.wrap(function _callee32$(_context32) {
          while (1) {
            switch (_context32.prev = _context32.next) {
              case 0:
                nombre = args.nombre, proyecto = args.proyecto, actividad = args.actividad, calificacion = args.calificacion;
                _context32.next = 3;
                return _labs["default"].where({
                  nombre: nombre
                }).findOneAndUpdate();

              case 3:
                lab = _context32.sent;
                _context32.prev = 4;
                _iteratorNormalCompletion33 = true;
                _didIteratorError33 = false;
                _iteratorError33 = undefined;
                _context32.prev = 8;
                _iterator33 = lab.proyectos[Symbol.iterator]();

              case 10:
                if (_iteratorNormalCompletion33 = (_step33 = _iterator33.next()).done) {
                  _context32.next = 59;
                  break;
                }

                val = _step33.value;

                if (!(val.proyecto === proyecto)) {
                  _context32.next = 56;
                  break;
                }

                _iteratorNormalCompletion34 = true;
                _didIteratorError34 = false;
                _iteratorError34 = undefined;
                _context32.prev = 16;
                _iterator34 = val.avances.fases[Symbol.iterator]();

              case 18:
                if (_iteratorNormalCompletion34 = (_step34 = _iterator34.next()).done) {
                  _context32.next = 42;
                  break;
                }

                val2 = _step34.value;
                _iteratorNormalCompletion35 = true;
                _didIteratorError35 = false;
                _iteratorError35 = undefined;
                _context32.prev = 23;

                for (_iterator35 = val2.actividades[Symbol.iterator](); !(_iteratorNormalCompletion35 = (_step35 = _iterator35.next()).done); _iteratorNormalCompletion35 = true) {
                  val3 = _step35.value;

                  if (val3._actividad === actividad) {
                    val3.evaluacion = calificacion;
                  }
                }

                _context32.next = 31;
                break;

              case 27:
                _context32.prev = 27;
                _context32.t0 = _context32["catch"](23);
                _didIteratorError35 = true;
                _iteratorError35 = _context32.t0;

              case 31:
                _context32.prev = 31;
                _context32.prev = 32;

                if (!_iteratorNormalCompletion35 && _iterator35["return"] != null) {
                  _iterator35["return"]();
                }

              case 34:
                _context32.prev = 34;

                if (!_didIteratorError35) {
                  _context32.next = 37;
                  break;
                }

                throw _iteratorError35;

              case 37:
                return _context32.finish(34);

              case 38:
                return _context32.finish(31);

              case 39:
                _iteratorNormalCompletion34 = true;
                _context32.next = 18;
                break;

              case 42:
                _context32.next = 48;
                break;

              case 44:
                _context32.prev = 44;
                _context32.t1 = _context32["catch"](16);
                _didIteratorError34 = true;
                _iteratorError34 = _context32.t1;

              case 48:
                _context32.prev = 48;
                _context32.prev = 49;

                if (!_iteratorNormalCompletion34 && _iterator34["return"] != null) {
                  _iterator34["return"]();
                }

              case 51:
                _context32.prev = 51;

                if (!_didIteratorError34) {
                  _context32.next = 54;
                  break;
                }

                throw _iteratorError34;

              case 54:
                return _context32.finish(51);

              case 55:
                return _context32.finish(48);

              case 56:
                _iteratorNormalCompletion33 = true;
                _context32.next = 10;
                break;

              case 59:
                _context32.next = 65;
                break;

              case 61:
                _context32.prev = 61;
                _context32.t2 = _context32["catch"](8);
                _didIteratorError33 = true;
                _iteratorError33 = _context32.t2;

              case 65:
                _context32.prev = 65;
                _context32.prev = 66;

                if (!_iteratorNormalCompletion33 && _iterator33["return"] != null) {
                  _iterator33["return"]();
                }

              case 68:
                _context32.prev = 68;

                if (!_didIteratorError33) {
                  _context32.next = 71;
                  break;
                }

                throw _iteratorError33;

              case 71:
                return _context32.finish(68);

              case 72:
                return _context32.finish(65);

              case 73:
                _context32.next = 75;
                return lab.save();

              case 75:
                return _context32.abrupt("return", "Hecho");

              case 78:
                _context32.prev = 78;
                _context32.t3 = _context32["catch"](4);
                return _context32.abrupt("return", _context32.t3);

              case 81:
              case "end":
                return _context32.stop();
            }
          }
        }, _callee32, null, [[4, 78], [8, 61, 65, 73], [16, 44, 48, 56], [23, 27, 31, 39], [32,, 34, 38], [49,, 51, 55], [66,, 68, 72]]);
      }))();
    },
    borrarCronograma: function borrarCronograma(root, args, context) {
      return _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee33() {
        var nombre, proyecto, actividad, calificacion, lab, _iteratorNormalCompletion36, _didIteratorError36, _iteratorError36, _iterator36, _step36, val;

        return regeneratorRuntime.wrap(function _callee33$(_context33) {
          while (1) {
            switch (_context33.prev = _context33.next) {
              case 0:
                nombre = args.nombre, proyecto = args.proyecto, actividad = args.actividad, calificacion = args.calificacion;
                _context33.next = 3;
                return _labs["default"].where({
                  nombre: nombre
                }).findOneAndUpdate();

              case 3:
                lab = _context33.sent;
                _context33.prev = 4;
                _iteratorNormalCompletion36 = true;
                _didIteratorError36 = false;
                _iteratorError36 = undefined;
                _context33.prev = 8;

                for (_iterator36 = lab.proyectos[Symbol.iterator](); !(_iteratorNormalCompletion36 = (_step36 = _iterator36.next()).done); _iteratorNormalCompletion36 = true) {
                  val = _step36.value;

                  if (val.proyecto === proyecto) {
                    val.avances.fases = [];
                  }
                }

                _context33.next = 16;
                break;

              case 12:
                _context33.prev = 12;
                _context33.t0 = _context33["catch"](8);
                _didIteratorError36 = true;
                _iteratorError36 = _context33.t0;

              case 16:
                _context33.prev = 16;
                _context33.prev = 17;

                if (!_iteratorNormalCompletion36 && _iterator36["return"] != null) {
                  _iterator36["return"]();
                }

              case 19:
                _context33.prev = 19;

                if (!_didIteratorError36) {
                  _context33.next = 22;
                  break;
                }

                throw _iteratorError36;

              case 22:
                return _context33.finish(19);

              case 23:
                return _context33.finish(16);

              case 24:
                _context33.next = 26;
                return lab.save();

              case 26:
                return _context33.abrupt("return", "Hecho");

              case 29:
                _context33.prev = 29;
                _context33.t1 = _context33["catch"](4);
                return _context33.abrupt("return", _context33.t1);

              case 32:
              case "end":
                return _context33.stop();
            }
          }
        }, _callee33, null, [[4, 29], [8, 12, 16, 24], [17,, 19, 23]]);
      }))();
    },
    addColaborador: function addColaborador(root, args, context) {
      return _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee34() {
        var token, _blacklist, nombre, telefono, correo, usuario, clave, passHashed, decoded, chAdmins, chLabs, chAlum, _nombre, lab, id_lab, msjerror;

        return regeneratorRuntime.wrap(function _callee34$(_context34) {
          while (1) {
            switch (_context34.prev = _context34.next) {
              case 0:
                token = context.token;
                _context34.next = 3;
                return _blackList["default"].find({
                  token: token
                }).findOne();

              case 3:
                _blacklist = _context34.sent;

                if (!(!context.token || (0, _index.verifyExp)(token) || !_blacklist == "")) {
                  _context34.next = 6;
                  break;
                }

                return _context34.abrupt("return", "Tu sesion ha expirado");

              case 6:
                nombre = args.nombre, telefono = args.telefono, correo = args.correo, usuario = args.usuario;
                clave = args.clave;
                _context34.next = 10;
                return _bcrypt["default"].hash(clave, 10);

              case 10:
                passHashed = _context34.sent;
                clave = passHashed;
                decoded = _jsonwebtoken["default"].decode(token, SECRET);
                _context34.prev = 13;
                _context34.next = 16;
                return _admin2["default"].where({
                  usuario: args["usuario"]
                }).findOne();

              case 16:
                chAdmins = _context34.sent;
                _context34.next = 19;
                return _labs["default"].where({
                  usuario: args["usuario"]
                }).findOne();

              case 19:
                chLabs = _context34.sent;
                _context34.next = 22;
                return _alumnos2["default"].where({
                  usuario: args["usuario"]
                }).findOne();

              case 22:
                chAlum = _context34.sent;

                if (!(!chLabs == "" || !chAdmins == "" || !chAlum == "")) {
                  _context34.next = 25;
                  break;
                }

                return _context34.abrupt("return", "Usuario existente");

              case 25:
                _nombre = decoded["nombre"];
                _context34.next = 28;
                return _labs["default"].where({
                  nombre: _nombre
                }).findOne();

              case 28:
                lab = _context34.sent;
                id_lab = lab._id;
                _context34.next = 32;
                return new _colaborador2["default"]({
                  nombre: nombre,
                  telefono: telefono,
                  correo: correo,
                  id_lab: id_lab,
                  usuario: usuario,
                  clave: clave
                }).save();

              case 32:
                return _context34.abrupt("return", "hecho");

              case 35:
                _context34.prev = 35;
                _context34.t0 = _context34["catch"](13);
                msjerror = _context34.t0.message;

                if (!msjerror.includes('usuario')) {
                  _context34.next = 42;
                  break;
                }

                return _context34.abrupt("return", "Usuario existente");

              case 42:
                if (!msjerror.includes('correo')) {
                  _context34.next = 44;
                  break;
                }

                return _context34.abrupt("return", "Correo existente");

              case 44:
              case "end":
                return _context34.stop();
            }
          }
        }, _callee34, null, [[13, 35]]);
      }))();
    },
    updateColaborador: function updateColaborador(root, args, context) {
      return _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee35() {
        var token, _blacklist, decoded, clave, Clave, id, _colaborador, lab, Datos, Alumno, chAdmins, chLabs, _i4, _Datos2, val, msjerror;

        return regeneratorRuntime.wrap(function _callee35$(_context35) {
          while (1) {
            switch (_context35.prev = _context35.next) {
              case 0:
                token = context.token;
                _context35.next = 3;
                return _blackList["default"].find({
                  token: token
                }).findOne();

              case 3:
                _blacklist = _context35.sent;

                if (!(!context.token || (0, _index.verifyExp)(token) || !_blacklist == "")) {
                  _context35.next = 6;
                  break;
                }

                return _context35.abrupt("return", "Tu sesion ha expirado");

              case 6:
                decoded = _jsonwebtoken["default"].decode(token, SECRET);
                clave = args.clave;
                _context35.next = 10;
                return _bcrypt["default"].hash(clave, 10);

              case 10:
                Clave = _context35.sent;
                id = decoded._id;
                _context35.prev = 12;
                _context35.next = 15;
                return _colaborador2["default"].where({
                  _id: id
                }).findOneAndUpdate();

              case 15:
                _colaborador = _context35.sent;
                _context35.next = 18;
                return _labs["default"].where({
                  _id: _colaborador.id_lab
                }).findOne();

              case 18:
                lab = _context35.sent;
                console.log(lab);
                Datos = ["nombre", "telefono", "correo", "usuario"];
                _context35.next = 23;
                return _alumnos2["default"].where({
                  usuario: args["usuario"]
                }).findOne();

              case 23:
                Alumno = _context35.sent;
                _context35.next = 26;
                return _admin2["default"].where({
                  usuario: args["usuario"]
                }).findOne();

              case 26:
                chAdmins = _context35.sent;
                _context35.next = 29;
                return _labs["default"].where({
                  usuario: args["usuario"]
                }).findOne();

              case 29:
                chLabs = _context35.sent;

                if (!(!chLabs == "" || !chAdmins == "" || !Alumno == "")) {
                  _context35.next = 32;
                  break;
                }

                return _context35.abrupt("return", "Usuario existente");

              case 32:
                for (_i4 = 0, _Datos2 = Datos; _i4 < _Datos2.length; _i4++) {
                  val = _Datos2[_i4];

                  if (args[val] != "") {
                    _colaborador[val] = args[val];
                  }
                }

                if (clave != "") {
                  _colaborador["clave"] = Clave;
                }

                _context35.next = 36;
                return _colaborador.save();

              case 36:
                return _context35.abrupt("return", "hecho");

              case 39:
                _context35.prev = 39;
                _context35.t0 = _context35["catch"](12);
                msjerror = _context35.t0.message;

                if (!msjerror.includes('usuario')) {
                  _context35.next = 46;
                  break;
                }

                return _context35.abrupt("return", "Usuario existente");

              case 46:
                if (!msjerror.includes('correo')) {
                  _context35.next = 48;
                  break;
                }

                return _context35.abrupt("return", "Correo existente");

              case 48:
                return _context35.abrupt("return", _context35.t0);

              case 49:
              case "end":
                return _context35.stop();
            }
          }
        }, _callee35, null, [[12, 39]]);
      }))();
    },
    asignarColaborador: function asignarColaborador(root, args, context) {
      return _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee36() {
        var proyecto, _id, token, _blacklist, decoded, nombre, lab, _iteratorNormalCompletion37, _didIteratorError37, _iteratorError37, _iterator37, _step37, val;

        return regeneratorRuntime.wrap(function _callee36$(_context36) {
          while (1) {
            switch (_context36.prev = _context36.next) {
              case 0:
                proyecto = args.proyecto, _id = args._id;
                token = context.token;
                _context36.next = 4;
                return _blackList["default"].find({
                  token: token
                }).findOne();

              case 4:
                _blacklist = _context36.sent;

                if (!(!context.token || (0, _index.verifyExp)(token) || !_blacklist == "")) {
                  _context36.next = 7;
                  break;
                }

                return _context36.abrupt("return", "Tu sesion ha expirado");

              case 7:
                decoded = _jsonwebtoken["default"].decode(token, SECRET);
                nombre = decoded["nombre"];
                _context36.prev = 9;
                _context36.next = 12;
                return _labs["default"].where({
                  nombre: nombre
                }).findOneAndUpdate();

              case 12:
                lab = _context36.sent;
                _iteratorNormalCompletion37 = true;
                _didIteratorError37 = false;
                _iteratorError37 = undefined;
                _context36.prev = 16;
                _iterator37 = lab.proyectos[Symbol.iterator]();

              case 18:
                if (_iteratorNormalCompletion37 = (_step37 = _iterator37.next()).done) {
                  _context36.next = 32;
                  break;
                }

                val = _step37.value;

                if (!(val.proyecto === proyecto)) {
                  _context36.next = 29;
                  break;
                }

                if (!(val.colaboradores != _id)) {
                  _context36.next = 25;
                  break;
                }

                val.colaboradores = _id;
                _context36.next = 29;
                break;

              case 25:
                val.colaboradores = "";
                _context36.next = 28;
                return lab.save();

              case 28:
                return _context36.abrupt("return", "");

              case 29:
                _iteratorNormalCompletion37 = true;
                _context36.next = 18;
                break;

              case 32:
                _context36.next = 38;
                break;

              case 34:
                _context36.prev = 34;
                _context36.t0 = _context36["catch"](16);
                _didIteratorError37 = true;
                _iteratorError37 = _context36.t0;

              case 38:
                _context36.prev = 38;
                _context36.prev = 39;

                if (!_iteratorNormalCompletion37 && _iterator37["return"] != null) {
                  _iterator37["return"]();
                }

              case 41:
                _context36.prev = 41;

                if (!_didIteratorError37) {
                  _context36.next = 44;
                  break;
                }

                throw _iteratorError37;

              case 44:
                return _context36.finish(41);

              case 45:
                return _context36.finish(38);

              case 46:
                _context36.next = 48;
                return lab.save();

              case 48:
                return _context36.abrupt("return", _id);

              case 51:
                _context36.prev = 51;
                _context36.t1 = _context36["catch"](9);
                return _context36.abrupt("return", _context36.t1);

              case 54:
              case "end":
                return _context36.stop();
            }
          }
        }, _callee36, null, [[9, 51], [16, 34, 38, 46], [39,, 41, 45]]);
      }))();
    }
  }
};
var _default = resolvers;
exports["default"] = _default;