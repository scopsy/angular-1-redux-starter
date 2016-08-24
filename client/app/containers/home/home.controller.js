import TodoActions from '../../actions/todo.actions';

class HomeController {
  constructor($ngRedux) {

    this.todo = '';
    this.unsubscribe = $ngRedux.connect(this.mapStateToThis, TodoActions)(this);
  }

  submitTodo(){
    this.addTodo(this.todo);
    this.todo = '';
  }

  $onDestroy(){
    this.unsubscribe();
  }

  mapStateToThis(state) {
      return {
          todos: state.todos
      };
  }
}

HomeController.$inject = ["$ngRedux"];

export default HomeController;
