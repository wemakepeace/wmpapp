import React from 'react';
import content from './Menu/content';

const TabContent = ({ ...props }) => {
    const Component = content.find((topic) => topic.route === props.match.params.route).component;

    return (<Component {...props} />);
}


export default TabContent;
