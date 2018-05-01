import {
    CREATE_TEACHER_SUCCESS,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    LOGIN_ERROR,
    UPDATE_TEACHER_SUCCESS,
    UPDATE_CLASS_SUCCESS  } from '../constants/teacher';

import { SEND_FEEDBACK } from '../constants/shared';

import axios from 'axios';

import { setToken } from '../../utils/helpers';

import { login, logout, sendResetPasswordLink, resetPasswordWithToken, changePassword } from './auth';

const createTeacher = data => {
    return dispatch => {
        return axios.post('/public/create', { data })
            .then(response => response.data)
            .then(
                ({ teacher, token, feedback }) => {

                    setToken(token);
                    dispatch(createTeacherSuccess(teacher, feedback));
                },
                (error) => {
                    // TODO handle error messages
                    const feedback = error.response.data.feedback;
                    dispatch({ type: SEND_FEEDBACK, feedback});
                }
            )
    }
};

const createTeacherSuccess = (teacher, feedback) => {
    return {
        type: CREATE_TEACHER_SUCCESS,
        teacher,
        feedback
    }
};

const fetchTeacher = () => {
    return dispatch => {
        return axios.get(`/teacher`)
            .then(response => response.data)
            .then(
                ({ teacher, feedback }) => {

                    return dispatch({type: LOGIN_SUCCESS, teacher, feedback })
                },
                (error) => dispatch(logout())
            )
    }
};

const updateTeacher = (data) => {
    return (dispatch) => {
        return axios.put('/teacher', data)
            .then(response => response.data)
            .then(
                ({ teacher, feedback }) => {
                    dispatch(updateTeacherSuccess(teacher, feedback));
                },
                (error) => {
                    console.log('error', error)
                    const feedback = error.response.data.feedback;
                    dispatch({ type: SEND_FEEDBACK, feedback })
                })
    }
};

const updateTeacherSuccess = (teacher, feedback) => {
    return {
        type: UPDATE_TEACHER_SUCCESS,
        teacher,
        feedback
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
    createTeacher,
    fetchTeacher,
    updateTeacher,
    login,
    logout,
    sendResetPasswordLink,
    resetPasswordWithToken,
    changePassword
};
