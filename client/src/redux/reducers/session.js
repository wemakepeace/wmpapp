import { CREATE_CLASS_PROFILE_SUCCESS, LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../constants/session';

const initialState = {};

const sessionReducer = (state = initialState, action) => {
    switch(action.type) {
        case CREATE_CLASS_PROFILE_SUCCESS:
            return { ...state, ...action.session }
        case LOGIN_SUCCESS:
            return { ...state, ...action.session }
        case LOGOUT_SUCCESS:
            return {}
    }
    return state
}


export default sessionReducer;
