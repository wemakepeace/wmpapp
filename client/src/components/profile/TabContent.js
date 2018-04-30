import React, { Component } from 'react';
import { Redirect, Link, Route } from 'react-router-dom';

import Overview from './Overview'
import SchoolForm from './SchoolForm';
import ClassFormsContainer from './ClassFormsContainer';
import Teacher from './TeacherForm';



const TabContent = ({ match }) => {

    const components = {
        overview: Overview,
        teacher: Teacher,
        class: ClassFormsContainer
    };

    const Component = components[match.params.tab];

    return (
        <Component />
    );

}

export default TabContent;
