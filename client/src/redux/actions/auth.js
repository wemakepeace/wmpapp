import {
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    LOGIN_ERROR  } from '../constants/teacher';

import { SEND_FEEDBACK } from '../constants/shared';

import axios from 'axios';

import { setToken } from '../../utils/helpers';


const login = credentials => {
    return dispatch => {
        return axios.post('/public/login', credentials )
            .then(response => response.data)
            .then(
                ({ teacher, token, feedback }) => {
                    setToken(token);
                    dispatch(loginSuccess(teacher, feedback));
                },
                (error) => {
                    console.log('error', error)
                    const feedback = error.response.data.feedback;

                    dispatch({ type: LOGIN_ERROR, feedback })
                })
    }
};

const loginSuccess = (teacher, feedback) => {
    return {
        type: LOGIN_SUCCESS,
        teacher,
        feedback
    }
};

const logout = () => {
    localStorage.clear();
    axios.defaults.headers.common['Authorization'] = null;
    return (dispatch) => dispatch({ type: LOGOUT_SUCCESS });
};


const sendResetPasswordLink = email => {
    console.log(email)
    return dispatch => {
        return axios.post('/public/reset', email)
            .then(
                (response) => {
                      console.log('response', response)
                      const feedback = response.data.feedback;
                      dispatch({ type: SEND_FEEDBACK, feedback })
                },
                (error) => {
                    const feedback =  error.response.data.feedback;
                    dispatch({ type: SEND_FEEDBACK, feedback })
                })
    }
}

export { login, logout, sendResetPasswordLink }
