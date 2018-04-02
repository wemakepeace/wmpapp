import {
    UPDATE_ERROR,
    UPDATE_CLASS_SUCCESS  } from '../constants/teacher';

import { UPDATE_CLASS_ERROR, FETCH_CLASS } from '../constants/class';


import axios from 'axios';

const fetchClass = id => {
    return dispatch => {
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
                    })

                },
                (error) => {
                    const feedback = error.response.data.feedback;
                    dispatch({ type: UPDATE_CLASS_ERROR, feedback })
                })
    }
}


const updateClass = (data) => {
    return (dispatch) => {
        return axios.put('/class', data)
            .then(response => response.data)
            .then(
                ({ updatedClass, feedback }) => {
                    dispatch(updateClassSuccess(updatedClass, feedback))
                },
                (error) => {
                    const feedback = error.response.data.feedback;
                    dispatch({ type: UPDATE_ERROR, feedback })
                })
    }
};

const updateClassSuccess = (updatedClass, feedback) => {
    return {
        type: UPDATE_CLASS_SUCCESS,
        updatedClass,
        feedback
    }
};


export {
    fetchClass,
    updateClass
};
