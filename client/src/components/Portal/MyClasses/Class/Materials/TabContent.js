import React from 'react';
import content from './content';

const TabContent = ({ letterURLs, classRole, match }) => {
    const { path } = match.params;
    const Component = content.find((topic) => topic.path === path).component;

    return (
        <div className='instructions'>
            <Component classRole={classRole} letterURLs={letterURLs} />
        </div>
        );
};


export default TabContent;