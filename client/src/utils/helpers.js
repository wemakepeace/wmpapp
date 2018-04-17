import axios from 'axios';
import countries from 'country-list';

const fetchDataForSelectDropdown = (url) => {
    return axios.get(`/resources/${url}`)
        .then(response => response.data)
        .then(data => {
            return { options: data }
        });
}

const getCountryName = (code) => {
    return countries().getName(code);
}

const setToken = (token) => {
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
};


export {
    fetchDataForSelectDropdown,
    getCountryName,
    setToken
}
