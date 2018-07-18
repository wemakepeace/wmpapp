import { SAVE_CLASS_SUCCESS } from '../constants/class';
import {
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    CREATE_TEACHER_SUCCESS,
    UPDATE_TEACHER_SUCCESS
} from '../constants/teacher';


const initialState = {};

const teacher = (state = initialState, action) => {
    switch(action.type) {
        case CREATE_TEACHER_SUCCESS:
            return { ...state, ...action.teacher };
        case LOGIN_SUCCESS:
            return { ...state, ...action.teacher };
        case LOGOUT_SUCCESS:
            return {};
        case UPDATE_TEACHER_SUCCESS:
            return {...state, ...action.teacher }
        case SAVE_CLASS_SUCCESS:
            const { id, name } = action._class;
            let classExists = false;
            let updatedClasses = [];

            if (state && state.classes && state.classes.length) {
                updatedClasses = state.classes.map(_class => {
                    if (_class.value === id) {
                        classExists = true;
                        return { label: name, value: id };
                    }
                    return _class;
                });
            }

            if (!classExists) {
                updatedClasses = updatedClasses.concat([{ label: name, value: id }]);
            }

            let schools = {
                ...state.schools,
                [ action._class.school.id ] : action._class.school
            };

            return {
                ...state,
                classes: updatedClasses,
                schools
            };
    }
    return state;
}

export default teacher;
