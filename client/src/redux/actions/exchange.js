// import { SAVE_CLASS_SUCCESS, FETCH_CLASS } from '../constants/class';
import { FETCH_EXCHANGE_DATA } from '../constants/exchange';
import { SEND_FEEDBACK } from '../constants/shared';



import axios from 'axios';

const initiateExchange = (classId) => {
    return dispatch => {
        return axios.post(`/exchange`, { classId })
            .then(response => response.data)
            .then(({ exchange, feedback }) => {
                return dispatch({ type: FETCH_EXCHANGE_DATA, exchange, feedback })

            })
    }
}

export {
    initiateExchange
}
