import template from './navigation.html';
import controller from './navigation.controller';
import './navigation.scss';

let navigationComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default navigationComponent;
