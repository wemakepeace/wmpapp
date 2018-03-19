import CREATE_CLASS_PROFILE_SUCCESS from '../constants/class';
import axios from 'axios';

const createClassUser = (data) => {
    console.log('getting called')
    return (dispatch) => {
        return axios.post('/class/create', { data })
            .then((response) => response.data)
            .then(
                (success) => {
                    console.log('success=====', success)
                },
                (error) => {
                    console.log('error=====',error)
                } )
    }
}

export {
    createClassUser
}
