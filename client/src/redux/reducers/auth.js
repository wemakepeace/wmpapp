import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../constants/class';

const AUTH_SUCCESS = 'AUTH_SUCCESS';

const initialState = {};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return true
        case LOGOUT_SUCCESS:
            return {}
        default: return state;
    }
}


export default authReducer;
