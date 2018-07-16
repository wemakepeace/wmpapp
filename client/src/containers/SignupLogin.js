import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignupForm from '../components/SignupForm';
import LoginForm from '../components/LoginForm';
import { login, logout } from '../redux/actions/teacher';
import { createTeacher } from '../redux/actions/teacher';

const SignupLogin = ({ showForm, login, createTeacher, teacher, feedback }) => {

    const ComponentName = showForm === 'login' ? LoginForm : SignupForm ;

    return (
        <ComponentName
            login={login}
            createTeacher={createTeacher}
            teacher={teacher}
            feedback={feedback}
        />
    );
}

const mapStateToProps = (state) => {
    return {
        teacher: state.teacher,
        feedback: state.feedback
    }
}

export default connect(mapStateToProps, { login, createTeacher })(SignupLogin);
