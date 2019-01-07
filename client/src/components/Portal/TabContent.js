import React from 'react';
import content from './Menu/content';

const TabContent = ({ ...props }) => {
    const allPages = [...content.mainMenuContent, ...content.classMenuContent]
    const Component = allPages.find((topic) => topic.path === props.match.params.path).component;

    return (<Component {...props} />);
}


export default TabContent;
