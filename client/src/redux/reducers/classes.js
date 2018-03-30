import { UPDATE_CLASS_SUCCESS } from '../constants/teacher';

const initialState = {};

const classes = (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_CLASS_SUCCESS:
            return { ...state, classes: action.updatedClass }
    }
    return state
}


export default classes;
