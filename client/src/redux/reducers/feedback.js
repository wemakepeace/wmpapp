import { SAVE_CLASS_SUCCESS } from '../constants/class';
import { CLEAR_FEEDBACK, SEND_FEEDBACK } from '../constants/shared';
import {
    CREATE_TEACHER_SUCCESS,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    UPDATE_TEACHER_SUCCESS,
    USER_DELETED
} from '../constants/teacher';

const initialState = {};

// NTS maybe consolidate all these to SEND_FEEDBACK
const feedback = (state = initialState, action) => {
    switch(action.type) {
        case CREATE_TEACHER_SUCCESS:
        case LOGIN_SUCCESS:
        case UPDATE_TEACHER_SUCCESS:
        case SAVE_CLASS_SUCCESS:
        case SEND_FEEDBACK:
        case USER_DELETED:
            return action.feedback;
        case CLEAR_FEEDBACK:
        case LOGOUT_SUCCESS:
            return {};
    }
    return state;
}

export default feedback;
