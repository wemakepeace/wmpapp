import {
    FETCH_CLASS,
    SAVE_CLASS_SUCCESS  } from '../constants/class';
import { LOGOUT_SUCCESS } from '../constants/teacher';

const initialState = {};

const classes = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_CLASS:
            if (action._class && action._class.id) {
                return { ...state, list: { ...state.list, [action._class.id] : action._class }, currentClass: action.currentClass }
            } else {
                return { ...state, currentClass: action.currentClass }
            }

        case SAVE_CLASS_SUCCESS:
            const classId = action._class.id;
            let newState = { ...state }

            if (!newState.list) {
                newState.list = {};
            }

            newState.list[classId] = { ...action._class }
            newState.currentClass = classId || null;

            return newState
        case LOGOUT_SUCCESS:
            return {}
    }
    return state;
}

export default classes;
