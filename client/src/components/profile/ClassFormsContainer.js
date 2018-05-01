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
        this.state = this.getDefaultState(props.classes);
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

    getDefaultState = (classes) => {
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
            return { ...classes.list[classes.currentClass], showFeedback: false };
        }
        return defaultState;
    }

    submitData = () => {
        let classData = this.state;
        // classData.id = this.props.classes.currentClass;
        classData.teacherId = this.props.teacher.id;
        // console.log('classData', classData)
        this.props.saveClass(classData)
        // .then(() => {
            // console.log('hitting here')
            // this.props.fetchTeacher()
        // });
    }

    autoFillForm = (id) => {
        console.log(id)
        const school = this.props.teacher.schools[id];
        this.setState({ school });

    }


    componentWillReceiveProps({ feedback, classes, school }) {
        const previousCurrentClass = this.props.classes.currentClass;
        const { currentClass, list } = classes;
        if (feedback && feedback.type) {
            this.setState({ showFeedback: true });
        }

        if (currentClass !== previousCurrentClass) {
            const newState = this.getDefaultState(classes);
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
        feedback: state.feedback,
        classes: state.classes
    }
}

const toBeDispatched = {
    saveClass, removeCurrentClass, fetchTeacher
}

export default connect(mapStateToProps, toBeDispatched )(ClassFormsContainer);


