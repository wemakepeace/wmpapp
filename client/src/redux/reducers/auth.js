import { LOGIN_SUCCESS, LOGOUT_SUCCESS, CREATE_CLASS_PROFILE_SUCCESS } from '../constants/class';

const AUTH_SUCCESS = 'AUTH_SUCCESS';

const initialState = {};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
        case CREATE_CLASS_PROFILE_SUCCESS:
            return true
        case LOGOUT_SUCCESS:
            return {}
        default: return state;
    }
}


export default authReducer;
