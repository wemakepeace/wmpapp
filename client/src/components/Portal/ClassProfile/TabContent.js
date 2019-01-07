import React from 'react';
import content from './content';

const TabContent = (props) => {
    if (props && props.match) {
        const Component = content.find((topic) => topic.path === props.match.params.childpath).component;

        return (<Component {...props} />);
    }
    return null;
}


export default TabContent;