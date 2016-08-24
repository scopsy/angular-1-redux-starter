'use strict';

exports.__esModule = true;

var _ngRedux = require('./components/ngRedux');

var _ngRedux2 = _interopRequireDefault(_ngRedux);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = angular.module('ngRedux', []).provider('$ngRedux', _ngRedux2.default).name;