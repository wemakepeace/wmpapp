import React from 'react';

const TabContent = ({ content, ...props }) => {
    const Component = content.find((topic) => topic.route === props.match.params.route).component;

    return (<Component {...props} />);
}


export default TabContent;
