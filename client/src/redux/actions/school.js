import axios from 'axios';
import { UPDATE_SCHOOL_SUCCESS, UPDATE_SCHOOL_ERROR } from '../constants/school';


const createSchool = (data) => {
    console.log('data', data)
    return dispatch => {
        return axios.post('/school', data)
            .then(response => response.data)
            .then(x => console.log(x))
    }
};


const createOrUpdateSchool = data => {
    if (data.id === "") {
        data.id = null;
    }

    if (data.country) {
        data.country = data.country.value;
    }

    return dispatch => {
        return axios.post('/school', { data })
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
    createOrUpdateSchool
}