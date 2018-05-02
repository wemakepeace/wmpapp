import {
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    CREATE_TEACHER_SUCCESS,
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
            let classExists = false;
            let updatedClassArray = [];

            if (state && state.classes && state.classes.length) {
                updatedClassArray = state.classes.map(_class => {
                    if (_class.value === id) {
                        classExists = true;
                        return { label: name, value: id }
                    }
                    return _class
                });
            }

            if (classExists === false) {
                updatedClassArray = updatedClassArray.concat([{ label: name, value: id }]);
            }
            let schools = {...state.schools, [action.school.id] : action.school }

            return { ...state, classes: updatedClassArray, schools }
    }
    return state;
}

export default teacher;
