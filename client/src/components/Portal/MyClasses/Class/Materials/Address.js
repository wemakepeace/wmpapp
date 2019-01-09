import React from 'react';
import { getCountryName } from '../../../../../utils/helpers';

const Address = ({ classData }) => {
    const { school, teacher, name } = classData;
    return (
        <div>
            <br />
            <label><b>School Name</b></label><br />
            <span>{school.schoolName || null}</span><br /><br />
            <label><b>Teacher Name</b></label><br />
            <span>{teacher.firstName || null} {teacher.lastName || null}</span><br /><br />
            <label><b>Address</b></label>
            <div>
                <span>{teacher.firstName || null} {teacher.lastName || null}</span> class {name}<br />
                <span>{school.schoolName || null}</span><br />
                <span>{school.address1 || null} {school.address2 || null}</span><br />
                <span>{school.zip || null} {school.city || null}</span><br />
                <span>{getCountryName(school.country) || null}</span>
            </div>
        </div>
    );
}

export default Address;
