import React from 'react';

const TabContent = ({ content, letterURLs, classRole, match }) => {
    const { route } = match.params;
    const Component = content.find((topic) => topic.route === route).component;

    return (<Component classRole={classRole} letterURLs={letterURLs} />);
};


export default TabContent;
