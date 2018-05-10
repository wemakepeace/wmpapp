import { SAVE_CLASS_SUCCESS, FETCH_CLASS } from '../constants/class';
import { SEND_FEEDBACK } from '../constants/shared';



import axios from 'axios';

const initiateExchange = (classId) => {
    return dispatch => {
        return axios.post(`/exchange`, { classId })
            .then(response => {
                console.log('response.data', response.data)
                return response.data
            })
            .then(result => {

                console.log('result', result)
            // .then(({ _class, feedback }) => {

            //     console.log('_class', _class )
            //     console.log('feedback', feedback )
                // return dispatch({ type: SAVE_CLASS_SUCCESS, _class, feedback })

            })
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
