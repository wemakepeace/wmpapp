import React from 'react';
import content from './Menu/content';
import { Segment } from 'semantic-ui-react'

const TabContent = (props) => {
    if (props && props.match) {
        const Component = content.find((topic) => topic.path === props.match.params.childpath).component;

        return (
             <Segment attached='bottom' className='class-profile'>
                <Component {...props} />
            </Segment>
        );
    }
    return null;
}


export default TabContent;
