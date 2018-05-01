import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { Async } from 'react-select';
import { Redirect } from 'react-router-dom';

import Feedback from '../Feedback';
import SchoolForm from './SchoolForm';
import ClassForm from './ClassForm';

import { saveClass, removeCurrentClass } from '../../redux/actions/class';
import { fetchTeacher } from '../../redux/actions/teacher';

class ClassFormsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = this.getDefaultState(props.classes, props.schools);
    }

    onInputChange = (key, value, objName) => {
        if (objName === 'school') {
            this.setState({
                school: {
                    ...this.state.school,
                    [key]: value
                }
            });
        } else {
            this.setState({[key]: value});
        }
    }

    onSelectOptionChange = (key, value, objName) => {
        if (objName === 'school') {
            this.setState({
                school: {
                    ...this.state.school,
                    [key]: value
                }
            });
        } else {
            this.setState({ [key] : value });
        }
    }

    getDefaultState = (classes, schools) => {
        let defaultState = {
            id: '',
            name: '',
            size: '',
            age_group: null,
            term: '',
            languageProficiency: '',
            language: '',
            school: {
                id: '',
                name: '',
                address1: '',
                address2: '',
                city: '',
                zip: '',
                state: '',
                country: ''
            },
            showFeedback: false
        }

        if (classes && classes.list && classes.currentClass) {
            defaultState = {
                ...classes.list[classes.currentClass],
                showFeedback: false
            };

            if (schools && schools[classes.currentClass]) {
                defaultState.schools = schools[classes.currentClass]
            }
        }
        return defaultState;
    }

    submitData = () => {
        let classData = this.state;
        classData.teacherId = this.props.teacher.id;

        this.props.saveClass(classData)
    }

    autoFillForm = (id) => {
        const school = this.props.teacher.schools[id];
        this.setState({ school });

    }


    componentWillReceiveProps({ feedback, classes, schools }) {
        const previousCurrentClass = this.props.classes.currentClass;
        const { currentClass, list } = classes;
        if (feedback && feedback.type) {
            this.setState({ showFeedback: true });
        }

        if (currentClass !== previousCurrentClass) {
            const newState = this.getDefaultState(classes, schools);
            this.setState({...newState, showFeedback: true});
        }
    }

    render() {
        const { feedback, classes, showComponent, teacher } = this.props;
        const { currentClass } = classes;
        const { showFeedback } = this.state;

        return (
            <div className='profile-form'>
                <div className='profile-segment'>
                <div>

                        {currentClass
                            ? <h2>Information and Settings for Class {classes.list[currentClass].name}</h2>
                            : <h2> Register New Class </h2>}
                        <ClassForm
                            classData={this.state}
                            onInputChange={this.onInputChange.bind(this)}
                            onSelectOptionChange={this.onSelectOptionChange}
                        />
                        <SchoolForm
                            getSchoolData={this.getSchoolData}
                            schoolData={this.state.school}
                            autoFillForm={this.autoFillForm}
                            onInputChange={this.onInputChange.bind(this)}
                            onSelectOptionChange={this.onSelectOptionChange}/>
                        <div className='form-row'>
                            <Button
                                className='large-custom-btn'
                                size='large'
                                onClick={this.submitData}>SAVE</Button>
                        </div>
                        { showFeedback && (feedback && feedback.type)
                            ? <Feedback {...feedback} />
                            : null }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        teacher: state.teacher,
        schools: state.teacher.schools,
        classes: state.classes,
        feedback: state.feedback
    }
}

const toBeDispatched = {
    saveClass, removeCurrentClass, fetchTeacher
}

export default connect(mapStateToProps, toBeDispatched )(ClassFormsContainer);


