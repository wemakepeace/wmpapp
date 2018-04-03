import { UPDATE_CLASS_SUCCESS } from '../constants/teacher';
import { FETCH_CLASS } from '../constants/class';

const initialState = {};

const classes = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_CLASS:
            return { ...state, list: { ...state.list, ...action._class }, currentClass: action.currentClass}
        case UPDATE_CLASS_SUCCESS:
            // return { ...state, classes: action.updatedClass }
    }
    return state
}


export default classes;
