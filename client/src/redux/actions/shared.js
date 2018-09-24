import { CLEAR_FEEDBACK, SEND_FEEDBACK } from '../constants/shared';

export const clearFeedback = () => {
    return dispatch => {
        dispatch({ type: CLEAR_FEEDBACK, feedback: {}})
    }
}

export const sendFeedback = (feedback) => {
    return dispatch => {
        dispatch({ type: SEND_FEEDBACK, feedback });
    }
}
