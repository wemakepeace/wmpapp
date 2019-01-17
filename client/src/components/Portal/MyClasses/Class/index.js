import React from 'react';
import { Route, Link, Redirect, Switch } from 'react-router-dom';
import TabContent from './TabContent';
import Menu from './Menu';

const Class = (props) => {

    if (!props || (!props.currentClass || !props.currentClass.id)) {
        return(
            <Redirect exact from={`${props.match.path}`} to='/portal/my-classes' />
        );
    }


    return (
        <div>
            <Link onClick={props.removeCurrentClass} to='/portal/my-classes'>Select another class</Link>
            <h2>Exchange Overview for Class {props.currentClass.name}</h2>
            <Switch>
                <Redirect exact from={`${props.match.path}`} to={`${props.location.pathname}/progress`} />
                <Route
                    path={`${props.match.path}/:childpath`}
                    render={(_props) => (
                        <div>
                            <Menu {...props} {..._props} />
                            <TabContent feedback={props.feedback} {...props} {..._props} />
                        </div>
                    )}
                />
            </Switch>
        </div>
    );
}

export default Class;
