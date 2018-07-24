import axios from 'axios';

export const fetchData = (path) => {
    return axios.get(path)
        .then(({ data }) => {
            return { options: data };
        });
};
