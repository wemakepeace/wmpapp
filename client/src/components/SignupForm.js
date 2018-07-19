import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import Feedback from './Feedback';

class Signup extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        showFeedback: false,
        redirectToReferrer: false
    }

    onChange = (ev, key) => this.setState({ [ key ]: ev.target.value})

    onSubmit = () => {
        const data = this.state;
        const { action } = this.props;
        action(data);
    }

    componentWillReceiveProps({ teacher, feedback }) {
        if((teacher && teacher.id) && localStorage.getItem('token')) {
            this.setState({ redirectToReferrer: true })
        }

        if (feedback && feedback.type) {
            this.setState({ showFeedback: true });
        }
    }


    render() {

        const { feedback, teacher } = this.props;
        const { redirectToReferrer, showFeedback } = this.state;
        const { from } = this.props.location && this.props.location.state || { from: { pathname: '/profile/overview' }};

        if (redirectToReferrer === true || teacher.id) {
            return ( <Redirect to={from} /> );
        }

        return (
            <div className='signup-form'>
                <div className='form-row'>
                    <input
                        placeholder='FIRST NAME'
                        name='firstname'
                        onChange={(ev)=>this.onChange(ev, 'firstName')}/>
                </div>
                <div className='form-row'>
                    <input
                        placeholder='LAST NAME'
                        name='lastname'
                        onChange={(ev) => this.onChange(ev, 'lastName')}/>
                </div>
                <div className='form-row'>
                    <input
                        placeholder='EMAIL'
                        name='email'
                        onChange={(ev) => this.onChange(ev, 'email')}/>
                </div>
                <div className='form-row'>
                    <input
                        placeholder='PASSWORD'
                        name='password'
                        type='password'
                        onChange={(ev) => this.onChange(ev, 'password')}/>
                </div>
                <div className='form-row'>
                    <input
                        placeholder='CONFIRM PASSWORD'
                        name='confirmpassword'
                        type='password'
                        onChange={(ev) => this.onChange(ev, 'confirmPassword')}/>
                </div>
                <Button
                    className='large-custom-btn'
                    size='large'
                    onClick={()=>this.onSubmit()}>SIGN UP</Button>
                { showFeedback && (feedback && feedback.type)
                    ? <Feedback {...feedback} />
                    : null }
            </div>
        );
    }
}

export default Signup;
