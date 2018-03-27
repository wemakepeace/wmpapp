import {
    CREATE_CLASS_PROFILE_SUCCESS,
    CREATE_CLASS_PROFILE_ERROR,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT_SUCCESS,
    CLEAR_FEEDBACK,
    UPDATE_ERROR } from '../constants/session';

const initialState = {};

const feedback = (state = initialState, action) => {
    switch(action.type) {
        case CREATE_CLASS_PROFILE_SUCCESS:
        case LOGIN_SUCCESS:

        case CREATE_CLASS_PROFILE_ERROR:
        case LOGIN_ERROR:
        case UPDATE_ERROR:
            return action.feedback
        case CLEAR_FEEDBACK:
        case LOGOUT_SUCCESS:
            return {}
    }
    return state
}

export default feedback;
