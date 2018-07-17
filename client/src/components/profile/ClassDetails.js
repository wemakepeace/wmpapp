import React from 'react';

const ClassDetails = ({ classData, teacher, title }) => {
    let school;

    if (!classData || !teacher) {
        return null
    }

    if (classData && classData.school) {
        school = classData.school || {};
    }

    return (
        <div>
            <div>
                <h3 style={{marginBottom: '18px'}}>{title} {classData && classData.name || null}</h3>
            </div>
            <div className='div-display-inline-block'>
                <div className='inner-box-inline-block'>
                    <div>
                        <label>Teacher</label>
                        <label>Email</label>
                        <label>Phone</label>
                        {classData && classData.size ? <label>Class size</label> : null}
                    </div>
                    <div style={{marginLeft: "12px"}}>
                        <span>{ teacher.firstName || null} {teacher.lastName || null}</span>
                        <span>{teacher.email || null}</span>
                        <span>{teacher.phone || "Not specified"}</span>
                        <span>{classData && classData.size || null }</span>
                    </div>
                </div>
            </div>
            { classData && classData.school && classData.school.schoolName
                ? <div className='div-display-inline-block'>
                    <div className='inner-box-inline-block'>
                        <div className=''>
                            <label>School Address</label>
                        </div>
                        <div style={{marginLeft: "12px"}}>
                            <span>{school.schoolName || null}</span>
                            <span>{school.address1 || null} {school.address2 || null}</span>
                            <span>{school.zip || null} {school.city || null}</span>
                            <span>{school.country || null}</span>
                        </div>
                    </div>
                </div>
            : null }
        </div>
    )
}

export default ClassDetails;
