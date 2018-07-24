import React from 'react';
import { Async } from 'react-select';
import countries from 'country-list';
import AsyncSelect from '../AsyncSelect';
import { fetchSchools, fetchCountries } from '../../utils/fetchConstantData'
import { Input } from './Input';

const SchoolForm = ({ school, teacherId, onInputChange, fetchSchool }) => {
    const {
        id,
        schoolName,
        address1,
        address2,
        city,
        zip,
        state,
        country
    } = school;

    const fields = [
        {
            label: 'School name',
            value: schoolName,
            name: 'schoolName'
        },
        {
            label: 'Address',
            value: address1,
            name: 'address1'
        },
        {
            label: 'Address',
            value: address2,
            name: 'address2'
        },
        {
            label: 'City',
            value: city,
            name: 'city'
        },
        {
            label: 'State',
            value: state,
            name: 'state'
        },
        {
            label: 'Zip code',
            value: zip,
            name: 'zip'
        },
        {
            label: 'Country',
            value: country,
            name: 'country'
        }
    ];

    return (
        <div>
            <h2> School Mailing Address</h2>
            <p>This address will be used when sending letters to your class.</p>
            <AsyncSelect
                value={{ label: schoolName, value: id }}
                asyncFetch={() => fetchSchools(teacherId)}
                name='school'
                handleAddValues={fetchSchool}
            />
            { fields.map((field) => (
                <Input
                    {...field}
                    onInputChange={onInputChange}
                    objName='school'
                />)) }
        </div>
    );
};

export default SchoolForm;
