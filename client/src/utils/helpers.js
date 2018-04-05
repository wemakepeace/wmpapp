import axios from 'axios';

const fetchDataForSelectDropdown = (url) => {
    return axios.get(`/resources/${url}`)
        .then(response => response.data)
        .then(data => {
            return { options: data }
        });
}

export {
    fetchDataForSelectDropdown
}
