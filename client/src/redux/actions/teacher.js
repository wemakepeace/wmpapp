import axios from 'axios';
import { setToken } from '../../utils/helpers';
import { SEND_FEEDBACK } from '../constants/shared';
import {
    CREATE_TEACHER_SUCCESS,
    LOGIN_SUCCESS,
    UPDATE_TEACHER_SUCCESS,
    USER_DELETED,
    LOGOUT_SUCCESS
} from '../constants/teacher';


const login = (data) => {
    return dispatch => {
        return axios.post('/public/login', data )
        .then(response => response.data)
        .then(
            ({ teacher, token, feedback }) => {
                setToken(token);
                return dispatch(loginSuccess(teacher, feedback));
            },
            (error) => {
                const feedback = error.response.data.feedback;
                return dispatch({ type: SEND_FEEDBACK, feedback });
            });
    };
};

const loginSuccess = (teacher, feedback) => {
    return {
        type: LOGIN_SUCCESS,
        teacher,
        feedback
    };
};

const logout = (id) => {
    return dispatch => {
        localStorage.clear();
        axios.defaults.headers.common['Authorization'] = null;
        dispatch({ type: LOGOUT_SUCCESS });

        // server call to reset any existing resetPasswordTokens
        return axios => {
            axios.post('/teacher/', id);
        }
    };
};


const sendResetPasswordLink = email => {
    console.log('email', email)
    return dispatch => {
        return axios.post('/public/resetrequest', email)
        .then(
            (response) => {
                  const feedback = response.data.feedback;
                  dispatch({ type: SEND_FEEDBACK, feedback });
            },
            (error) => {
                const feedback =  error.response.data.feedback;
                dispatch({ type: SEND_FEEDBACK, feedback });
            })
    };
};

const resetPasswordWithToken = (data, token) => {
    return dispatch => {
        return axios.post(`/public/reset/${token}`, data)
        .then(
            (response) => {
                const credentials = {
                    email: response.data.user.email,
                    password: data.password
                };

                const feedback = response.data.feedback.messages;
                return dispatch(login(credentials, feedback));
            },
            (error) => {
                const feedback = error.response.data.feedback;
                return dispatch({ type: SEND_FEEDBACK, feedback });
            });
    };
};

const changePassword = (data) => {
    return dispatch => {
        return axios.put('/teacher/changepassword', data)
        .then(
            (response) => {
                const feedback = response.data.feedback;
                return dispatch({ type: SEND_FEEDBACK, feedback })
            },
            (error) => {
                const feedback = error.response.data.feedback;
                dispatch({ type: SEND_FEEDBACK, feedback });
            });
    };
};

const signup = data => {
    return dispatch => {
        return axios.post('/public/create', { data })
        .then(response => response.data)
        .then(
            ({ teacher, token, feedback }) => {
                setToken(token);
                dispatch(signupSuccess(teacher, feedback));
            },
            (error) => {
                // TODO handle error messages
                const feedback = error.response.data.feedback;
                dispatch({ type: SEND_FEEDBACK, feedback});
            })
    }
};

const signupSuccess = (teacher, feedback) => {
    return {
        type: CREATE_TEACHER_SUCCESS,
        teacher,
        feedback
    };
};

const fetchTeacher = () => {
    return dispatch => {
        return axios.get(`/teacher`)
        .then(response => response.data)
        .then(
            ({ teacher, feedback }) => {
                return dispatch({type: LOGIN_SUCCESS, teacher, feedback });
            },
            () => dispatch(logout()));
    };
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
                const feedback = error.response.data.feedback;
                dispatch({ type: SEND_FEEDBACK, feedback });
            });
    };
};

const updateTeacherSuccess = (teacher, feedback) => {
    return {
        type: UPDATE_TEACHER_SUCCESS,
        teacher,
        feedback
    }
};


const deleteTeacher = () => {
    return (dispatch) => {
        return axios.delete(`/teacher`)
        .then(({ data }) => data)
        .then(
            ({ feedback }) => {
                dispatch({ type: USER_DELETED, feedback });
            },
            (error) => {
                const feedback = error.response.data.feedback;
                dispatch({ type: SEND_FEEDBACK, feedback });
            });
    };
};

const sendSupportMessage = (content) => {
    return dispatch => {
        return axios.post('/teacher/support', content)
        .then(({ data }) => data)
        .then(
            ({ feedback }) => {
                dispatch({ type: SEND_FEEDBACK, feedback });
            },
            (error) => {
                const feedback = error.response.data.feedback;
                dispatch({ type: SEND_FEEDBACK, feedback });
            });
    };
};

export {
    signup,
    fetchTeacher,
    updateTeacher,
    login,
    logout,
    sendResetPasswordLink,
    resetPasswordWithToken,
    changePassword,
    deleteTeacher,
    sendSupportMessage
};
