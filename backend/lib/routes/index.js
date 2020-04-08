"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = void 0;

var _express = require("express");

var _subirImagen = require("./subirImagen");

var router = (0, _express.Router)();
exports.router = router;
router.use('/api/logos', _subirImagen.filesRoutes);