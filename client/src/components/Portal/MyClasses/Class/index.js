import React from 'react';
import Menu from './Menu';
import TabContent from './TabContent';

const ClassProfile = (props) => {
    if (!props || (!props.currentClass.id)) return null;
    return (
        <div>
            <h2>Exchange Overview for Class {props.currentClass.name}</h2>
            <br />
            <Menu {...props} />
            <TabContent {...props} />
        </div>
    );
}

export default ClassProfile;
