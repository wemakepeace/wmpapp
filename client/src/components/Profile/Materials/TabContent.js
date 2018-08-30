import React from 'react';

const TabContent = ({ materials, letterURLs, classRole, match, history }) => {
    const Component = materials.find((topic) => topic.sub === match.params.sub).component;
    return (<Component letterURLs={letterURLs} classRole={classRole} />);
};


export default TabContent;
