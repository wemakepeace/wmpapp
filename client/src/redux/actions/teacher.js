import {
    CREATE_TEACHER_SUCCESS,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    LOGIN_ERROR,
    CREATE_CLASS_PROFILE_ERROR,
    UPDATE_ERROR,
    UPDATE_TEACHER_SUCCESS,
    UPDATE_CLASS_SUCCESS  } from '../constants/teacher';

import axios from 'axios';

const setToken = (token) => {
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
};

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
                    dispatch({ type: CREATE_CLASS_PROFILE_ERROR, feedback});
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

// const loadSession = (classId) => {
const loadSession = () => {
    return dispatch => {
        // return axios.get(`/session/${classId}`)
        return axios.get(`/teacher`)
            .then(response => response.data)
            .then(
                ({ teacher, feedback }) => dispatch(loginSuccess(teacher, feedback)),
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
                    dispatch({ type: UPDATE_ERROR, feedback })
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


const updateClass = (data) => {
    return (dispatch) => {
        return axios.put('/class', data)
            .then(response => response.data)
            .then(
                ({ updatedClass, feedback }) => {
                    console.log('updatedClass', updatedClass)
                    dispatch(updateClassSuccess(updatedClass, feedback))
                    // dispatch(loginSuccess(session, feedback))
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
    createTeacher,
    login,
    logout,
    loadSession,
    updateTeacher,
    updateClass
};
