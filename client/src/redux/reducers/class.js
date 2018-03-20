import { CREATE_CLASS_PROFILE_SUCCESS } from '../constants/class';

const initialState = {};

const classReducer = (state = initialState, action) => {
    switch(action.type) {
        case CREATE_CLASS_PROFILE_SUCCESS:
            return { ...state, teacher: action.teacher, class: action.class }
    }
    return state
}


export default classReducer;
