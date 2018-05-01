import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../constants/teacher';

import { SEND_FEEDBACK } from '../constants/shared';

import axios from 'axios';

import { setToken } from '../../utils/helpers';


const login = (credentials, specialFeedback) => {
    return dispatch => {
        return axios.post('/public/login', credentials )
            .then(response => response.data)
            .then(
                ({ teacher, token, feedback }) => {
                    setToken(token);

                    if (specialFeedback) {
                        feedback.messages = specialFeedback;
                    }

                    dispatch(loginSuccess(teacher, feedback));
                },
                (error) => {
                    const feedback = error.response.data.feedback;
                    dispatch({ type: SEND_FEEDBACK, feedback })
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

const logout = (id) => {

    return dispatch => {
        localStorage.clear();
        axios.defaults.headers.common['Authorization'] = null;
        dispatch({ type: LOGOUT_SUCCESS })

        // server call to reset any existing resetPasswordTokens
        return axios => {
            axios.post('/teacher/', id)
        }
    }
};


const sendResetPasswordLink = email => {
    return dispatch => {
        return axios.post('/public/resetrequest', email)
            .then(
                (response) => {
                      const feedback = response.data.feedback;
                      dispatch({ type: SEND_FEEDBACK, feedback })
                },
                (error) => {
                    const feedback =  error.response.data.feedback;
                    dispatch({ type: SEND_FEEDBACK, feedback })
                })
    }
}

const resetPasswordWithToken = (data, token) => {
    return dispatch => {
        return axios.post(`/public/reset/${token}`, data)
        .then(
            (response) => {
                const credentials = {
                    email: response.data.user.email,
                    password: data.password1
                }

                const feedback = response.data.feedback.messages
                dispatch(login(credentials, feedback))
            },
            (error) => {
                const feedback = error.response.data.feedback;
                dispatch({ type: SEND_FEEDBACK, feedback })
            })
    }
}
const changePassword = (data) => {
    return dispatch => {
        return axios.put('/teacher/changepassword', data)
        .then(
            (response) => {
                const credentials = {
                    email: response.data.user.email,
                    password: data.password
                }

                const feedback = response.data.feedback.messages
                dispatch(login(credentials, feedback))
            },
            (error) => {
                const feedback = error.response.data.feedback;
                dispatch({ type: SEND_FEEDBACK, feedback })
            })
    }
}

export {
    login,
    logout,
    sendResetPasswordLink,
    resetPasswordWithToken,
    changePassword
}
