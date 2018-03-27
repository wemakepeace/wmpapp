import {
    CREATE_CLASS_PROFILE_SUCCESS,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    CLEAR_FEEDBACK } from '../constants/class';

const initialState = {};

const feedback = (state = initialState, action) => {
    switch(action.type) {
        case CREATE_CLASS_PROFILE_SUCCESS:
        case LOGIN_SUCCESS:
        case LOGOUT_SUCCESS:
            return action.feedback
        case CLEAR_FEEDBACK:
            return {}
    }
    return state
}

export default feedback;
