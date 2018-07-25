import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import SignupForm from '../components/SignupForm';
import LoginForm from '../components/LoginForm';
import { login, logout } from '../redux/actions/teacher';
import { signup } from '../redux/actions/teacher';
import Feedback from '../components/Feedback';

class SignupLoginContainer extends Component {
    constructor(props) {
        super(props)
        this.state = this.getDefaultState(props);
    }

    componentWillReceiveProps({ teacher, feedback }) {
        if((teacher && teacher.id) && localStorage.getItem('token')) {
            this.setState({ redirectToReferrer: true })
        }

        if (feedback && feedback.type) {
            this.setState({ showFeedback: true });
        }
    }

    getDefaultState (props) {
        const { form } = this.props;
        const state = {
            redirectToReferrer: false,
            showFeedback: false
        };
        const login = {
            email: '',
            password: ''
        };
        const signup =  {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }

        return { ...state, ...form };
    }

    onChange(ev, key) {
        this.setState({ [ key ]: ev.target.value});
    }

    onSubmit() {
        const { form } = this.props;
        const action = this.props[ form ];
        const data = this.state;
        action(data);
    }

    render() {
        const{ form, teacher, feedback, location } = this.props;
        const { redirectToReferrer, showFeedback } = this.state;
        const { from } = location && location.state || { from: { pathname: '/profile/overview' } };
        const Form = form === 'login' ? LoginForm : SignupForm;

        if (redirectToReferrer === true || teacher.id) {
            return ( <Redirect to={from} /> );
        }

        return(
            <div className='login-form'>
                <Form onChange={this.onChange.bind(this)} />
                <Button
                    className='large-custom-btn'
                    size='large'
                    onClick={()=>this.onSubmit()}>{form.toUpperCase()}</Button>
                { showFeedback && (feedback && feedback.type)
                    ? <Feedback {...feedback} />
                    : null }
            </div>
        );
    }
}

const mapStateToProps = ({ teacher, feedback }) => {
    return {
        teacher,
        feedback
    }
}

export default connect(mapStateToProps, { login, signup })(SignupLoginContainer);
