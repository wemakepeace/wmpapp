import CREATE_CLASS_PROFILE_SUCCESS from '../constants/class';
import axios from 'axios';

const createClassUser = (data) => {
    console.log('getting called')
    return (dispatch) => {
        return axios.post('/class/create', { data })
            .then((response) => {
                console.log('response', response)
                return response.data
            })
            .then(x =>
                  console.log('x', x)
                // (success) => {
                //     console.log('success=====', success)
                // },
                // (error) => {
                //     console.log('error=====', error)
                // }
            )
    }
}

export {
    createClassUser
}
