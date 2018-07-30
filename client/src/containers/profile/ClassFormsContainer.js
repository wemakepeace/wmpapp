import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Button } from 'semantic-ui-react';
import Feedback from '../../components/Feedback';
import ClassForm from '../../components/profile/forms/ClassForm';
import SchoolForm from '../../components/profile/forms/SchoolForm';
import { saveClass, removeCurrentClass } from '../../redux/actions/class';


class ClassFormsContainer extends Component {
    constructor(props) {
        super(props);
        const { currentClass } = props;
        this.state = this.getDefaultStateOrProps(currentClass, currentClass.school);
    }

    getDefaultStateOrProps = (currentClass, school) => {
        let defaultState = {
            class: {
                id: null,
                name: '',
                size: '',
                age_group: null,
                term: '',
                language: '',
            },
            school: {
                id: null,
                schoolName: '',
                address1: '',
                address2: '',
                city: '',
                zip: '',
                state: '',
                country: ''
            },
            showFeedback: false
        };

        if (currentClass && currentClass.id) {
            defaultState.class = { ...currentClass };
        }

        if (school) {
            defaultState.school = { ...school };
        }

        return defaultState;
    }

    onInputChange = (value, key, objName) => {
        this.setState({
            [ objName ]: {
                ...this.state[ objName ],
                [ key ]: value
            }
        });
    }

    fetchSchool = (ev) => {
        if (!ev || ev.value === 'newaddress') {
            this.setState(this.getDefaultStateOrProps(this.state.class))
        } else {
            const schoolId = ev.value || null;
            return axios.get(`/school/${schoolId}`)
                .then(({ data }) => this.setState({ school: data }));
        }
    }

    submitData = () => {
        let classData = this.state.class;
        let schoolData = this.state.school;
        classData.teacherId = this.props.teacher.id;
        this.props.saveClass(classData, schoolData);
    }

    componentWillReceiveProps({ feedback, currentClass }) {
        if (feedback && feedback.type) {
            this.setState({ showFeedback: true });
        }

        if (currentClass && (currentClass.id !== this.state.class.id)) {
            this.setState(this.getDefaultStateOrProps(currentClass, currentClass.school));
        }
    }

    render() {
        const { feedback, currentClass, teacher: { id } } = this.props;
        const { showFeedback } = this.state;

        return (
            <div className='profile-form'>
                <div className='profile-segment'>
                    <div>
                        { currentClass && currentClass.id ?
                            <h2>Information & Settings for Class {currentClass.name}</h2> :
                            <h2> Register New Class </h2> }
                        <ClassForm
                            classData={this.state.class}
                            onInputChange={this.onInputChange.bind(this)}
                        />
                        <SchoolForm
                            school={this.state.school}
                            onInputChange={this.onInputChange.bind(this)}
                            teacherId={id}
                            fetchSchool={this.fetchSchool.bind(this)}
                        />
                        <div className='form-row'>
                            <Button
                                className='large-custom-btn'
                                size='large'
                                onClick={this.submitData}>SAVE</Button>
                        </div>
                        { showFeedback && (feedback && feedback.type) ?
                            <Feedback {...feedback} /> : null }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ teacher, currentClass, feedback }) => {
    return { teacher, currentClass, feedback };
};

const toBeDispatched = { saveClass, removeCurrentClass };

export default connect(mapStateToProps, toBeDispatched )(ClassFormsContainer);


