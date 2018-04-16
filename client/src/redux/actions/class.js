import { UPDATE_ERROR  } from '../constants/teacher';
import { SAVE_CLASS_SUCCESS, SAVE_CLASS_ERROR, FETCH_CLASS } from '../constants/class';

/* is this a good approach ? */
import { createOrUpdateSchool } from './school';

import axios from 'axios';

const fetchClass = (id, shouldFetch) => {
    return dispatch => {
        if (shouldFetch) {
            return axios.get(`/class/${id}`)
                .then(response => response.data)
                .then(
                    ({ _class, feedback}) => {
                        let classObject = {};
                        classObject[_class.id] = _class

                        localStorage.setItem('currentClass',  _class.id );
                        return dispatch({
                            type: FETCH_CLASS,
                            _class: classObject,
                            currentClass: _class.id
                        });
                    },
                    (error) => {
                        const feedback = error.response.data.feedback;
                        return dispatch({ type: SAVE_CLASS_ERROR, feedback });
                    })
        } else {
            dispatch({ type: FETCH_CLASS, currentClass: id });
        }
    }
}

const removeCurrentClass = () => {
    console.log('running')
    localStorage.removeItem('currentClass');
    return dispatch => {
        return dispatch({ type: FETCH_CLASS, currentClass: null })
    }
}

const createClass = (data) => {
    console.log('data', data)
    return dispatch => {
        return axios.post('/class', data)
            .then(response => response.data)
            .then(_class => {

            })
    }
}

const saveClass = (data) => {
    // if (data.id) {
        // update class
    return dispatch => {
        return axios.post('/class', data)
            .then(response => response.data)
            .then(
                ({ _class, feedback }) => {
                    console.log('_class', _class)
                    dispatch(SaveClassSuccess(_class, feedback));
                },
                (error) => {
                    const feedback = error.response.data.feedback;
                    dispatch({ type: UPDATE_ERROR, feedback });
                })
    }
    // } else {
    //     // create class
    //     return axios.post('/class', data)
    //         .then(response => response.data)
    //         .then(
    //             ({ updatedClass, feedback }) => {
    //                 dispatch(updateClassSuccess(updatedClass, feedback));
    //             },
    //             (error) => {
    //                 const feedback = error.response.data.feedback;
    //                 dispatch({ type: UPDATE_ERROR, feedback });
    //             })
    // }
}

// const updateClass = (data) => {
//     return dispatch => {
//         return axios.put('/class', data)
//             .then(response => response.data)
//             .then(
//                 ({ updatedClass, feedback }) => {
//                     dispatch(updateClassSuccess(updatedClass, feedback));
//                 },
//                 (error) => {
//                     const feedback = error.response.data.feedback;
//                     dispatch({ type: UPDATE_ERROR, feedback });
//                 })
//     }
// };

const SaveClassSuccess = (_class, feedback) => {
    return {
        type: SAVE_CLASS_SUCCESS,
        _class,
        feedback
    }
};


export {
    fetchClass,
    createClass,
    saveClass,
    removeCurrentClass
};
