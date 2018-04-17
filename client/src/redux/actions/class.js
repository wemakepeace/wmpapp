import { UPDATE_ERROR  } from '../constants/teacher';
import {
    SAVE_CLASS_SUCCESS,
    SAVE_CLASS_ERROR,
    FETCH_CLASS } from '../constants/class';

import { FETCH_DATA_ERROR } from '../constants/shared';

import axios from 'axios';

const fetchClass = (id, shouldFetch) => {
    return dispatch => {
        if (shouldFetch) {
            return axios.get(`/class/${id}`)
                .then(response => response.data)
                .then(
                    ({ _class, feedback}) => {
                        let classObject = {};
                        classObject[_class.id] = _class

                        localStorage.setItem('currentClass',  _class.id );
                        return dispatch({
                            type: FETCH_CLASS,
                            _class: classObject,
                            currentClass: _class.id
                        });
                    },
                    (error) => {
                        const feedback = error.response.data.feedback;
                        return dispatch({ type: FETCH_DATA_ERROR, feedback });
                    })
        } else {
            dispatch({ type: FETCH_CLASS, currentClass: id });
        }
    }
}

const removeCurrentClass = () => {
    localStorage.removeItem('currentClass');
    return dispatch => {
        return dispatch({ type: FETCH_CLASS, currentClass: null })
    }
}


/** Will create class if class id does not exist **/
/** Will update class otherwise **/

const saveClass = (data) => {
    return dispatch => {
        return axios.post('/class', data)
            .then(response => response.data)
            .then(
                ({ _class, feedback }) => {
                    console.log('_class', _class)
                    dispatch(saveClassSuccess(_class, feedback));
                },
                (error) => {
                    const feedback = error.response.data.feedback;
                    dispatch({ type: UPDATE_ERROR, feedback });
                })
    }
}

const saveClassSuccess = (_class, feedback) => {
    return {
        type: SAVE_CLASS_SUCCESS,
        _class,
        feedback
    }
};

export {
    fetchClass,
    saveClass,
    removeCurrentClass
};
