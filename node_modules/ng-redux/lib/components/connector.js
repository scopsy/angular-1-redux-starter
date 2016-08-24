'use strict';

exports.__esModule = true;
exports.default = Connector;

var _shallowEqual = require('../utils/shallowEqual');

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

var _wrapActionCreators = require('../utils/wrapActionCreators');

var _wrapActionCreators2 = _interopRequireDefault(_wrapActionCreators);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _lodash = require('lodash.isplainobject');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.isfunction');

var _lodash4 = _interopRequireDefault(_lodash3);

var _lodash5 = require('lodash.isobject');

var _lodash6 = _interopRequireDefault(_lodash5);

var _lodash7 = require('lodash.assign');

var _lodash8 = _interopRequireDefault(_lodash7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultMapStateToTarget = function defaultMapStateToTarget() {
  return {};
};
var defaultMapDispatchToTarget = function defaultMapDispatchToTarget(dispatch) {
  return { dispatch: dispatch };
};

function Connector(store) {
  return function (mapStateToTarget, mapDispatchToTarget) {

    var finalMapStateToTarget = mapStateToTarget || defaultMapStateToTarget;

    var finalMapDispatchToTarget = (0, _lodash2.default)(mapDispatchToTarget) ? (0, _wrapActionCreators2.default)(mapDispatchToTarget) : mapDispatchToTarget || defaultMapDispatchToTarget;

    (0, _invariant2.default)((0, _lodash4.default)(finalMapStateToTarget), 'mapStateToTarget must be a Function. Instead received %s.', finalMapStateToTarget);

    (0, _invariant2.default)((0, _lodash2.default)(finalMapDispatchToTarget) || (0, _lodash4.default)(finalMapDispatchToTarget), 'mapDispatchToTarget must be a plain Object or a Function. Instead received %s.', finalMapDispatchToTarget);

    var slice = getStateSlice(store.getState(), finalMapStateToTarget, false);
    var isFactory = (0, _lodash4.default)(slice);

    if (isFactory) {
      finalMapStateToTarget = slice;
      slice = getStateSlice(store.getState(), finalMapStateToTarget);
    }

    var boundActionCreators = finalMapDispatchToTarget(store.dispatch);

    return function (target) {

      (0, _invariant2.default)((0, _lodash4.default)(target) || (0, _lodash6.default)(target), 'The target parameter passed to connect must be a Function or a object.');

      //Initial update
      updateTarget(target, slice, boundActionCreators);

      var unsubscribe = store.subscribe(function () {
        var nextSlice = getStateSlice(store.getState(), finalMapStateToTarget);
        if (!(0, _shallowEqual2.default)(slice, nextSlice)) {
          slice = nextSlice;
          updateTarget(target, slice, boundActionCreators);
        }
      });
      return unsubscribe;
    };
  };
}

function updateTarget(target, StateSlice, dispatch) {
  if ((0, _lodash4.default)(target)) {
    target(StateSlice, dispatch);
  } else {
    (0, _lodash8.default)(target, StateSlice, dispatch);
  }
}

function getStateSlice(state, mapStateToScope) {
  var shouldReturnObject = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

  var slice = mapStateToScope(state);

  if (shouldReturnObject) {
    (0, _invariant2.default)((0, _lodash2.default)(slice), '`mapStateToScope` must return an object. Instead received %s.', slice);
  } else {
    (0, _invariant2.default)((0, _lodash2.default)(slice) || (0, _lodash4.default)(slice), '`mapStateToScope` must return an object or a function. Instead received %s.', slice);
  }

  return slice;
}