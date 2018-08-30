import React from 'react';

const TabContent = ({ content, classRole, match }) => {
    const { route } = match.params;
    const Component = content.find((topic) => topic.route === route).component;

    return (<Component classRole={classRole} />);
};


export default TabContent;
