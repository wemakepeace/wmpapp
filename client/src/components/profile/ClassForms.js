import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { Async } from 'react-select';

import { saveClass, createClass, removeCurrentClass } from '../../redux/actions/class';
import { createOrUpdateSchool } from '../../redux/actions/school';

import Feedback from '../Feedback';
import SchoolForm from './SchoolForm';
import ClassForm from './ClassForm';

class ClassForms extends Component {
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
            showFeedback: false,
            newClass: false
        }

        if (classes && classes.list && classes.currentClass) {
            return { ...classes.list[classes.currentClass], showFeedback: false };
        }
        return defaultState;
    }

    componentWillReceiveProps({ feedback, classes, school }) {
        const previousCurrentClass = this.props.classes.currentClass;
        const { currentClass, list } = classes;
        if (feedback && feedback.type) {
            this.setState({ showFeedback: true });
        }

        if (currentClass !== previousCurrentClass) {
            const newState = this.getDefaultState(classes);
            this.setState(newState);
        }
    }

    submitData = () => {

        // if (!this.state.newClass) {
            let classData = this.state;
            let schoolData = this.state.school;
            classData.id = this.props.classes.currentClass;
            classData.teacherId = this.props.teacher.id;
            schoolData.classId = this.props.classes.currentClass;


            // consolidate to one call
            // saveClass
            // if class and school has ids,
                // the class already exists do an update
            // else
                // create a new class and new school address

            this.props.saveClass(classData);
            // return this.props.createOrUpdateSchool(schoolData)
            // .then(res => {
            //     this.props.saveClass(classData);
            // });
        // } else {
            // create new class and school
            // class belongsto school, so we need schoolId for class
            //
            // return this.props.createOrUpdateSchool(this.state.school)
        //     .then(res => {
        //         console.log('res', res)
        //         this.state.schoolId = res.id;
        //         this.props.createClass(this.state);
        //     })

        // }
    }

    createNewClass = () => {
        console.log('hei')
        this.props.removeCurrentClass();
        localStorage.removeItem('currentClass');
        this.setState({ newClass: true})
    }

    render() {
        const { feedback, classes } = this.props;
        const { currentClass } = classes;
        const { showFeedback, newClass } = this.state;

        return (
            <div className='profile-form'>
                <div className='profile-segment'>
                { !currentClass && !newClass
                    ? <div className='container-center-content'>
                        <Button
                            onClick={this.createNewClass}
                            size='massive'
                            className='add-class'>Register New Class</Button>
                    </div>
                    : <div>
                        <ClassForm
                            classData={this.state}
                            onInputChange={this.onInputChange.bind(this)}
                            onSelectOptionChange={this.onSelectOptionChange}
                        />
                        <SchoolForm
                            schoolData={this.state.school}
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
                }
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

const mapDispatchToProps = () => {
    return {
        updateClass, createOrUpdateSchool, createClass, removeCurrentClass
    }
}

export default connect(mapStateToProps, { saveClass, createOrUpdateSchool, createClass, removeCurrentClass })(ClassForms);


