import React from 'react';
import { connect } from 'react-redux';

const ExhangeDetails = ({ currentClass }) => {
    return (
        <div className='class-portal-tab'>
            <div>
                <label>Age group</label>
                <label>Registered for term</label>
            </div>
            <div style={{marginLeft: "12px"}}>
                { currentClass && currentClass.age_group ?
                    <span>{`${currentClass.age_group.label} years` || null }</span> :
                    <span>Not specified yet</span> }
                { currentClass && currentClass.term ?
                    <span>{currentClass.term.label || null }</span> :
                    <span>Not specified yet</span> }
            </div>
        </div>
    );
}

const mapStateToProps = ({ currentClass }) => {
    return { currentClass }
}
export default connect(mapStateToProps)(ExhangeDetails);

