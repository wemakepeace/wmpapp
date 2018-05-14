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

const verifyExchange = (classId, exchangeId) => {
    console.log('being called')
    console.log('exchangeId', exchangeId)
    console.log('classId', classId)
    return dispatch => {
        return axios.post(`/exchange/verify`, { exchangeId, classId })
        .then(response => response.data)
        .then(
              ({ exchange, feedback }) => {
                return dispatch({ type: FETCH_EXCHANGE_DATA, exchange, feedback })
                // console.log('success', success)
              },
              (error) => {
                console.log('error', error)
              })
    }
}

export {
    initiateExchange,
    verifyExchange
}
