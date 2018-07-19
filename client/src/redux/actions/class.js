import axios from 'axios';
import { SAVE_CLASS_SUCCESS, FETCH_CLASS } from '../constants/class';
import { SEND_FEEDBACK } from '../constants/shared';


const fetchClass = (id) => {
    return dispatch => {
        return axios.get(`/class/${id}`)
            .then(response => response.data)
            .then(
                ({ _class, exchange, classRole, feedback}) => {
                    localStorage.setItem('currentClass', _class.id);
                    return dispatch({
                        type: FETCH_CLASS,
                        currentClass: _class.id,
                        _class,
                        exchange,
                        classRole
                    });
                },
                (error) => {
                    const feedback = error.response.data.feedback;
                    return dispatch({ type: SEND_FEEDBACK, feedback });
                })
    }
};

const removeCurrentClass = () => {
    localStorage.removeItem('currentClass');
    return dispatch => {
        return dispatch({
            type: FETCH_CLASS,
            currentClass: null,
            currentClassDetails: {}
        });
    }
}


/** Will create class if class id does not exist **/
/** Will update class otherwise **/

const saveClass = (data) => {
    return dispatch => {
        return axios.post(`/class`, data)
            .then(response => response.data)
            .then(
                ({ _class, school, feedback }) => {
                    return dispatch(saveClassSuccess(_class, school, feedback));
                },
                (error) => {
                    const feedback = error.response.data.feedback;
                    return dispatch({ type: SEND_FEEDBACK, feedback });
                })
    }
}

const saveClassSuccess = (_class, school, feedback) => {
    return {
        type: SAVE_CLASS_SUCCESS,
        _class,
        school,
        feedback
    }
};

export {
    fetchClass,
    saveClass,
    removeCurrentClass
};
