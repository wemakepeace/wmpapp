import React, { Component} from 'react';
import { connect } from 'react-redux';
import Feedback from '../Feedback';
import { sendResetPasswordLink } from '../../redux/actions/teacher';
import FormContainer from '../reusables/FormContainer';
import CustomButton from '../reusables/CustomButton';
import { LoaderWithText } from '../reusables/LoaderWithText';
import { Input } from '../reusables/Input';
import {
    Header,
    Segment,
    Image,
    Message,
    Button
} from 'semantic-ui-react';


const RequestResetPasswordButton = CustomButton({ name: 'Request Reset Password' });
const Form = FormContainer({ Input, CustomButton: RequestResetPasswordButton });
const inputs = [
    {
        label: 'Email address',
        type: 'text',
        name: 'email'
    }
];

class ResetPasswordRequestContainer extends Component {
    state = {
        showFeedback: false,
        loading: false
    }

    componentWillReceiveProps({ feedback }) {
        if (feedback) {
            this.setState({ showFeedback: true, loading: false });
        }
    }

    toggleLoader() {
        this.setState({ loading: !this.state.loading });
    }

    onSubmit(email) {
        this.toggleLoader();
        this.props.sendResetPasswordLink(email);
    }

    render() {
        const { feedback, sendResetPasswordLink } = this.props;
        const { showFeedback, loading } = this.state;

        return (
            <div className='centered-outer-div'>
                <LoaderWithText
                    loading={loading}
                    text='Requesting reset password link...'
                />
                <div
                    className='centered-inner-div'
                    style={{width: '500px', padding: '10px'}}>
                    <Header as='h2'>
                        <Image src='../../../assets/logos/WMPlogo_transparent.png' />
                                {' '}Request Reset Password
                    </Header>
                    {   showFeedback && (feedback && feedback.type === 'success')
                    ?   <Message>{feedback.messages[ 0 ]}</Message>
                    :   <Form onSubmit={this.onSubmit.bind(this)} inputs={inputs} /> }
                    { showFeedback && (feedback && feedback.type === 'error')
                    ? <Feedback {...feedback} />
                    : null }
                </div>
            </div>
        )
    };
};

const mapStateToProps = (state) => {
    return {
        feedback: state.feedback
    }
};

export default connect(mapStateToProps, { sendResetPasswordLink })(ResetPasswordRequestContainer);
