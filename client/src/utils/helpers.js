import axios from 'axios';
import countries from 'country-list';

const getCountryName = (code) => {
    return countries().getName(code);
}

const setToken = (token) => {
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
};


export {
    getCountryName,
    setToken
}
