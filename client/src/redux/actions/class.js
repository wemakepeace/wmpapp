import { CREATE_CLASS_PROFILE_SUCCESS, LOGIN_SUCCESS, LOGOUT_SUCCESS  } from '../constants/class';

import axios from 'axios';

const createClassProfile = (data) => {
    return (dispatch) => {
        return axios.post('/public/create', { data })
            .then((response) => response.data)
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
        info: data.class,
        user: data.user
    }
}

const login = (credentials) => {
    return (dispatch) => {
        return axios.post('/public/login', credentials )
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
        user,
        auth: true
    }
}

const logout = () => {
    localStorage.clear();
    return (dispatch) => {
        return dispatch({ type: LOGOUT_SUCCESS })
    }
}


// const updateTeacher = (data) => {
//     return (dispatch) => {
//         return axios.put('/class/:id/teacher', )
//     }
// }

export {
    createClassProfile,
    login,
    logout
}
