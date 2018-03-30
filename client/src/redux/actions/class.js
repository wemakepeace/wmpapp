import {
    UPDATE_ERROR,
    UPDATE_CLASS_SUCCESS  } from '../constants/teacher';

import axios from 'axios';

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
    updateClass
};
