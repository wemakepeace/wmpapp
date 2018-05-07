import { SAVE_CLASS_SUCCESS, FETCH_CLASS } from '../constants/class';
import { SEND_FEEDBACK } from '../constants/shared';

import axios from 'axios';

const initiateExchange = (classId) => {
    return dispatch => {
        return axios.post(`/exchange`, { classId })
            .then(response => response.data)
            .then(res => console.log('res',res))
                // ({ _class, feedback}) => {
                //     localStorage.setItem('currentClass', _class.id);

                //     return dispatch({
                //         type: FETCH_CLASS,
                //         _class: _class,
                //         currentClass: _class.id
                //     });
                // },
                // (error) => {
                //     const feedback = error.response.data.feedback;
                //     return dispatch({ type: SEND_FEEDBACK, feedback });
                // })
    }
}

export {
    initiateExchange
}
