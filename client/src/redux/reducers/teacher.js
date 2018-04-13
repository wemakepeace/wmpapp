import {
    CREATE_TEACHER_SUCCESS,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    UPDATE_TEACHER_SUCCESS } from '../constants/teacher';
import { SAVE_CLASS_SUCCESS } from '../constants/class';


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
        case SAVE_CLASS_SUCCESS:
            const { id, name } = action._class;
            console.log('id, name', id, name)
            console.log('state', state)
            return {
                ...state,
                classes: state.classes.concat([ { label: name, value: id }])}
    }
    return state
}


export default teacher;
