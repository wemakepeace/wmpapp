import React from 'react';
import { connect } from 'react-redux';


const WMPHeader = ({ teacher, classes }) => {
    return (
        <div className='title-container'>
            <div className='heading'>
                <div className='title'><h1>WE</h1></div>
                <div className='title'><h1>MAKE</h1></div>
                <div className='title'>
                    <h1><span className='title-span'>PEACE LETTERS</span></h1>
                </div>
            </div>
            <div className='logged-in'>
                {teacher && teacher.id
                    ? <div className='logged-in-inner'>
                         <span>Logged in as {teacher.firstName}<br /></span>
                        {classes && classes.currentClass
                            ? <span> Class {classes.list[classes.currentClass].name}</span>
                        : null}
                    </div>
                    : null}
            </div>
        </div>
    );
}


const mapStateToProps = state => {
    return {
        teacher: state.teacher,
        classes: state.classes
    }
}

export default connect(mapStateToProps)(WMPHeader);

