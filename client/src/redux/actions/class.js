import { CREATE_CLASS_PROFILE_SUCCESS, LOGIN_SUCCESS } from '../constants/class';

import axios from 'axios';

const createClassProfile = (data) => {
    return (dispatch) => {
        return axios.post('/public/create', { data })
            .then((response) => {
                console.log('response', response)
                return response.data
            })
            .then(
                (success) => {
                     dispatch(createClassProfileSuccess(success))
                },
                (error) => {
                    // TODO handle error messages
                    console.log('error=====', error)
                }
            )
    }
}

const createClassProfileSuccess = (data) => {
    return {
        type: CREATE_CLASS_PROFILE_SUCCESS,
        class: data.class,
        teacher: data.teacher
    }
}

const login = (credentials) => {
    return (dispatch) => {
        return axios.post('/auth/login', credentials )
            .then(response => response.data)
            .then(({ user, token }) => {
                localStorage.setItem('token', token);
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
                dispatch(loginSuccess(user))
            })
    }
}

const loginSuccess = (user) => {
    return {
        type: LOGIN_SUCCESS,
        user
    }
}

export {
    createClassProfile,
    login
}
