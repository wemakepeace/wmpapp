import { UPDATE_CLASS_SUCCESS, FETCH_CLASS } from '../constants/class';
import { UPDATE_SCHOOL_SUCCESS } from '../constants/school';
import { LOGOUT_SUCCESS } from '../constants/teacher';

const initialState = {};

const classes = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_CLASS:
            return { ...state, list: { ...state.list, ...action._class }, currentClass: action.currentClass }
        case UPDATE_CLASS_SUCCESS:
            const classId = action.updatedClass.id;
            let newState = { ...state }
            newState.list[classId] = { ...action.updatedClass }
            return newState
        case UPDATE_SCHOOL_SUCCESS:
            const list = state.list;
            list[action.currentClassId].school = action.updatedSchool;
            return { ...state, list }
        case LOGOUT_SUCCESS:
            return {}
    }
    return state;
}

export default classes;
