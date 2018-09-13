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
            loading: false,
            deleted: false
        };

        if (teacher && teacher.id) {
            defaultState = { ...teacher, loading: false, deleted: false };
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
            this.setState({ deleted: true, loading: false })
        } else if (teacher && (teacher !== this.state)) {
            this.setState(this.getDefaultStateOrProps(teacher));
        }
    }

    toggleLoader() {
        this.setState({ loading: true });
    }

    render() {

        const { firstName, lastName, email, phone, password, showChangePwForm, loading, deleted } = this.state;
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

        console.log('loading',loading)
        console.log('deleted', deleted)
        return (
            <div>
                <FullscreenModal
                    open={deleted}
                    onClick={() => this.props.history.push('/')}
                />
                <LoaderWithText
                    loading={loading}
                    action='Deleting user...'
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
