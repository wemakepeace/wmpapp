import React from 'react';
import { Route, Link } from 'react-router-dom';
import Menu from './Menu';
import Feedback from '../../../Feedback';
import TabContent from './TabContent';

const ClassProfile = (props) => {
    if (!props || (!props.currentClass && !props.currentClass.id)) return null;
    return (
        <div>
            <Link onClick={props.removeCurrentClass} to='/portal/my-classes'>Select another class</Link>
            <h2>Exchange Overview for Class {props.currentClass.name}</h2>
            <Route
                path={`${props.match.path}/:childpath`}
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
