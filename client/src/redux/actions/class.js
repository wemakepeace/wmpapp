import { CREATE_CLASS_PROFILE_SUCCESS } from '../constants/class';

import axios from 'axios';

const createClassProfile = (data) => {
    return (dispatch) => {
        return axios.post('/class/create', { data })
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

export {
    createClassProfile
}
