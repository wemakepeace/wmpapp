import React from 'react';
import { connect } from 'react-redux';
import { removeCurrentClass} from '../../redux/actions/class';

const RegisterClass = ({ removeCurrentClass, history }) => {

    const initiateNewClass = () => {
        removeCurrentClass();
        history.push('/portal/new-class');
    }

    return (
        <span onClick={initiateNewClass}>New Class</span>
    );
}

export default connect(null, { removeCurrentClass })(RegisterClass);
