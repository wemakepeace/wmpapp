import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Settings from './Settings';
import { Input } from '../../reusables/Input';
import { LoaderWithText } from '../../reusables/LoaderWithText';
import FullscreenModal from '../../reusables/FullscreenModal';
import { updateTeacher, deleteTeacher } from '../../../redux/actions/teacher';
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
            showChangePwForm: false,
            deleting: false,
            deleted: false,
            showDeleteWarningModal: false
        };

        if (teacher && teacher.id) {
            defaultState = {
                ...teacher,
                deleting: false,
                deleted: false,
                showDeleteWarningModal: false
            };
        }
        return defaultState;
    }

    onInputChange = (value, key) => {
        this.setState({ [ key ]: value })
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
        if (feedback && feedback.type === 'deleted') {
            this.setState({ deleted: true, deleting: false })
        } else if (teacher && (teacher !== this.state)) {
            this.setState(this.getDefaultStateOrProps(teacher));
        }
    }

    toggleLoader(stage) {
        // this.setState({ deleting: true });
        this.setState({ [ stage ]: true });
    }

    render() {

        const {
            firstName,
            lastName,
            email,
            phone,
            password,
            showChangePwForm,
            deleting,
            deleted,
            showDeleteWarningModal
        } = this.state;
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
            <div>
                { showDeleteWarningModal ?
                    <FullscreenModal
                        open={showDeleteWarningModal}
                        header='Are you sure you want to delete your account?'
                        content='This action is unreversible. If you delete your profile you will lose all your information and you will not be able to login at a later time. All your registered classes and active exchanges will also be deleted. If any of your classes are currently enrolled in an exchange, please notify and explain to the teacher of the other class your reasons for ending the exchange. '
                        buttonText1='Yes, delete my account'
                        button1Color='red'
                        closeAction={() => this.setState({ showDeleteWarningModal: false })}
                        action={() => {
                            this.toggleLoader('deleting');
                            this.props.deleteTeacher();

                        }}
                    /> : null }
                { deleted ?
                    <FullscreenModal
                        open={deleted}
                        header='Your account has been deleted.'
                        buttonText1='Go to Home Page'
                        closable={false}
                        action={() => this.props.history.push('/')}
                    /> : null }
                <LoaderWithText
                    loading={deleting}
                    action='Deleting your account...'
                />
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
                    deleteTeacher={this.props.deleteTeacher}
                    toggleLoader={this.toggleLoader.bind(this)}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        teacher: state.teacher
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateTeacher: (data) => dispatch(updateTeacher(data)),
        clearFeedback: () => dispatch(clearFeedback()),
        deleteTeacher: () => dispatch(deleteTeacher())

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherFormContainer);
