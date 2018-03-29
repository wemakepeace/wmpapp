import {
    CREATE_CLASS_PROFILE_SUCCESS,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    UPDATE_TEACHER_SUCCESS,
    UPDATE_CLASS_SUCCESS } from '../constants/session';

const initialState = {};

const sessionReducer = (state = initialState, action) => {
    switch(action.type) {
        case CREATE_CLASS_PROFILE_SUCCESS:
            return { ...state, ...action.session }
        case LOGIN_SUCCESS:
            return { ...state, ...action.session }
        case LOGOUT_SUCCESS:
            return {}
        case UPDATE_TEACHER_SUCCESS:
            const classes = state.classes;
            return {...action.teacher, classes: classes }
        case UPDATE_CLASS_SUCCESS:
            return { ...state, classes: action.updatedClass }
    }
    return state
}


export default sessionReducer;
