import { CLEAR_FEEDBACK } from '../constants/shared';

export const clearFeedback = () => {
    return dispatch => {
        dispatch({ type: CLEAR_FEEDBACK, feedback: {}})
    }
}
