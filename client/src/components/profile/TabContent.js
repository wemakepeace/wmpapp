import React from 'react';
import Overview from './Overview';
import Class from './Class';
import Teacher from './Teacher';
import Materials from './Materials';

const TabContent = ({ match, history }) => {
    const components = {
        overview: Overview,
        teacher: Teacher,
        class: Class,
        materials: Materials
    };
    const Component = components[ match.params.tab ];

    return (<Component history={history} />);
}


export default TabContent;
