import axios from 'axios';
import { UPDATE_SCHOOL_SUCCESS, UPDATE_SCHOOL_ERROR } from '../constants/school';


const updateSchool = data => {
    console.log('hittin')
    return dispatch => {
        return axios.put('/school', { data })
        .then(response => {
            return response.data
        })
        .then(
                ({ updatedSchool, feedback }) => {
                    const currentClassId = localStorage.getItem('currentClass');
                    dispatch({
                        type: UPDATE_SCHOOL_SUCCESS,
                        currentClassId: currentClassId,
                        updatedSchool,
                        feedback
                    });
                },
                (error) => {
                    console.log('error', error)
                    // dispatch({type: UPDATE_SCHOOL_ERROR, 'some data '})
                }
        )
    }
}

export {
    updateSchool
}
