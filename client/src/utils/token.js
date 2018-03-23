import axios from 'axios';

/** Make sure that token is always valid and exisiting before server calls **/

export const setHeaders = () => {
    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['Authorization'] = token;
        return true
    } else {
        axios.defaults.headers.common['Authorization'] = null;
         /*if setting null does not remove `Authorization` header then try
           delete axios.defaults.headers.common['Authorization'];
         */
         return false
    }
}
