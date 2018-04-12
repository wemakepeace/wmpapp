import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { Async } from 'react-select';

import { updateClass } from '../../redux/actions/class';
import { updateSchool } from '../../redux/actions/school';

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
            console.log(key, value)
            this.setState({ [key] : value });
        }
    }

    getDefaultState = (classes) => {
        let defaultState = {
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
            }
        }

        if (classes && classes.list && classes.currentClass) {
            return classes.list[classes.currentClass];
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

    // submitAllData = (schoolData) => {
    //     let classData = this.state;
    //     classData.id = this.props.classes.currentClass;
    //     schoolData.classId = this.props.classes.currentClass;

    //     return this.props.updateSchool(schoolData)
    //     .then(res => {
    //         this.props.updateClass(classData);
    //     });
    // }

    render() {
        const { feedback, classes } = this.props;

        return (
            <div className='profile-form'>
                <div className='profile-segment'>
                    <div>
                        <div>
                            <ClassForm
                                classData={this.state}
                                onInputChange={this.onInputChange.bind(this)}
                                onSelectOptionChange={this.onSelectOptionChange}
                            />
                            <SchoolForm
                                schoolData={this.state.school}
                                onInputChange={this.onInputChange.bind(this)}
                                onSelectOptionChange={this.onSelectOptionChange}/>
                        </div>
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

export default connect(mapStateToProps, { updateClass, updateSchool })(ClassForms);


