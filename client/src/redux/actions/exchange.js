import { FETCH_EXCHANGE_DATA } from '../constants/exchange';
import { SEND_FEEDBACK } from '../constants/shared';

import axios from 'axios';

const initiateExchange = (classId) => {
    return dispatch => {
        return axios.post(`/exchange`, { classId })
        .then(response => response.data)
        .then(
            ({ exchange, feedback }) => {
            return dispatch({ type: FETCH_EXCHANGE_DATA, exchange, feedback })

            },
            (error) => {
                const feedback = error.response.data.feedback;
                return dispatch({ type: SEND_FEEDBACK, feedback });
            })
    }
}

export {
    initiateExchange
}
