import axios from 'axios';
import { SEND_FEEDBACK } from '../constants/shared';
import { setToken } from '../../utils/helpers';
import {
    login,
    logout,
    sendResetPasswordLink,
    resetPasswordWithToken,
    changePassword
} from './auth';
import {
    CREATE_TEACHER_SUCCESS,
    LOGIN_SUCCESS,
    UPDATE_TEACHER_SUCCESS,
    USER_DELETED
} from '../constants/teacher';

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
                }
            )
    }
};

const signupSuccess = (teacher, feedback) => {
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
                    return dispatch({type: LOGIN_SUCCESS, teacher, feedback });
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
                    const feedback = error.response.data.feedback;
                    dispatch({ type: SEND_FEEDBACK, feedback });
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


const deleteTeacher = () => {
    return (dispatch) => {
        return axios.delete(`/teacher`)
            .then(({ data }) => data)
            .then(
                ({ feedback }) => {
                    console.log('feedback', feedback)
                    dispatch({ type: SEND_FEEDBACK, feedback });
                },
                (error) => {
                    const feedback = error.response.data.feedback;
                    dispatch({ type: SEND_FEEDBACK, feedback });
                })
    }
}

export {
    signup,
    fetchTeacher,
    updateTeacher,
    login,
    logout,
    sendResetPasswordLink,
    resetPasswordWithToken,
    changePassword,
    deleteTeacher
};
