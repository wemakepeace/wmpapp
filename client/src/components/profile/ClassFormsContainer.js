import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { Async } from 'react-select';
import { Redirect } from 'react-router-dom';
import Feedback from '../Feedback';
import ClassForm from './ClassForm';
import SchoolForm from './SchoolForm';
import { saveClass, removeCurrentClass } from '../../redux/actions/class';
import axios from 'axios';

class ClassFormsContainer extends Component {
    constructor(props) {
        super(props);
        const { currentClass } = props.classes;
        this.state = this.getDefaultStateOrProps(currentClass, currentClass.school);
    }

    getDefaultStateOrProps = (currentClass) => {
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
            defaultState = {
                class: { ...currentClass },
                school: { ...currentClass.school },
                showFeedback: false
            };
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
        const schoolId = ev.selected.value;
        return axios.get(`/school/${schoolId}`)
            .then(({ data }) => this.setState({ school: data }));
    }

    submitData = () => {
        let classData = this.state.class;
        let schoolData = this.state.school;
        classData.teacherId = this.props.teacher.id;
        this.props.saveClass(classData, schoolData);
    }

    componentWillReceiveProps({ feedback, classes: { currentClass } }) {
        if (feedback && feedback.type) {
            this.setState({ showFeedback: true });
        }

        if (currentClass.id !== this.state.class.id) {
            this.setState(this.getDefaultStateOrProps(currentClass));
        }
    }

    render() {
        const { feedback, classes: { currentClass }, teacher: { id } } = this.props;
        const { showFeedback } = this.state;
        return (
            <div className='profile-form'>
                <div className='profile-segment'>
                    <div>
                        { currentClass && currentClass.id ?
                            <h2>Information & Settings for Class {currentClass.name}</h2> :
                            <h2> Register New Class </h2>
                        }
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
        )
    }
}

const mapStateToProps = ({ teacher, classes, feedback }) => {
    return { teacher, classes, feedback };
};

const toBeDispatched = { saveClass, removeCurrentClass };

export default connect(mapStateToProps, toBeDispatched )(ClassFormsContainer);


