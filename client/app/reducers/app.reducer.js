import { APP } from '../constants/app';

const initialState = {
    navColor: 'navbar-default'
};

export function AppReducer(state = initialState, action) {
    switch(action.type) {
        case APP.NAVBAR_COLOR_TOGGLED:
            const newColor = (state.navColor === 'navbar-default') ? 'navbar-inverse' : 'navbar-default';
            return Object.assign(state, { navColor: newColor });
        default:
            return state;
    }
}
