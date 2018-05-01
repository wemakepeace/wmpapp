import {
    FETCH_CLASS,
    SAVE_CLASS_SUCCESS  } from '../constants/class';
import { LOGOUT_SUCCESS } from '../constants/teacher';

const initialState = {};

const classes = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_CLASS:
            return { ...state, list: { ...state.list, [action._class.id] : action._class }, currentClass: action.currentClass }
        case SAVE_CLASS_SUCCESS:
            const classId = action._class.id;
            let newState = { ...state }

            newState.list[classId] = { ...action._class }
            newState.currentClass = action._class.id;

            return newState
        case LOGOUT_SUCCESS:
            return {}
    }
    return state;
}

export default classes;
