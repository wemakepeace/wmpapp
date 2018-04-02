import {
    CREATE_TEACHER_SUCCESS,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    UPDATE_TEACHER_SUCCESS } from '../constants/teacher';

import { UPDATE_CLASS_SUCCESS, FETCH_CLASS } from '../constants/class';

const initialState = {};

const teacher = (state = initialState, action) => {
    switch(action.type) {
        case CREATE_TEACHER_SUCCESS:
            return { ...state, ...action.teacher }
        case LOGIN_SUCCESS:
            return { ...state, ...action.teacher }
        case LOGOUT_SUCCESS:
            return {}
        case UPDATE_TEACHER_SUCCESS:
            return {...state, ...action.teacher }
        case UPDATE_CLASS_SUCCESS:
            return { ...state, classes: action.updatedClass }
        case FETCH_CLASS:
            console.log('action', action)
            return { ...state, currentClass: action.currentClass }
    }
    return state
}


export default teacher;
