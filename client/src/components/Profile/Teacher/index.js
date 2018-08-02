import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Feedback from '../../Feedback';
import Settings from './Settings';
import { Input } from '../../reusables/Input';
import { updateTeacher } from '../../../redux/actions/teacher';
import { clearFeedback } from '../../../redux/actions/shared';

class TeacherFormContainer extends Component {
    constructor(props) {
        super(props);
        const { teacher } = props;
        this.state = this.getDefaultStateOrProps(teacher);
    }

    getDefaultStateOrProps = (teacher) => {
        let defaultState = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
            showFeedback: false,
            showChangePwForm: false
        };

        if (teacher && teacher.id) {
            defaultState = { ...teacher };
        }
        return defaultState;
    }

    onInputChange = (value, key) => {
        this.setState({ [ key ]: value, showFeedback: false })
    }

    onChangePasswordClick = () => {
        this.props.clearFeedback();
        this.setState({ showChangePwForm: !this.state.showChangePwForm })
    }

    onSubmit = () => {
        const data = this.state;
        data.className = this.props.teacher.classes.name;
        this.props.updateTeacher(data);
        this.setState({ showChangePwForm: false })

    }

    componentWillReceiveProps({ teacher, feedback }) {
        if (feedback && feedback.type) {
            this.setState({ showFeedback: true });
        }

        if (teacher && (teacher !== this.state)) {
            this.setState(this.getDefaultStateOrProps(teacher));
        }
    }

    render() {

        const { firstName, lastName, email, phone, password, showFeedback, showChangePwForm } = this.state;
        const { feedback } = this.props;
        const fields = [
            {
                label: 'First name',
                value: firstName,
                name: 'firstName'
            },
            {
                label: 'Last name',
                value: lastName,
                name: 'lastName'
            },
            {
                label: 'Email',
                value: email,
                name: 'email'
            },
            {
                label: 'Phone',
                value: phone,
                name: 'phone'
            },


        ];

        return (
            <div className='profile-form'>
                <div className='profile-segment'>
                    <h2>Teacher Information</h2>
                    <p>All information you give will be kept safe and secure for your privacy.</p>
                    { fields.map((field) => (
                        <Input
                            {...field}
                            onInputChange={this.onInputChange}
                            key={field.name}
                        />)) }
                    <div className='form-row'>
                        <Button
                            className='large-custom-btn'
                            size='large'
                            onClick={()=>this.onSubmit()}>Save</Button>
                    </div>
                </div>
                <Settings
                    showChangePwForm={showChangePwForm}
                    onChangePasswordClick={this.onChangePasswordClick}
                />
                { showFeedback && (feedback && feedback.type)
                    ? <Feedback {...feedback} />
                    : null }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        teacher: state.teacher,
        feedback: state.feedback
    }
}

export default connect(mapStateToProps, { updateTeacher, clearFeedback })(TeacherFormContainer);
