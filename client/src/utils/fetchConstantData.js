import axios from 'axios';
import countries from 'country-list';

export const fetchSchools = (teacherId) => {
    return axios.get(`/school/teacher/${teacherId}`)
    .then(({ data }) => {
        return { options: data }
    })
};

export const fetchSchool = (teacherId, schoolId) => {
    return axios.get(`/school/${schoolId}`)
    .then(({ data }) => data);
};

export const fetchCountries = () => {
    return new Promise((resolve, reject) => {
        const list = countries().getData();
        const options = list.map(({ name, code }) => {
            return {
                label: name,
                value: code
            }
        });

        options.length ? resolve({ options }) : reject();
    });
};
