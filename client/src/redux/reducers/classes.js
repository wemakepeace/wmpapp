import { FETCH_CLASS, SAVE_CLASS_SUCCESS  } from '../constants/class';
import { LOGOUT_SUCCESS } from '../constants/teacher';

const initialState = { currentClassDetails: {} };

const classes = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_CLASS:
            if (action._class && action._class.id) {
                return {
                    ...state,
                    currentClassDetails: action._class,
                    list: {
                        ...state.list,
                        [action._class.id] : action._class
                    }
                };
            } else {
                return {
                    ...state,
                    currentClassDetails: action._class,
                };
            }
        case SAVE_CLASS_SUCCESS:
            const classId = action._class.id;
            let newState = { ...state }

            if (!newState.list) {
                newState.list = {};
            }
            // update or create new class in class list
            newState.list[ classId ] = { ...action._class };
            newState.currentClassDetails =  action._class;

            return newState;
        case LOGOUT_SUCCESS:
            return {};
    }
    return state;
}

export default classes;
