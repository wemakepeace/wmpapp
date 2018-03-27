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
            .then(({ session, token, feedback }) => {

                localStorage.setItem('token', token);

                axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

                dispatch(loginSuccess(session, feedback));
            })
    }
}

const loginSuccess = (session, feedback) => {
    return {
        type: LOGIN_SUCCESS,
        session,
        feedback,
        auth: true
    }
}

const logout = () => {
    localStorage.clear();
    return (dispatch) => {
        return dispatch({ type: LOGOUT_SUCCESS, feedback: '' })
    }
}

const loadSession = () => {
    return (dispatch) => {
        return axios.get(`/session`)
            .then(response => response.data)
            .then(
                ({ session, feedback }) => dispatch(loginSuccess(session, feedback)),
                (error) => {
                    // TODO handle error messages
                    console.log('error=====', error)
                    return dispatch(logout())
                }
            )
    }
}
// const loadProfessional = () => {
//     return (dispatch) => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             axios.get(`/professional/login/${token}`)
//             .then( response => response.data)
//             .then(
//                 (data) => {
//                     dispatch(loginProfessionalSuccess({user:{...data.user, loggedIn:true}, feedback: data.feedback}));
//                 },
//                 (error) => {
//                     const status = error.response.status;
//                     let feedback;

//                     if (status === 500) {
//                         feedback = {
//                             feedback: {
//                                 type: 'error',
//                                 messages: ['There was an internal server error.']
//                             }
//                         }
//                     } else if (status === 401) {
//                         feedback = {
//                             type: 'error',
//                             messages: ['Your attempt of signing in was unauthorized.']
//                         }
//                     }

//                     dispatch(loginProfessionalError(feedback))
//                 }
//             );
//         };
//     };
// };


// const updateTeacher = (data) => {
//     return (dispatch) => {
//         return axios.put('/class/:id/teacher', )
//     }
// }

export {
    createClassProfile,
    login,
    logout,
    loadSession
}
