import { CREATE_CLASS_PROFILE_SUCCESS, LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../constants/class';

const initialState = {};

const classReducer = (state = initialState, action) => {
    switch(action.type) {
        case CREATE_CLASS_PROFILE_SUCCESS:
            return { ...state, ...action.user, ...action.info }
        case LOGIN_SUCCESS:
            return { ...state, ...action.user }
        case LOGOUT_SUCCESS:
            return {}
    }
    return state
}


export default classReducer;
