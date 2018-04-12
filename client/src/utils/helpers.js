import axios from 'axios';
import countries from 'country-list';

const fetchDataForSelectDropdown = (url) => {
    return axios.get(`/resources/${url}`)
        .then(response => response.data)
        .then(data => {
            console.log('data', data)
            return { options: data }
        });
}

const getCountryName = (code) => {
    return countries().getName(code);
}


export {
    fetchDataForSelectDropdown,
    getCountryName
}
