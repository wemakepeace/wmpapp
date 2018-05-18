import React, { Component } from 'react';
import { Redirect, Link, Route } from 'react-router-dom';

import Overview from './Overview'
import ClassFormsContainer from './ClassFormsContainer';
import Teacher from './TeacherForm';


const TabContent = ({ match, history }) => {
    const components = {
        overview: Overview,
        teacher: Teacher,
        class: ClassFormsContainer
    };

    const Component = components[match.params.tab];

    return (
        <Component history={history} />
    );

}

export default TabContent;
