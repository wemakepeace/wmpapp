import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Settings from './Settings';
import { Input } from '../../reusables/Input';
import { LoaderWithText } from '../../reusables/LoaderWithText';
import FullscreenModal from '../../reusables/FullscreenModal';
import { clearFeedback } from '../../../redux/actions/shared';
import {
    updateTeacher,
    deleteTeacher,
    changePassword
} from '../../../redux/actions/teacher';

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
            loader: {
                isOpen: false,
                loaderType: 'savingData'
            },
            modal: {
                isOpen: false,
                modalType: 'showWarningModal'
            }
        };

        if (teacher && teacher.id) {
            defaultState = {
                ...defaultState,
                ...teacher
            };
        }
        return defaultState;
    }

    componentWillReceiveProps = ({ teacher, feedback }) => {
        if (feedback && feedback.type === 'deleted') {
            return this.setState({
                loader: { isOpen: false },
                modal: {
                    isOpen: true,
                    modalType:
                    'isDeleted'
                }
            });
        } else if (teacher && (teacher !== this.state)) {
            return this.setState(this.getDefaultStateOrProps(teacher));
        }

        this.setState({ loader: { isOpen: false } });
    }

    onChangePassword = (data) => {
        this.toggleLoader('changingPassword');
        this.props.changePassword(data);
    }

    onSubmit = () => {
        const data = this.state;
        this.toggleLoader('savingData');
        this.props.updateTeacher(data);
    }

    onInputChange = (value, key) => this.setState({ [ key ]: value })

    toggleLoader = (loaderType) => this.setState({ loader: { isOpen: true, loaderType } })

    toggleModal = (isOpen, modalType) => this.setState({ modal: { isOpen, modalType } })

    render() {
        const {
            firstName,
            lastName,
            email,
            phone,
            password,
            loader,
            modal
        } = this.state;
        const { deleteTeacher, history } = this.props;

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

        const loaderContent = {
            savingData: 'Saving...',
            changingPassword: 'Changing your password...',
            deletingAccount: 'Deleting your account...'
        };

        const modalContent = {
            showWarningModal: {
                header: 'Are you sure you want to delete your account?',
                content: 'This action is unreversible. If you delete your profile you will lose all your information and you will not be able to login at a later time. All your registered classes and active exchanges will also be deleted. If any of your classes are currently enrolled in an exchange, please notify and explain to the teacher of the other class your reasons for ending the exchange.',
                buttonText1: 'Yes, delete my account',
                button1Color: 'red',
                closeAction: () => this.toggleModal(false, 'showWarningModal'),
                action: () => {
                    this.toggleLoader('deletingAccount');
                    deleteTeacher();
                }
            },
            isDeleted: {
                header: 'Your account has been deleted.',
                buttonText1: 'Go to Home Page',
                closable: false,
                action: () => history.push('/')
            }
        }

        return (
            <div>
                <LoaderWithText
                    loading={loader.isOpen}
                    text={loaderContent[ loader.loaderType ]}
                />
                <FullscreenModal
                    open={modal.isOpen}
                    {...modalContent[ modal.modalType ]}
                />
                <div className='profile-segment'>
                    <h2>Teacher Information</h2>
                    <p>All information you give will be kept safe and secure for your privacy.</p>
                    { fields.map((field) => (
                        <Input
                            {...field}
                            key={field.name}
                            onInputChange={this.onInputChange}
                        />)) }
                    <div className='form-row'>
                        <Button
                            size='large'
                            className='large-custom-btn'
                            onClick={()=>this.onSubmit()}>Save</Button>
                    </div>
                </div>
                <Settings
                    toggleWarningModal={this.toggleModal.bind(this)}
                    onChangePassword={this.onChangePassword.bind(this)}
                />
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        teacher: state.teacher
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateTeacher: (data) => dispatch(updateTeacher(data)),
        clearFeedback: () => dispatch(clearFeedback()),
        deleteTeacher: () => dispatch(deleteTeacher()),
        changePassword: (data) => dispatch(changePassword(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeacherFormContainer);
