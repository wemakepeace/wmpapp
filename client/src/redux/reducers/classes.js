import { FETCH_CLASS, SAVE_CLASS_SUCCESS  } from '../constants/class';
import { LOGOUT_SUCCESS } from '../constants/teacher';

const initialState = {};

const currentClass = (state = initialState, { type, _class }) => {
    switch(type) {
        case FETCH_CLASS:
        case SAVE_CLASS_SUCCESS:
            return { ..._class }
        case LOGOUT_SUCCESS:
            return {};
    }
    return state;
}

export default currentClass;
