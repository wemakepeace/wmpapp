import React from 'react';
import OverviewContainer from '../../containers/profile/OverviewContainer';
import ClassFormsContainer from '../../containers/profile/ClassFormsContainer';
import TeacherFormContainer from '../../containers/profile/TeacherFormContainer';
import Materials from './Materials';

const TabContent = ({ match, history }) => {
    const components = {
        overview: OverviewContainer,
        teacher: TeacherFormContainer,
        class: ClassFormsContainer,
        materials: Materials
    };
    const Component = components[ match.params.tab ];

    return (<Component history={history} />);
}


export default TabContent;
