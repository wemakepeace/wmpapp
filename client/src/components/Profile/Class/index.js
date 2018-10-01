import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Message } from 'semantic-ui-react';
import ClassForm from './ClassForm';
import SchoolForm from './SchoolForm';
import { LoaderWithText } from '../../reusables/LoaderWithText';
import { saveClass, removeCurrentClass } from '../../../redux/actions/class';

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
            loading: false
        };

        if (currentClass && currentClass.name) {
            defaultState.class = { ...currentClass };
        }

        if (school) {
            defaultState.school = { ...school };
        }

        return defaultState;
    };

    componentWillReceiveProps = ({ currentClass, feedback }) => {
        // don't update state if we are in the process of creating a new class
        if (feedback && feedback.type === 'error') {
            return this.setState({ loading: false });
        }
        this.setState(this.getDefaultStateOrProps(currentClass, currentClass.school));
    }

    onInputChange = (value, key, objName) => {
        // objName is either class or school
        this.setState({
            [ objName ]: {
                ...this.state[ objName ],
                [ key ]: value
            }
        });
    }

    fetchSchool = (ev) => {
        // keep state if user choses 'new address' from school dropdown
        // in the middle of filling out forms
        if (!ev || ev.value === 'newaddress') {
            this.setState(this.getDefaultStateOrProps(this.state.class))
        } else {
            const schoolId = ev.value;
            return axios.get(`/school/${schoolId}`)
                .then(({ data }) => this.setState({ school: data }));
        }
    }

    submitData = () => {
        let classData = this.state.class;
        let schoolData = this.state.school;
        classData.teacherId = this.props.teacher.id;
        this.toggleLoader();
        this.props.saveClass(classData, schoolData);
    }


    toggleLoader = () =>{
        this.setState({ loading: !this.state.loading });
    }

    render() {
        const { currentClass, teacher: { id } } = this.props;
        const { loading } = this.state;

        return (
            <div className='profile-segment'>
                <LoaderWithText
                    loading={loading}
                    text='Saving...'
                />
                <div>
                    { currentClass && currentClass.id ?
                        <h2>Information & Settings for Class {currentClass.name}</h2> :
                        <h2> Register New Class </h2> }
                    <ClassForm
                        classData={this.state.class}
                        onInputChange={this.onInputChange}
                    />
                    <br /><br />
                    <SchoolForm
                        school={this.state.school}
                        onInputChange={this.onInputChange}
                        teacherId={id}
                        fetchSchool={this.fetchSchool}
                    />
                    <div className='form-row'>
                        <Button
                            className='large-custom-btn'
                            size='large'
                            onClick={this.submitData}>SAVE</Button>
                    </div>
                    { currentClass && currentClass.id ?
                        <Message>
                            If you have not yet enrolled your class in the program, please follow the instructions on the <Link to='/#/profile/overview/'>Overview</Link> page.
                        </Message> : null
                    }
                </div>
            </div>
        );
    };
};

const mapStateToProps = ({ teacher, currentClass, feedback }) => {
    return { teacher, currentClass, feedback };
};

const toBeDispatched = { saveClass, removeCurrentClass };

export default connect(mapStateToProps, toBeDispatched )(ClassFormsContainer);


