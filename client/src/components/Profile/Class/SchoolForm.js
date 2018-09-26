import React from 'react';
import countries from 'country-list';
import { AsyncSelectInput } from '../../reusables/AsyncSelectInput';
import { fetchData } from '../../../utils/fetchData'
import { Input } from '../../reusables/Input';

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
    const schoolDropdownValue = !schoolName
        ? { label: 'New address', id: 'newaddress' }
        : { label: schoolName, value: id };

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
        }
    ];

    return (
        <div>
            <h2> School Mailing Address</h2>
            <p>This address will be used when sending letters to your class.</p>
            <AsyncSelectInput
                name='school'
                value={schoolDropdownValue}
                onChange={fetchSchool}
                loadOptions={fetchData}
                clearable={true}
                objName='school'
                path={`/school/teacher/${teacherId}`}
            />
            { fields.map((field) => (
                <Input
                    {...field}
                    onInputChange={onInputChange}
                    objName='school'
                    key={field.name}
                />)) }
            <AsyncSelectInput
                name='country'
                label='Country'
                value={country}
                onChange={onInputChange}
                loadOptions={fetchData}
                clearable={false}
                objName='school'
                path='/resources/countries'
            />
        </div>
    );
};

export default SchoolForm;
