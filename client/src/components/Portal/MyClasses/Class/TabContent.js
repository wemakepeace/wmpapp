import React from 'react';
import content from './content';
import { Input, Menu, Segment } from 'semantic-ui-react'


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
