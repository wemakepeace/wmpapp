import axios from 'axios';
import { FETCH_EXCHANGE_DATA } from '../constants/exchange';
import { SEND_FEEDBACK } from '../constants/shared';


const initiateExchange = (classId) => {
    return dispatch => {
        return axios.post(`/exchange`, { classId })
        .then(response => response.data)
        .then(
            ({ exchange, feedback, classRole }) => {
                return dispatch({
                    type: FETCH_EXCHANGE_DATA,
                    exchange,
                    feedback,
                    classRole
                });
            },
            (error) => {
                const feedback = error.response.data.feedback;
                return dispatch({ type: SEND_FEEDBACK, feedback });
            })
    }
}

const verifyExchange = (classId, exchangeId) => {
    return dispatch => {
        return axios.post(`/exchange/verify`, { exchangeId, classId })
        .then(response => response.data)
        .then(
              ({ exchange, feedback, classRole }) => {
                return dispatch({
                    type: FETCH_EXCHANGE_DATA,
                    exchange,
                    classRole,
                    feedback
                });
              },
              (error) => {
                const feedback = error.response.data.feedback;
                return dispatch({ type: SEND_FEEDBACK, feedback });
            })
    }
}

const getMaterials = () => {
    return dispatch => {
        return axios.get('/resources/letter_templates')
            .then((response) => response.data)
            .then(({ letterURLs }) => {
                console.log('letterURLs in getter', letterURLs)
                dispatch({ type: 'FETCH_EXCHANGE_DATA', exchange: { letterURLs } })
            })
    }
}

export {
    initiateExchange,
    verifyExchange,
    getMaterials
}
