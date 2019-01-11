import React from 'react';
import { Route } from 'react-router-dom';
import Menu from './Menu';
import Feedback from '../../../Feedback';
import TabContent from './TabContent';

const ClassProfile = (props) => {
    if (!props || (!props.currentClass && !props.currentClass.id)) return null;
    return (
        <div>
            <h2>Exchange Overview for Class {props.currentClass.name}</h2>
            <br />
            {/*<Menu {...props} />*/}
            <Route
                path={`${props.match.path}/:id/:childpath`}
                render={(_props) => (
                        <div>
                            <Menu {...props} {..._props} />
                            <TabContent feedback={props.feedback} {...props} {..._props} />
                        </div>
                    )}
            />
            <Feedback {...props.feedback} />
        </div>
    );
}

export default ClassProfile;
