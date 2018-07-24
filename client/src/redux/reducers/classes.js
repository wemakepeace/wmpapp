import { FETCH_CLASS, SAVE_CLASS_SUCCESS  } from '../constants/class';
import { LOGOUT_SUCCESS } from '../constants/teacher';

const initialState = { currentClass: {} };

const classes = (state = initialState, { type, _class }) => {
    switch(type) {
        case FETCH_CLASS:
            if (_class && _class.id) {
                return {
                    ...state,
                    currentClass: _class,
                    list: {
                        ...state.list,
                        [ _class.id ] : _class
                    }
                };
            } else {
                return {
                    ...state,
                    currentClass: _class,
                };
            }
        case SAVE_CLASS_SUCCESS:
            const { id } = _class;
            let newState = { ...state };

            if (!newState.list) {
                newState.list = {};
            }
            // update or add new class to list
            newState.list[ id ] = { ..._class };
            newState.currentClass =  _class;
            return newState;
        case LOGOUT_SUCCESS:
            return {};
    }
    return state;
}

export default classes;
