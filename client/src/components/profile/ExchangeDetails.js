import React from 'react';

const ExhangeDetails = ({ classData }) => {
    return (
        <div className='profile-segment exchange-details' style={{marginTop: "2em"}}>
            <div className='div-display-inline-block'>
                <div className='inner-box-inline-block'>
                    <div className=''>
                        <label>Age group</label>
                        <label>Registered for term</label>
                    </div>
                    <div style={{marginLeft: "12px"}}>
                        { classData && classData.age_group
                            ? <span>{`${classData.age_group.label} years` || null }</span>
                            : <span>Not specified yet</span>
                        }
                        { classData && classData.term
                            ? <span>{classData.term.label || null }</span>
                            : <span>Not specified yet</span>
                        }
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ExhangeDetails;

