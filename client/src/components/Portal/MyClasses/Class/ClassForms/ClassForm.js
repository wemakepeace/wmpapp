import React from 'react';
import { AsyncSelectInput } from '../../../../reusables/AsyncSelectInput';
import { fetchData } from '../../../../../utils/fetchData';
import { Input } from '../../../../reusables/Input';

const ClassForm = ({ classData, onInputChange }) => {
    const {
        name,
        size,
        age_group,
        term,
        schoolId
    } = classData;

    const fields = [
        {
            label: 'Class name',
            value: name,
            name: 'name'
        },
        {
            label: 'Class size',
            value: size,
            name: 'size'
        }
    ];

    const selectFields = [
        {
            label: 'Age Group',
            value: age_group,
            name: 'age_group',
            path: '/resources/agegroups',
            loadOptions: fetchData
        },
        {
            label: 'What term would you like your class to participate?',
            value: term,
            name: 'term',
            path: '/resources/terms',
            loadOptions: fetchData
        }
    ];

    return (
        <div>
            <p>Please fill in information about your class.</p>
            <p>Once your class has been matched with another class and both classes have confirmed the participation, you will be able to access the Instructions and Materials neccessary.</p>
            { fields.map((field) => (
                <Input
                    {...field}
                    onInputChange={onInputChange}
                    objName='class'
                    key={field.name}
                />)) }
            { selectFields.map((field) => (
                <AsyncSelectInput
                    {...field}
                    onChange={onInputChange}
                    objName='class'
                    key={field.name}
                />)) }
            <br /><br />
        </div>
    );
};

export default ClassForm;
