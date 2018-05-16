import React from 'react';

const ClassDetails = ({ classData, teacherData }) => {

    if (!classData || !teacherData) return (<div>Empty</div>)
    const { school } = classData;

    return (
        <div>
            <div>
                <hr style={{margin: '30px 0'}}/>
                <h3 style={{marginBottom: '18px'}}>Overview Class {classData.name || null}</h3>
            </div>
            <div className='div-display-inline-block'>
                <div className='class-overview'>
                    <div className=''>
                        <label>Teacher</label>
                        <label>Email</label>
                        <label>Phone</label>
                    </div>
                    <div className=''>
                        <span>{teacherData.firstName || null} {teacherData.lastName || null}</span>
                        <span>{teacherData.email || null}</span>
                        <span>{teacherData.phone || null}</span>
                    </div>
                </div>
            </div>
            { classData !== undefined
                ? <div className='div-display-inline-block'>
                    <div className='class-overview'>
                        <div className=''>
                            <label>Class size</label>
                            <label>Age group</label>
                            <label>Registered for term</label>
                        </div>
                        <div className=''>
                            <span>{classData.size || null }</span>
                            { classData.age_group
                                ? <span>{classData.age_group.label || null }</span>
                                : <span>Not defined yet.</span>
                            }
                            { classData.term
                                ? <span>{classData.term.label || null }</span>
                                : <span>Not defined yet.</span>
                            }
                        </div>
                    </div>
                </div>
            : null }
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
