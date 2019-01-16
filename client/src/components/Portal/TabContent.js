import React from 'react';
import { Redirect } from 'react-router-dom';
import content from './Menu/content';

const TabContent = ({ ...props }) => {
    const allPages = [...content.mainMenuContent];
    const ComponentData = allPages.find((topic) => topic.path === props.match.params.path);

    if (ComponentData) {
        return (<ComponentData.component {...props} />);
    } else {
        return <Redirect to='/portal/my-classes' />;
    }
}


export default TabContent;
