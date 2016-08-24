import { combineReducers } from 'redux';
import AppReducer   from './app.reducer';
import UserReducer  from './user.reducer';

export const RootReducer = combineReducers({
    app: AppReducer,
    user: UserReducer
});
