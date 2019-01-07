import React from 'react';
import Menu from './Menu';
import TabContent from './TabContent';

const ClassProfile = (props) => {
    return (
        <div>
            <Menu {...props} />
            <TabContent {...props} />
        </div>
    );
}

export default ClassProfile;
