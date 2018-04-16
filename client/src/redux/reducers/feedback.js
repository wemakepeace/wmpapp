import {
    CREATE_TEACHER_SUCCESS,
    CREATE_TEACHER_ERROR,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT_SUCCESS,
    CLEAR_FEEDBACK,
    UPDATE_ERROR,
    UPDATE_TEACHER_SUCCESS } from '../constants/teacher';

import { SAVE_CLASS_SUCCESS, UPDATE_SCHOOL_SUCCESS } from '../constants/class'
;

const initialState = {};

const feedback = (state = initialState, action) => {
    switch(action.type) {
        case CREATE_TEACHER_SUCCESS:
        case LOGIN_SUCCESS:
        case UPDATE_TEACHER_SUCCESS:
        case SAVE_CLASS_SUCCESS:
        case CREATE_TEACHER_ERROR:
        case LOGIN_ERROR:
        case UPDATE_ERROR:
        case UPDATE_SCHOOL_SUCCESS:
            return action.feedback
        case CLEAR_FEEDBACK:
        case LOGOUT_SUCCESS:
            return {}
    }
    return state
}

export default feedback;
