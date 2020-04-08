"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _queries = require("./types/queries");

var _mutations = require("./types/mutations");

var _custom = require("./types/custom");

var _subscription = require("./types/subscription");

var typeDefs = _queries.queries;
typeDefs += _mutations.mutations;
typeDefs += _custom.custom;
typeDefs += _subscription.subscriptions;
var _default = typeDefs;
exports["default"] = _default;