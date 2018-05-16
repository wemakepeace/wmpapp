import React from 'react';

const ClassDetails = ({ classData, teacherData, title }) => {

    if (!classData || !teacherData) return (<div></div>)
    const { school } = classData;

    return (
        <div>
            <div>
                <h3 style={{marginBottom: '18px'}}>{title} {classData.name || null}</h3>
            </div>
            <div className='div-display-inline-block'>
                <div className='class-overview'>
                    <div className=''>
                        <label>Teacher</label>
                        <label>Email</label>
                        <label>Phone</label>
                        <label>Class size</label>
                    </div>
                    <div className=''>
                        <span>{teacherData.firstName || null} {teacherData.lastName || null}</span>
                        <span>{teacherData.email || null}</span>
                        <span>{teacherData.phone || "Not specified"}</span>
                        <span>{classData.size || null }</span>
                    </div>
                </div>
            </div>
            { classData && school && school.schoolName
                ? <div className='div-display-inline-block'>
                    <div className='class-overview'>
                        <div className=''>
                            <label>School Address</label>
                        </div>
                        <div className=''>
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
