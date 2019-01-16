import React from 'react';
import { Redirect } from 'react-router-dom';
import content from './Menu/content';
import { Segment } from 'semantic-ui-react'

const TabContent = (props) => {
    let ComponentData = content.find((topic) => topic.path === props.match.params.childpath);

    if (ComponentData) {
        return (
            <Segment attached='bottom' className='class-profile'>
                <ComponentData.component {...props} />
            </Segment>
        );
    } else {
        return <Redirect to='/portal/my-classes' />;
    }
}


export default TabContent;
